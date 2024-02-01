import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Text, Button, Image, Container, Flex, Heading, ButtonGroup, Toast } from '@chakra-ui/react'
import Navbar from '../components/Navbar'

import { Navigate, Link as RouterLink, useNavigate } from 'react-router-dom'
import { deleteCartItem, getCartData } from '../api/cartApi'
import Loader from '../components/Loader'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import { addPayment, checkout, getPayKey, paymentSuccessCallback } from '../api/orderApi'
import { AxiosError } from 'axios'



const Cart = () => {

    //Create interface later
    const [data, setData] = useState<any | null>([]);

    const [subTotal, setSubTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            const data = await getCartData();

            if (data == '') {
                setData(null);
                return;
            }

            const cart = data.cart;
            console.log(cart);
            setData(cart);

            let total = 0;
            cart.map((cart: any) => {
                total += cart.item.price * cart.quantity;
            })
            setSubTotal(total);
        }


        fetchCart();
    }, [])


    //handle Delete
    const handleDelete = async (id: string) => {
        const data = await deleteCartItem(id);
        if (data) {
            const { cart } = await getCartData();
            setData(cart);
            if (cart.length == 0) {
                setData(null);
            }
        }
        else {
            console.log("Error Deleting Cart Item");
        }
    }


    const paymentHandler = async (orderId: String) => {
        console.log("Payment Handler")

        const { key } = await getPayKey();
        const { order } = await addPayment(orderId);
        console.log(order);

        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "DigitalDocks",
            description: "Razorpay Payment Gateway",
            image: "https://i.imgur.com/n5tjHFD.png",
            order_id: order.id,
            handler: async function (response) {
                console.log(response);
                const data = {
                    orderCreationId: order.id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    ourOrderId: orderId,
                };

                const result = await paymentSuccessCallback(data);

                console.log(result);
                setSuccess(true);
                // localStorage.removeItem("coupon");
                // setOrderSuccess(true);
                // setIsPaymentInProgress(false);
            },
            prefill: {
                name: "Ayush Bulbule",
                email: "ayushbulbule24@gmail.com",
                contact: "1234567890"
            },
            notes: {
                "address": "razorpay official"
            },
            theme: {
                color: "#3399cc"
            }

        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    }

    //Handle Checkout
    const createOrder = async () => {

        //create order
        setIsLoading(true);
        try {
            const data = await checkout();
            console.log(data);
            toast.success(data.msg);
            const payment = await paymentHandler(data.order._id);
            console.log(payment);
            console.log("Order Created");
            setIsLoading(false);


        } catch (err) {
            console.log(err)
            setIsLoading(false);
            console.log("Error Creating Order");
            toast.error(err.response.data.msg);

        }
    }

    return (
        <>

            {
                isLoading && <Loader />

            }

            {success && <Navigate to={'/payment/success'} />
            }
            <Navbar />

            {
                data ?
                    <Container maxW={'container.lg'} minH={'96'} py={'20'}>
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />
                        <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ md: '8' }}>
                            <Box w={{ base: '100%', md: '70%' }} h={'100vh'} borderRadius={'2xl'} py={4}>
                                <Text fontWeight={'semibold'} fontSize={'xl'}>My Cart</Text>
                                {
                                    data && data?.map((cart: any, index: any) => {
                                        return (
                                            <Box key={index}>
                                                <Flex w={'full'} justifyContent={'space-between'} p={3} pr={4} display={'flex'} border={'none'} borderBottom={'1px'} pb={6} borderWidth={1} borderColor={'gray.200'} m="2" alignItems={'center'}>
                                                    <Box position={'relative'} w={{ base: '90px', md: '120px' }} h={{ base: '100px', md: '100px' }} flexShrink={0}>
                                                        <Image src={`http://localhost:4000/${cart.item?.image}`} alt={cart.item?.name} w={'full'} h={'full'} objectFit={'cover'} borderRadius={'xl'} />
                                                    </Box>
                                                    <Box
                                                        w={{ base: '100px', md: '180px' }}
                                                        px={3}
                                                        flexShrink={0}
                                                        alignItems={'center'}
                                                    >
                                                        <Heading fontSize={'lg'} mb={3} fontWeight={'bold'}>{cart.item?.name}</Heading>
                                                        <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight={'normal'} color={'gray.500'} mb={3} noOfLines={2}>{cart.item.category}</Text>
                                                    </Box>
                                                    <Text px={3} fontSize={'lg'} fontWeight={'semibold'}> ₹{cart.item.price * cart.quantity}</Text>

                                                    <ButtonGroup isAttached={true} size={'sm'}>
                                                        <Button colorScheme="gray" ><FaMinus size={8} /></Button>
                                                        <Button colorScheme="gray">{cart.quantity}</Button>
                                                        <Button colorScheme="gray" ><FaPlus size={8} /></Button>
                                                    </ButtonGroup>

                                                    <Button onClick={() => handleDelete(cart.item._id)} colorScheme="red" size={'sm'}><FaTrash /></Button>

                                                </Flex>
                                            </Box>
                                        )
                                    }
                                    )
                                }
                            </Box>
                            <Box w={{ base: '100%', md: '30%' }} h={'100vh'} borderRadius={'2xl'} py={4}>
                                <Text fontWeight={'semibold'} fontSize={'xl'}>Order Summary</Text>
                                <Flex direction={'column'} p={2} display={'flex'} m="2" alignItems={'center'}>
                                    <hr />

                                    {
                                        data && data.map((cart: any) => {
                                            return (
                                                <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} py={1} px={3}>
                                                    <Text fontSize={'md'} fontWeight={''}>{cart.quantity} × {cart.item?.name}</Text>
                                                    <Text fontSize={'md'} fontWeight={''} textAlign={'right'}> ₹{cart.item.price * cart.quantity}</Text>
                                                </Flex>
                                            )
                                        })
                                    }
                                    <Flex justifyContent={'space-between'} borderTop={'1px'} borderColor={'gray.300'} alignItems={'center'} w={'full'} py={2} px={3}>
                                        <Text fontSize={'md'} fontWeight={'medium'}>Sub Total</Text>
                                        <Text fontSize={'md'} fontWeight={'edmium'} textAlign={'right'}> ₹{subTotal}</Text>
                                    </Flex>
                                    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} py={2} px={3}>
                                        <Text fontSize={'md'} fontWeight={'medium'}>Delivery </Text>
                                        <Text fontSize={'md'} fontWeight={'edmium'} textAlign={'right'}> ₹{(4 / 100) * subTotal}</Text>
                                    </Flex>
                                    <Flex justifyContent={'space-between'} borderTop={'1px'} borderColor={'gray.300'} alignItems={'center'} w={'full'} py={2} px={3}>
                                        <Text fontSize={'md'} fontWeight={'medium'}>Total</Text>
                                        <Text fontSize={'md'} fontWeight={'medium'} textAlign={'right'}> ₹{subTotal + (4 / 100) * subTotal}</Text>
                                    </Flex>
                                    <Button onClick={createOrder} colorScheme="orange" size={'sm'} mt={4} w={'full'}>Checkout</Button>
                                </Flex>
                            </Box>

                        </Flex>
                    </Container>
                    :
                    <Container maxW={'container.lg'} minH={'96'} py={'20'} >
                        <Flex flexDirection={'column'} py={'20'} gap={{ md: '8' }} alignItems={'center'} justifyContent={'center'}>
                            <Image src='/assets/cartempty.png' alt='Empty Cart' w={'40%'} mx={'auto'} h={'full'} objectFit={'cover'} borderRadius={'xl'} />
                            <Text textAlign={'center'} fontWeight={'semibold'} fontSize={'xl'}>Your Cart is Empty</Text>
                            <Text textAlign={'center'} fontWeight={'normal'} fontSize={'md'}>Looks like you haven't added anything to your cart yet</Text>
                            <Button to={'/'} as={RouterLink} colorScheme="orange" size={'sm'} mt={4} rounded={'full'} >Continue Shopping</Button>
                        </Flex>
                    </Container>

            }
        </>
    )
}

export default Cart
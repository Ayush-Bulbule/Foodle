import React, { useEffect, useState } from 'react'
import { Container, Box, Heading, Text, Flex, Image, Button, baseTheme } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { getRestaurantDetails } from '../api/restaurantApi';
import Loader from '../components/Loader';
import { FaAd, FaFish, FaLeaf, FaPlus } from 'react-icons/fa';
import { FaRegStarHalfStroke, } from 'react-icons/fa6';
import Navbar from '../components/Navbar';
import MenuDetailsCard from '../components/MenuDetailsCard';
import { Toaster } from 'react-hot-toast';
import { getCart } from '../api/cartApi';

const RestaurantDetails = () => {

    //path
    const { id } = useParams<{ id: string }>();

    const [restaurant, setRestaurant] = useState<any>(null)
    const [menu, setMenu] = useState<any>(null)

    const [cart, setCart] = useState<any>(null)

    useEffect(() => {
        // fetch restaurant by id
        // setRestaurant(response.data)
        const fetchRestaurant = async () => {
            if (id) {
                const data = await getRestaurantDetails(id);
                const { cart } = await getCart();

                if (cart) {
                    setCart(cart);
                }
                setRestaurant(data.restaurant);
                setMenu(data.menu);
                console.log(data);
            }
        }
        fetchRestaurant();
    }, [id]);

    return (

        <>
            <Navbar />

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {
                restaurant ?
                    <Container
                        maxW={'container.lg'} minH={'96'} py={'20'} >


                        {/* Restaurant Data */}
                        <Box w={'full'} borderRadius={'2xl'} py={4}>
                            <Image src={`http://localhost:4000/${restaurant?.image}`} alt={restaurant?.name} w={'full'} maxH={'280px'} borderRadius={'xl'} />
                        </Box>
                        {/* Details */}
                        <Flex
                            px={3}
                            py={2}
                            alignItems={'center'}
                        >
                            <Box w={'full'} borderRadius={'2xl'} py={4}>
                                <Heading fontSize={'2xl'} mb={3} fontWeight={'bold'}>{restaurant?.name}</Heading>
                                <Text fontSize={'sm'} fontWeight={'medium'} mb={3}>{restaurant?.description}</Text>
                                <Text fontSize={'sm'} fontWeight={'light'}>
                                    {
                                        restaurant?.cuisine.map((cuisine: any, i: number) => (
                                            <span>{cuisine} {i < restaurant.cuisine.length - 1 ? ' | ' : ''}</span>
                                        ))
                                    }
                                </Text>

                                <Text fontSize={'sm'} fontWeight={'light'}>{restaurant?.address.street}, {restaurant?.address.city}, {restaurant?.address.state}, {restaurant?.address.zip}</Text>
                            </Box>

                            <Box>
                                <Box overflow={'hidden'} border={'1px'} borderWidth={1} borderColor={'gray.400'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} w={'full'} borderRadius={'xl'}>
                                    <Flex flexDirection={'row'} alignItems={'center'} py={2} justifyContent={'center'} gap={2}>
                                        <FaRegStarHalfStroke color={'green.400'} /><Heading fontSize={'xl'} fontWeight={'bold'}>{restaurant.rating}</Heading>
                                    </Flex>
                                    {
                                        restaurant.veg ?
                                            <Box p={1} px={4} bg={'green.400'} display={'flex'} gap={2} alignItems={'center'}>
                                                <FaLeaf color="white" /><Text fontSize={'sm'} color={'white'} fontWeight={'medium'}>Veg</Text>
                                            </Box> :
                                            <Box p={1} px={4} bg={'red.600'} display={'flex'} gap={2} alignItems={'center'}>
                                                <FaFish color="white" /><Text fontSize={'sm'} color={'white'} fontWeight={'medium'}>Non</Text>
                                            </Box>
                                    }
                                </Box>
                            </Box>

                        </Flex>
                        <hr />
                        {/* Menu */}
                        {
                            menu && menu.map((item: any) => {
                                const cartItem = cart && cart.items.find((cartItem: any) => cartItem.item == item._id);
                                // console.log("Cart Item:", cartItem)
                                const cartQty = cartItem?.quantity || 0;
                                console.log("Cart Qty:", cartQty)
                                return <MenuDetailsCard item={item} cartQty={cartQty || 0} />
                            })

                        }
                    </Container >

                    :
                    <Loader />
            }
        </>
    )
}

export default RestaurantDetails
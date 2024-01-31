import React, { useState } from 'react'
import { Flex, Box, Heading, Text, Image, Button, Badge } from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'
import { IMenu } from '../types'
import { addToCart } from '../api/cartApi'
import toast from 'react-hot-toast'


interface IProps {
    item: IMenu,
    cartQty: number
}

const MenuDetailsCard: React.FC<IProps> = ({ item, cartQty }) => {

    const [cartQuantity, setCartQuantity] = useState(cartQty)

    const handleAddToCart = async () => {
        console.log('add to cart');
        setCartQuantity(prev => prev + 1)
        const data = await addToCart(item._id, 1);
        if (data.status == 'success') {
            console.log("Item Added to Cart!!")
            toast.success('Item Added to Cart!!')
            return;
        }
        toast.error('Something went wrong!!')
    }

    return (
        <Flex w={'full'} py={3} display={'flex'} border={'none'} borderBottom={'1px'} pb={6} borderWidth={1} borderColor={'gray.200'} m="2" alignItems={'center'}>
            <Box position={'relative'} w={{ base: '90px', md: '180px' }} h={{ base: '100px', md: '130px' }} flexShrink={0}>
                <Image src={`http://localhost:4000/${item?.image}`} alt={item?.name} w={'full'} h={'full'} objectFit={'cover'} borderRadius={'xl'} />
                <Button
                    onClick={handleAddToCart}

                    position={'absolute'}
                    display={{ base: 'none', md: 'flex' }}
                    bottom={-2}
                    right={50}
                    left={50}
                    py={0.5}
                    px={3}
                    color={'green.500'}
                    size={'sm'}
                    columnGap={2}
                    shadow={'md'}
                >
                    Add
                    <FaPlus />
                </Button>
            </Box>
            <Box
                px={3}

                alignItems={'center'}
            >
                <Heading fontSize={'xl'} mb={3} fontWeight={'bold'}>{item?.name}</Heading>
                <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight={'normal'} color={'gray.500'} mb={3} noOfLines={2}>{item.description}</Text>
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <Flex alignItems={'center'} columnGap={2} justifyItems={'center'}>
                        <Text fontSize={'md'} fontWeight={'medium'}> ₹ {item?.price + 20}</Text>
                        <Text fontSize={'xs'} fontWeight={'medium'} color={'gray.500'}> | </Text>
                        <Text fontSize={'xs'} fontWeight={'medium'}>Serves {item.serving}</Text>
                        <Text fontSize={'xs'} fontWeight={'medium'} color={'gray.500'}> | </Text>
                        {cartQuantity !== 0 && <Badge colorScheme={'green'}>Items in Cart: {cartQuantity}</Badge>}
                    </Flex>
                    <Button size={'sm'} display={{ base: 'block', md: 'none' }}>Add</Button>
                </Flex>
            </Box>
        </Flex>
    )
}

export default MenuDetailsCard
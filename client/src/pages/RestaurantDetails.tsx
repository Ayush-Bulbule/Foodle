import React, { useEffect, useState } from 'react'
import { Container, Box, Heading, Text, Flex, Image, Button, baseTheme } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { getRestaurantDetails } from '../api/restaurantApi';
import Loader from '../components/Loader';
import { FaAd, FaFish, FaLeaf, FaPlus } from 'react-icons/fa';
import { FaRegStarHalfStroke, } from 'react-icons/fa6';

const RestaurantDetails = () => {

    //path
    const { id } = useParams<{ id: string }>();

    const [restaurant, setRestaurant] = useState<any>(null)
    const [menu, setMenu] = useState<any>(null)

    useEffect(() => {
        // fetch restaurant by id
        // setRestaurant(response.data)
        const fetchRestaurant = async () => {
            if (id) {
                const data = await getRestaurantDetails(id);
                setRestaurant(data.restaurant);
                setMenu(data.menu);
                console.log(data);
            }
        }
        fetchRestaurant();
    }, [id]);

    return (

        <>
            {
                restaurant ?
                    <Container
                        maxW={'container.lg'} minH={'96'} >

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
                            menu && menu.map((item: any) => (
                                <Flex w={'full'} py={3} display={'flex'} border={'none'} borderBottom={'1px'} pb={6} borderWidth={1} borderColor={'gray.200'} m="2" alignItems={'center'}>
                                    <Box position={'relative'} w={{ base: '90px', md: '180px' }} h={{ base: '100px', md: '130px' }} flexShrink={0}>
                                        <Image src={`http://localhost:4000/${item?.image}`} alt={item?.name} w={'full'} h={'full'} objectFit={'cover'} borderRadius={'xl'} />
                                        <Button
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
                                                <Text fontSize={'md'} fontWeight={'medium'}> ₹ {item?.price}</Text> | <Text fontSize={'xs'} fontWeight={'medium'}>Serves {item.serving}</Text>
                                            </Flex>
                                            <Button size={'sm'} display={{ base: 'block', md: 'none' }}>Add</Button>
                                        </Flex>
                                    </Box>
                                </Flex>
                            ))

                        }
                    </Container >

                    :
                    <Loader />
            }
        </>
    )
}

export default RestaurantDetails
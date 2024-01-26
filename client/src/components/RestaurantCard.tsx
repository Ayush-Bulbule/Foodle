import { Card, CardBody, Image, Stack, Heading, Text, } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'

import { IRestaurant } from '../types'
import Loader from './Loader'

const RestaurantCard: React.FC<IRestaurant> = (restaurant) => {
    return (
        <>
            {
                restaurant ?
                    <Link to={`/restaurant/${restaurant?._id}`}>
                        <Card maxW='xs' mt={5}>
                            <CardBody padding={0}>
                                <Image
                                    src={`http://localhost:4000/${restaurant.image}`}
                                    borderRadius='lg'
                                    w={'100%'}
                                    h={'160px'}
                                    objectFit={'cover'}
                                />
                                <Stack mt='2' padding={4} spacing='3'>
                                    <Heading size='md'>{restaurant.name}</Heading>
                                    <Text fontSize={'xs'}>
                                        {restaurant.cuisine.map((cuisine: any, i: number) => (
                                            <span>{cuisine} {i < restaurant.cuisine.length - 1 ? ' | ' : ''}</span>
                                        ))}
                                    </Text>
                                    <Text color='blue.600' fontSize='xs'>
                                        📍 {restaurant.address && restaurant.address.city}
                                    </Text>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Link>
                    : <p> ERRROR</p>

            }

        </>
    )
}

export default RestaurantCard
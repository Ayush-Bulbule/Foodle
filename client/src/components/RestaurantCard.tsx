import { Card, CardBody, Image, Stack, Heading, Text, } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { IRestaurant } from '../types/restaurant'
import Loader from './Loader'

const RestaurantCard: React.FC<IRestaurant> = (restaurant) => {
    return (
        <>
            {
                restaurant ?
                    <Card maxW='xs' mt={5}>
                        <CardBody padding={0}>
                            <Image
                                src='https://g5-assets-cld-res.cloudinary.com/image/upload/x_0,y_53,h_707,w_1254,c_crop/q_auto,f_auto,fl_lossy,c_fill,g_center,h_406,w_720/v1655239057/g5/g5-c-5lzenrews-olympus-property-management/g5-cl-1k8w0sflu3-olympus-sierra-pines/services/Indian_Food_fxsucn.jpg'
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='2' padding={4} spacing='3'>
                                <Heading size='md'>Albela Veg Restr</Heading>
                                <Text fontSize={'xs'}>
                                    North Indian | Chiniese | South | Fast Food
                                </Text>
                                <Text color='blue.600' fontSize='xs'>
                                    📍 Katraj, Pune
                                </Text>
                            </Stack>
                        </CardBody>
                    </Card>
                    : <p> ERRROR</p>

            }

        </>
    )
}

export default RestaurantCard
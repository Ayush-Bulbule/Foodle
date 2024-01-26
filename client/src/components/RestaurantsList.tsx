import RestaurantCard from './RestaurantCard';
import { Container, Text, Flex, Grid } from '@chakra-ui/react';
import { getTopRestaurants } from '../api/restaurantApi'
import { useEffect, useState } from 'react';
import Loader from './Loader';
import { IRestaurant } from '../types';


const RestaurantsList = () => {
    const [restaurants, setRestaurants] = useState<IRestaurant[]>([])

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const data = await getTopRestaurants()
                console.log(data)
                setRestaurants(data.restaurants)
            } catch (err) {
                console.log(err)
            }
        }
        fetchRestaurants();
    }, []);

    return (
        <>
            <Container display={'flex'} justifyItems={'center'} flexDirection={'column'} minH={'4xl'} maxW={'container.xl'} flex={1} my={'12'} alignItems={'center'} justifyContent={'center'}>
                <Text fontSize={'3xl'} fontWeight={'bold'} textAlign={'center'}>
                    Restaurants
                </Text>
                <Text fontSize={'md'} mt={'4'} textColor={'gray.600'} textAlign={'center'}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Text>

                <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={6} mt={'8'}>
                    {
                        restaurants ? restaurants.map((restaurant, index) => (
                            <RestaurantCard key={index} {...restaurant} />
                        )) :
                            <Loader />
                    }
                </Grid>
            </Container>
        </>
    )
}

export default RestaurantsList
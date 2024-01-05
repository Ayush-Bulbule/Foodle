import RestaurantCard from './RestaurantCard';
import { Container, Text, Flex } from '@chakra-ui/react';
import { getRestaurant } from '../api/restaurantApi'
import { useEffect, useState } from 'react';
import Loading from './Loading';


const RestaurantsList = () => {
    const [restaurants, setRestaurants] = useState([null])

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const data = await getRestaurant()
                setRestaurants(data)
                console.log(data)
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

                <Flex flexWrap={'wrap'} gap={10} mt={'8'} alignItems={'center'} justifyContent={'center'}>
                    {
                        (restaurants !== null) ? restaurants.map((restaurant, index) => (
                            <RestaurantCard key={index} restaurant={restaurant} />
                        )) :
                            <Loading />
                    }
                </Flex>
            </Container>
        </>
    )
}

export default RestaurantsList
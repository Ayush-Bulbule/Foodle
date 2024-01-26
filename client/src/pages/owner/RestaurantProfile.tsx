import React, { useEffect, useState } from 'react'
import { Box, Grid, Text, Flex, Image, GridItem, Input, Button, Switch, Select, Textarea } from '@chakra-ui/react'
import toast, { Toaster } from 'react-hot-toast'
import AddressForm from '../../components/owner/AddressForm';
import RestaurantDetailsForm from '../../components/owner/RestaurantDetailsForm';
import { getRestaurantDetails } from '../../api/restaurantApi';
import { IRestaurant } from '../../types';


const RestaurantProfile = () => {

    //Profile State
    const [profile, setProfile] = useState({
        _id: '',
        name: '',
        email: '',
        phone: '',
        veg: false,
        description: '',
        opens: '',
        closes: '',
        rating: 0,
        image: '',
        cuisine: [],

    });

    const [address, setAddress] = useState({
        building: '',
        street: '',
        locality: '',
        city: '',
        state: '',
        zip: ''
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getRestaurantDetails();
                console.log("✅ Success!")
                console.log(data)
                setProfile(data.restaurant);
                setAddress(data.restaurant.address);
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);


    return (
        <Box mt={'3'} p={'2'}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Text fontSize={'xl'} fontWeight={'bold'}>Restaurant Profile </Text>

            <Box mt={'3'} p={'4'} bg={'white'} rounded={'xl'} >


                <RestaurantDetailsForm profile={profile} setProfile={setProfile} />
                <hr />

                <Grid gap={3}
                    templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}>
                    <Box mt={3}>

                    </Box>
                    <GridItem
                        colSpan={2}
                        display={'flex'}
                        flexDirection={'column'}
                        columnGap={8}
                        pl={'4'}
                    >
                        {/* Restaurant Profile */}
                        <AddressForm address={address} setAddress={setAddress} />
                    </GridItem>
                </Grid>

            </Box >
        </Box >
    )
}

export default RestaurantProfile
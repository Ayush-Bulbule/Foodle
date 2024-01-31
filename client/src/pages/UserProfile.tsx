import React, { useState, useEffect } from 'react'
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import useLogout from '../hooks/useLogout'
import useAuth from "../hooks/useAuth"
import Navbar from '../components/Navbar'
import AddressForm from '../components/owner/AddressForm'


const Profile = () => {

    const handleLogout = useLogout();
    const { auth } = useAuth();


    const [address, setAddress] = useState(null);


    useEffect(() => {
        const data =
            console.log("Address: ", address);

    }, [])






    return (
        <>
            <Navbar />

            <Box display={'flex'} p={8} pt="20" maxW={'container.lg'} mx={'auto'} justifyContent={'flex'} >
                <Box w={"30%"} h={'100%'} px={"16"} pt={"20"}>
                    <Image w={"full"} src="https://source.boringavatars.com/beam" rounded={'full'} alt="" />
                </Box>
                <Box
                    w={'70%'}
                    p={'8'}
                    py={'20'}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-between'}
                    alignItems={'flex-start'}

                >
                    <Flex w={'full'} justifyContent={'space-between'}>
                        <Box>
                            <Text fontSize={'4xl'} mb={3}>{auth && auth.user.name}</Text>
                            <Text fontSize={'xl'} mb={3}>{auth && auth.user.email}</Text>
                            <Text fontSize={'xl'} mb={3}>{auth && auth.user.mobile}</Text>
                            <Text fontSize={'md'} mb={3} textTransform={'capitalize'}>Account Type: {auth && auth.user.role}</Text>
                        </Box>

                        <Button onClick={handleLogout} colorScheme={'orange'} w={'auto'} variant={'outline'}>LogOut</Button>

                    </Flex>
                    <hr />


                </Box>
            </Box >
        </>
    )
}

export default Profile
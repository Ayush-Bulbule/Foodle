import React from 'react'
import { Box, Button, Image, Text } from '@chakra-ui/react'
import useLogout from '../hooks/useLogout'
import useAuth from "../hooks/useAuth"


const Profile = () => {

    const handleLogout = useLogout();
    const { auth } = useAuth();


    return (
        <Box display={'flex'} p={8} justifyContent={'flex'} >
            <Box w={"30%"} h={'100%'}>
                <Image w={"full"} src="https://source.boringavatars.com/beam" rounded={'full'} alt="" />
            </Box>
            <Box
                w={'70%'}
                p={'8'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                alignItems={'flex-start'}

            >
                <Box>
                    <Text fontSize={'4xl'} mb={3}>{auth && auth.user.name}</Text>
                    <Text fontSize={'xl'} mb={3}>{auth && auth.user.email}</Text>
                    <Text fontSize={'xl'} mb={3}>{auth && auth.user.mobile}</Text>
                    <Text fontSize={'xl'} mb={3}>{auth && auth.user.role}</Text>
                </Box>

                <Button onClick={handleLogout} colorScheme={'orange'} w={'auto'}>LogOut</Button>


            </Box>
        </Box>
    )
}

export default Profile
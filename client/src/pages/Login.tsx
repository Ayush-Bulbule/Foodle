import { Box, Container, Flex, Text, Image, Button, Grid, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'
import { FaArrowAltCircleLeft, FaArrowCircleLeft, FaArrowLeft } from 'react-icons/fa'
import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={4} maxH={'100vh'} alignItems={"center"} justifyContent={"center"} h={'full'} >

            <Box flex="1" order={{ base: 2, md: 1 }}>
                {/* Content for the right half */}
                <Button rounded={'full'} bg={'orange'} shadow={'md'} color={'white'} position={'absolute'} top={'10'} left={'10'}>
                    <Link to={'/'} ><FaArrowLeft /></Link>
                </Button>
                <Image src={`./assets/login-3.jpg`} h={'full'} alt="Hero" maxH={'100vh'} ml={0} />

            </Box>
            <Box flex="1" order={{ base: 1, md: 2 }} py={'20'} pr={{ base: '', md: 48 }} px={{ base: '8' }} justifyContent={"center"} h={'full'}>
                {/* Content for the left half */}
                <Text fontSize="4xl" fontWeight="medium">
                    Signup to  <Text as="span" color={"orange.400"}>Foodle</Text>
                </Text>
                <Text fontSize={'md'} mr={'8'}>Welcome to Foodle Food Delivery! Satisfy your cravings with just a few clicks.</Text>
                <Box mt={14}>
                    <FormControl isRequired>
                        <Box >
                            <FormLabel>Email</FormLabel>
                            <Input type='email' placeholder='ayush@gmail.com' />
                        </Box>
                        <FormLabel mt={'8'}>Password </FormLabel>
                        <Input type='password' placeholder='*****' />
                    </FormControl>
                </Box>
                <Flex mt={'8'} alignItems={'center'}>
                    <Button fontWeight={'bold'} px={'8'} rounded={'full'} mr={6} backgroundColor={'orange.400'}>Login</Button>
                    <Link to='/signup'>Don't have an account?<Text as="span" color={'orange.500'}> SignUp</Text></Link>
                </Flex>
            </Box>

        </Grid>
    )
}

export default Login
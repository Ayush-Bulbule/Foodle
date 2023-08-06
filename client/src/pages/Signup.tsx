import { Box, Container, Flex, Text, Image, Button, Grid, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4} maxH={'100vh'} alignItems={"center"} justifyContent={"center"} h={'full'} >

            <Box flex="1" py={'8'} px={{ base: 10, md: 28 }} justifyContent={"center"} h={'full'}>
                {/* Content for the left half */}
                <Text fontSize="4xl" fontWeight="medium">
                    Signup to  <Text as="span" color={"orange.400"}>Foodle</Text>
                </Text>
                <Text fontSize={'md'} mr={'8'}>Welcome to Foodle Food Delivery! Satisfy your cravings with just a few clicks.</Text>
                <Box mt={14}>
                    <FormControl isRequired>
                        <FormLabel mt={'8'}>Full Name </FormLabel>
                        <Input placeholder='Ayush Bulbule' />
                        <Flex alignItems={'center'} flexDir={{ base: 'column', md: 'row' }} mt={'8'} justifyContent={{ base: 'start', md: 'space-between' }}>
                            <Box>
                                <FormLabel>Email</FormLabel>
                                <Input placeholder='ayush@gmail.com' />
                            </Box>
                            <Box w={{ ms: '1' }}>
                                <FormLabel>Phone</FormLabel>
                                <Input placeholder='+91 84593 20663' />
                            </Box>
                        </Flex>
                        <FormLabel mt={'8'}>Password </FormLabel>
                        <Input placeholder='*****' />

                        <FormLabel mt={'8'}>Address </FormLabel>
                        <Textarea placeholder='Flat No 101, Ganesh Road, Katraj, Pune - 441043' />

                    </FormControl>
                </Box>
                <Flex mt={'8'} alignItems={'center'}>
                    <Button fontWeight={'bold'} rounded={'full'} mr={6} backgroundColor={'orange.400'}>SignUp</Button>
                    <Link to='/login'>Already have an account?<Text as="span" color={'orange.500'}> Login</Text></Link>
                </Flex>
            </Box>
            <Box flex="1" display={'flex'} transform={{ base: 'rotate(90deg)', md: 'rotate(0deg)' }} alignItems={'flex-end'} justifyContent={'flex-end'}>
                {/* Content for the right half */}
                <Image src={`./assets/signup-2.jpg`} maxW={'screen'} alt="Hero" maxH={'100vh'} ml={0} />

            </Box>
        </Grid>
    )
}

export default Signup
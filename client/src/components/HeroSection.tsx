import { Box, Container, Image, Text, Button } from '@chakra-ui/react'
import React from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import api from '../api/api'
import axios from 'axios'

const HeroSection = () => {

    const handleGetStarted = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/getUsers', {
                withCredentials: true
            });
            console.log("Data:", response.data);
        } catch (err) {
            console.error("Error:", err);
        }
        console.log('Get Started');
    }

    return (
        <Container maxW="container.xl">
            {/* Your content goes here */}
            <Box display="flex" flexDirection={{ base: 'column-reverse', md: 'row' }} alignItems={"center"} justifyContent={"center"} h={'full'}>
                <Box flex="1" p={4} alignItems={"center"} justifyContent={"center"} h={'full'}>
                    {/* Content for the left half */}
                    <Text fontSize="4xl" fontWeight="bold">
                        <Text as="span" color={"orange.400"}>Foodle</Text> Satisfy Your Cravings, Anytime, Anywhere
                    </Text>
                    <Text fontSize={'md'} mr={'18'}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque possimus id, accusantium saepe?</Text>

                    <Button onClick={handleGetStarted} fontWeight={'bold'} rounded={'full'} mt={'8'} backgroundColor={'orange.400'}>Get Started</Button>
                </Box>
                <Box flex="1" p={4} backgroundColor="white">
                    {/* Content for the right half */}
                    <Image src={`./assets/hero.png`} alt="Hero" />
                </Box>
            </Box>
        </Container>
    )
}

export default HeroSection
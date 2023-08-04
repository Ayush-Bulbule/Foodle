import { Box, Center } from '@chakra-ui/react'
import React from 'react'
import HeroSection from '../components/HeroSection'
import OurMenuSection from '../components/OurMenuSection'

const Home = () => {
    return (
        <Box flex={1} alignItems={"center"} justifyContent={"center"} >
            <HeroSection />
            {/* Our Menu */}
            <OurMenuSection />
            <h1>Home</h1>
        </Box>
    )
}

export default Home
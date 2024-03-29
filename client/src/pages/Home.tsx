import { Box, Center } from '@chakra-ui/react'
import React from 'react'
import HeroSection from '../components/HeroSection'
import OurMenuSection from '../components/OurMenuSection'
import Navbar from '../components/Navbar'
import RestaurantsList from '../components/RestaurantsList'

const Home = () => {
    return (
        <>
            <Navbar />

            <Box paddingTop={'16'} flex={1} alignItems={"center"} justifyContent={"center"} >
                <HeroSection />
                {/* Our Menu */}
                <OurMenuSection />
                {/* Restairants */}
                <RestaurantsList />
                <h1>Home</h1>
            </Box>
        </>
    )
}

export default Home
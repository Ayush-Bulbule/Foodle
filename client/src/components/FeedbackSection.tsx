import { Container, Box, Text, Button, Image } from '@chakra-ui/react'
import React from 'react'

const FeedbackSection = () => {
    return (
        <Container display={'flex'} justifyItems={'center'} flexDirection={'column'} minH={'4xl'} maxW={'container.xl'} flex={1} my={'12'} alignItems={'center'} justifyContent={'center'}>
            <Box display="flex" alignItems={"center"} justifyContent={"center"} h={'full'}>
                <Box flex="1" p={4} alignItems={"center"} justifyContent={"center"} h={'full'}>
                    {/* Content for the left half */}
                    <Text fontSize="4xl" fontWeight="bold">
                        <Text as="span" color={"orange.400"}>Foodle</Text> Satisfy Your Cravings, Anytime, Anywhere
                    </Text>
                    <Text fontSize={'md'} mr={'18'}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque possimus id, accusantium saepe?</Text>

                    <Button fontWeight={'bold'} rounded={'full'} mt={'8'} backgroundColor={'orange.400'}>Get Started</Button>
                </Box>
                <Box flex="1" p={4} backgroundColor="white">
                    {/* Content for the right half */}
                    <Image src={`./assets/hero.png`} alt="Hero" />
                </Box>
            </Box>
        </Container>

    )
}

export default FeedbackSection
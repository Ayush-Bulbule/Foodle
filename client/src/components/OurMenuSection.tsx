import { Box, Container, Grid, Text, SimpleGrid, Menu, Flex, Button } from '@chakra-ui/react'
import React from 'react'
import MenuCard from './MenuCard'


const menu = [
    {
        "title": "Pav Bhaji",
        "desc": "Delicious street food",
        "img": "menu-1-pavbhaji.png"
    },
    {
        "title": "Chole Bhature",
        "desc": "Famous North Indian dish",
        "img": "menu-2-cholebhature.png"
    },
    {
        "title": "Masala Dosa",
        "desc": "South Indian delight",
        "img": "menu-3-dosa.png"
    },
    {
        "title": "Paneer Tikka",
        "desc": "Tandoori cottage cheese",
        "img": "menu-4-paneertikka.png"
    },

]

const OurMenuSection = () => {
    return (
        <Container display={'flex'} justifyItems={'center'} flexDirection={'column'} minH={'4xl'} maxW={'container.xl'} flex={1} my={'12'} alignItems={'center'} justifyContent={'center'}>
            <Text fontSize={'3xl'} fontWeight={'bold'} textAlign={'center'}>Our Popular Menu</Text>
            <Text fontSize={'md'} mt={'4'} textColor={'gray.600'} textAlign={'center'}>Lorem ipsum dolor sit amet consectetur adipisicing elit.  </Text>

            <Flex flexWrap={'wrap'} mt={'8'} alignItems={'center'} justifyContent={'center'}>
                {
                    menu.map((item, index) => (
                        <MenuCard key={index} title={item.title} desc={item.desc} img={item.img} />
                    ))
                }
            </Flex>
            <Button mt={'8'} bg={'orange.400'} rounded={'full'} color={'white'} mx={'auto'} fontWeight={'bold'}>More Menu</Button>
        </Container>
    )
}

export default OurMenuSection
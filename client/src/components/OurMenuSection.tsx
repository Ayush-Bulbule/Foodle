import React, { useEffect, useState } from 'react';
import { Container, Text, Flex, Button } from '@chakra-ui/react';
import MenuCard from './MenuCard';
import { getMenu } from '../api/restaurantApi';

const OurMenuSection = () => {
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        const getMenuFromApi = async () => {
            try {
                // Assuming getMenu is a function that fetches the menu data
                const data = await getMenu();
                setMenuData(data);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        };

        getMenuFromApi();
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <Container display={'flex'} justifyItems={'center'} flexDirection={'column'} minH={'4xl'} maxW={'container.xl'} flex={1} my={'12'} alignItems={'center'} justifyContent={'center'}>
            <Text fontSize={'3xl'} fontWeight={'bold'} textAlign={'center'}>
                Our Popular Menu
            </Text>
            <Text fontSize={'md'} mt={'4'} textColor={'gray.600'} textAlign={'center'}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Text>

            <Flex flexWrap={'wrap'} mt={'8'} alignItems={'center'} justifyContent={'center'}>
                {/* Render your menu items here */}
                {menuData.map((menuItem, index) => (
                    <MenuCard key={index} title={menuItem.name} desc={menuItem.desc} img={menuItem.image} />
                ))}
            </Flex>
            <Button mt={'8'} bg={'orange.400'} rounded={'full'} color={'white'} mx={'auto'} fontWeight={'bold'}>
                More Menu
            </Button>
        </Container>
    );
};

export default OurMenuSection;

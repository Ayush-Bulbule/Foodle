import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { FaHeart } from 'react-icons/fa'


interface MenuCardProps {
    title: string,
    desc: string,
    img: string,
    price: number
};


const MenuCard: React.FC<MenuCardProps> = ({ title, desc, img, price }) => {
    return (
        <Box minW={'60'} mx={'5'} bg={'gray.100'} my={'3'} maxW={'60'} shadow={'lg'} rounded={'md'} overflow={'hidden'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
            <Image m={'5'} src={`http://localhost:4000/${img}`} alt="Hero" height={'160px'} width={'160px'} objectFit={'cover'} rounded={'full'} />
            <Box w={'full'} bg={'white'} padding={'5'} paddingBottom={'2'} roundedTop={'100%'}>
                <Text fontWeight={'bold'} textAlign={'center'}>{title}</Text>
                <Text textAlign={'center'} color={'gray.600'}>{desc}</Text>
                <Flex mt={'2'}>
                    <Text fontWeight={'bold'} fontSize={'xl'} color={'orange.400'}>₹ {price}</Text>
                    <Text fontWeight={'bold'} fontSize={'xl'} color={'gray.600'} ml={'auto'}><FaHeart /></Text>
                </Flex>
            </Box>
        </Box>

    )
}

export default MenuCard
import { Box, HStack, Link, Flex, Text, Image, Button } from '@chakra-ui/react'
import React from 'react'
import { IoMdCart, IoMdLogIn } from 'react-icons/io'
import { FiSearch } from "react-icons/fi"
import { ColorModeSwitcher } from '../ColorModeSwitcher'

const Navbar = () => {
    return (
        <Box flex={1} padding={"6"} bg={"white"} alignItems={"center"} justifyContent={"space-between"} flexDirection={"row"} borderBottom={'1.5px'} borderColor={'gray.300'}>
            <Flex width={{ base: '100%', md: '80%', xl: '80%' }} mx={'auto'} direction={"row"} justifyContent={"space-between"}>

                <HStack verticalAlign={'center'} alignItems={"center"}>
                    <Image src={`./assets/logoclean.png`} alt="Logo" w={'38'} h={'38'} />
                    <Text fontSize={"xl"} fontWeight={"bold"} textColor={'gray.800'}>Foodle</Text>
                </HStack>
                <HStack gap={6}>
                    <Link href="/" fontSize={'lg'} fontWeight={'medium'} color={"gray.500"}>Home</Link>
                    <Link href="/" fontSize={'lg'} fontWeight={'medium'} color={"gray.500"}>Restraunts</Link>
                    <Link href="/" fontSize={'lg'} fontWeight={'medium'} color={"gray.500"}>About</Link>
                    <Link href="/" fontSize={'lg'} fontWeight={'medium'} color={"gray.500"}>Contact</Link>
                </HStack>
                <HStack gap={4}>
                    <Link href="/"><FiSearch size={24} /></Link>
                    <Link href="/"><IoMdCart size={24} /></Link>
                    <Button leftIcon={<IoMdLogIn />} variant='solid' bg={"orange.400"} textColor={"white"} rounded={"full"}>
                        Sign in
                    </Button>
                    <ColorModeSwitcher />
                </HStack>
            </Flex>
        </Box>
    )
}

export default Navbar
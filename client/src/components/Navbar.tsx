import { Box, HStack, Link, Flex, Text, Image, ModalBody, Modal, ModalOverlay, ModalCloseButton, ModalHeader, ModalContent, useDisclosure, Input, Container } from '@chakra-ui/react'
import React from 'react'
import { IoMdCart, IoMdLogIn } from 'react-icons/io'
import { FiSearch } from "react-icons/fi"
import { ColorModeSwitcher } from '../ColorModeSwitcher'

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Box flex={1} padding={"6"} bg={"white"} alignItems={"center"} justifyContent={"space-between"} flexDirection={"row"} borderBottom={'1.5px'} borderColor={'gray.300'}>
                <Flex width={{ base: '100%', md: '80%', xl: '80%' }} mx={'auto'} direction={"row"} justifyContent={"space-between"}>

                    <HStack verticalAlign={'center'} alignItems={"center"}>
                        <Image src={`./assets/logoclean.png`} alt="Logo" w={'38'} h={'38'} />
                        <Text fontSize={"2xl"} fontWeight={"bold"} textColor={'gray.800'}>Foodle</Text>
                    </HStack>
                    <Box display={{ base: 'none', md: 'flex' }} gap={6} alignItems={'center'} justifyContent={'center'} >
                        <Link href="/" fontSize={'lg'} fontWeight={'medium'} color={"gray.500"}>Home</Link>
                        <Link href="/" fontSize={'lg'} fontWeight={'medium'} color={"gray.500"}>Restraunts</Link>
                        <Link href="/" fontSize={'lg'} fontWeight={'medium'} color={"gray.500"}>About</Link>
                        <Link href="/" fontSize={'lg'} fontWeight={'medium'} color={"gray.500"}>Contact</Link>
                    </Box>
                    <HStack gap={4}>
                        <Link onClick={() => onOpen()}><FiSearch size={24} /></Link>
                        <Link href="/" display={{ base: 'none', md: 'block' }}><IoMdCart size={24} /></Link>
                        <Link href='/login' px={'6'} py={'2'} shadow={'xs'} variant='solid' bg={"orange.400"} textColor={"white"} rounded={"full"}>
                            Sign in
                        </Link>
                        <ColorModeSwitcher display={{ base: 'none', md: 'block' }} />
                    </HStack>
                </Flex>
            </Box>
            <Modal onClose={onClose} size={'full'} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <Container>
                        <Text fontSize={'2xl'} my={6}>Search from menu</Text>
                        <Input fontSize={'xl'} py={'8'} type='search' placeholder='Paneer Tikka...' />
                    </Container>

                </ModalContent>
            </Modal >
        </>
    )
}

export default Navbar
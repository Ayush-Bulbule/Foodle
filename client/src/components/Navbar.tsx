import { Box, HStack, Flex, Text, Image, Link, Modal, ModalOverlay, ModalCloseButton, ModalHeader, Button, ModalContent, useDisclosure, Input, Container, IconButton } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { IoMdCart } from 'react-icons/io'
import { FiSearch, FiUser } from "react-icons/fi"
import { useAuth } from '../store/auth/AuthContext'

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const auth = useAuth();

    const isLoggedIn = auth?.isLoggedIn;

    return (
        <>
            <Box flex={1} padding={"6"} bg={"white"} alignItems={"center"} justifyContent={"space-between"} flexDirection={"row"} borderBottom={'1.5px'} borderColor={'gray.300'}>
                <Flex width={{ base: '100%', md: '80%', xl: '80%' }} mx={'auto'} direction={"row"} justifyContent={"space-between"}>

                    <HStack verticalAlign={'center'} alignItems={"center"}>
                        <Image src={`./assets/logoclean.png`} alt="Logo" w={'38'} h={'38'} />
                        <Text fontSize={"2xl"} fontWeight={"bold"} textColor={'gray.800'}>Foodle</Text>
                    </HStack>
                    <Box display={{ base: 'none', md: 'flex' }} gap={6} alignItems={'center'} justifyContent={'center'} >
                        <Text fontSize={'lg'} fontWeight={'medium'} color={"gray.500"}><Link to="/" as={RouterLink}>Home</Link></Text>
                        <Text fontSize={'lg'} fontWeight={'medium'} color={"gray.500"}><Link to="/" as={RouterLink}>Restraunts</Link></Text>
                        <Text fontSize={'lg'} fontWeight={'medium'} color={"gray.500"}><Link to="/" as={RouterLink}>About</Link></Text>
                        <Text fontSize={'lg'} fontWeight={'medium'} color={"gray.500"}><Link to="/" as={RouterLink}>Contact</Link></Text>
                    </Box>
                    <HStack gap={4}>
                        <Link as={RouterLink} onClick={() => onOpen()}><FiSearch size={24} /></Link>
                        <Link as={RouterLink} to="/" display={{ base: 'none', md: 'block' }}><IoMdCart size={24} /></Link>

                        {
                            isLoggedIn ?
                                <IconButton
                                    isRound={true}
                                    variant='solid'
                                    colorScheme='orange'
                                    aria-label='Done'
                                    fontSize='22px'
                                    icon={<FiUser />}

                                />
                                :
                                <Button px={'6'} py={'2'} shadow={'xs'} variant='solid' bg={"orange.400"} textColor={"white"} rounded={"full"}>
                                    <Link as={RouterLink} to='/login'>Sīgn In</Link>
                                </Button>
                        }


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
import { Link as RouterLink } from 'react-router-dom'
import { Box, HStack, Flex, Text, Image, Link, Modal, ModalOverlay, ModalCloseButton, ModalHeader, Button, ModalContent, useDisclosure, Input, Container, IconButton } from '@chakra-ui/react'
import { LuShoppingCart, LuSearch, LuHelpingHand, LuPercent, LuPersonStanding, LuUser, LuChevronDown } from "react-icons/lu"

import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const auth = useAuth();
    const isLoggedIn = auth?.user;

    const [address, setAddress] = useState("");

    // Fetch Location and Address of the User
    useEffect(() => {
        const fetchLoc = async () => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(async ({ coords }) => {
                    const { latitude, longitude } = coords;
                    try {
                        const res = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=1d0e8cca24a34316b800c559b60d0811`)
                        console.log("DATA");
                        console.log("Lat: ", latitude, " Lng: ", longitude)
                        console.log(res.data);
                        setAddress(res.data.features[0].properties.name)
                        console.log(address)
                    } catch (err) {
                        console.log("Error", err)
                        toast.error("Error Fetching Address")
                    }
                })
            } else {
                const res = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=18.4575&lon=73.8508&apiKey=1d0e8cca24a34316b800c559b60d0811`)
                console.log("Address")
                console.log(res)
            }
        }
        // if (location?.lat && location.lng) {
        fetchLoc();
        // }
    }, [])



    return (
        <>
            <Box position={'fixed'} zIndex={'50'} width={'100%'} flex={1} paddingX={"6"} paddingY={'6'} boxShadow={'lg'} bg={"white"} alignItems={"center"} justifyContent={"space-between"} flexDirection={"row"} borderBottom={'1.5px'} borderColor={'gray.300'}>
                <Flex width={{ base: '100%', md: '80%', xl: '80%' }} mx={'auto'} direction={"row"} justifyContent={"space-between"}>
                    <HStack verticalAlign={'center'} alignItems={"center"}>
                        {/* Logo */}
                        <Image src={`./assets/logoclean.png`} alt="Logo" w={'38'} h={'38'} />
                        <Text fontSize={"2xl"} fontWeight={"bold"} textColor={'gray.800'}>Foodle</Text>

                        {/* Addresss */}
                        <Flex ml={'8'} alignItems={'center'} mt={1} cursor={'pointer'}>
                            <Text fontWeight={'semibold'} mr={2}>{address && address.split(' ').slice(0, 2).join(' ')} </Text>
                            <Text size={'xs'} color={'gray.700'} fontWeight={'light'}> {address.split(' ').slice(2).join(" ")}</Text>
                            <Box color={'ornage.500'}><LuChevronDown /></Box>
                        </Flex>
                    </HStack>
                    {/* Navbar Options */}
                    <HStack gap={10} key={auth?.user?.id}>
                        <Button onClick={onOpen} variant={'white'} bg={'transparent'} display={'flex'} alignItems={'center'} columnGap={'1.5'} as={RouterLink}><LuSearch size={18} /> Search</Button>
                        <Link to="/offers" display={'flex'} alignItems={'center'} columnGap={'1.5'} as={RouterLink}><LuPercent size={18} /> Offers</Link>
                        <Link to="/help" display={'flex'} alignItems={'center'} columnGap={'1.5'} as={RouterLink}><LuHelpingHand size={18} /> Help</Link>
                        <Link to="/cart" display={'flex'} alignItems={'center'} columnGap={'2'} as={RouterLink}><LuShoppingCart size={18} /> Cart</Link>
                        {
                            isLoggedIn ?
                                <Link to="/" color={'orange.500'} display={'flex'} alignItems={'center'} as={RouterLink}><LuUser size={18} style={{ marginRight: '3px' }} /> Ayush<LuChevronDown /></Link>

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
import {
    Box,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerContent,
    VStack,
    Link,
    Text,
    Flex,
    HStack,
    Image,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { BiStoreAlt } from "react-icons/bi";
import { LuLayoutDashboard, LuShoppingCart, LuChevronDown, LuWallet, LuPhone, LuListPlus, LuUser } from 'react-icons/lu';


interface Props {
    onClose: Function
    isOpen: boolean
    variant: 'drawer' | 'sidebar'
}
const active = 1;


const sidebarData = [
    {
        icon: <LuLayoutDashboard size={22} />,
        title: 'Dashboard',
    },
    {
        icon: <LuShoppingCart size={22} />,
        title: 'Orders'
    },
    {
        icon: <LuListPlus size={22} />,
        title: 'Add Menu'
    },
    {
        icon: <BiStoreAlt size={22} />,
        title: 'Restaurant'
    },
    {
        icon: <LuWallet size={22} />,
        title: 'Earnings'
    }, {
        icon: <LuPhone size={22} />,
        title: 'Support'
    }, {
        icon: <LuUser size={22} />,
        title: 'Profile'
    }
];

const SidebarContent = () => {
    const [active, setActive] = useState('/dashboard');
    useEffect(() => {
        const path = window.location.pathname.split('/')[2];
        setActive(path);
    }, [])

    return (<VStack py={'8'}>
        {
            sidebarData.map((item, index) => {
                const routeLink = item.title.toLowerCase().replace(' ', '');
                return (
                    <Link as={ReactRouterLink} to={`/owner/${routeLink}`} w="100%" key={index} _hover={{ textDecoration: 'none' }}>
                        <Flex
                            w="100%"
                            justifyContent="start"
                            alignItems="center"
                            backgroundColor={`${active == routeLink ? 'orange.100' : 'white'}`}
                            gap={4}
                            p={'2'}
                            rounded={'md'}
                            cursor={'pointer'}
                            px={'3'}
                            color={`${active == routeLink ? 'orange.500' : 'black'}`}
                            key={index}
                            _hover={{ backgroundColor: 'orange.400', color: 'white', textDecoration: 'none' }}
                            onClick={() => setActive(routeLink)}
                        >
                            {item.icon}
                            <Text size={'xl'} fontWeight={`${active == routeLink ? 'semibold' : ''}`}>{item.title}</Text>

                        </Flex>
                    </Link>)
            }
            )
        }
    </VStack >)

}

const Sidebar = ({ isOpen, variant, onClose }: Props) => {



    return variant === 'sidebar' ? (
        <Box
            position="fixed"
            left={0}
            p={5}
            w={{ base: '100%', md: '250px' }}
            top={0}
            h="100%"
        >
            <HStack verticalAlign={'center'} alignItems={"center"}>
                {/* Logo */}
                <Image src={`../../assets/logoclean.png`} alt="Logo" w={'38'} h={'38'} />
                <Text fontSize={"2xl"} fontWeight={"bold"} textColor={'gray.800'}>Foodle</Text>
            </HStack>
            <SidebarContent />
        </Box>
    ) : (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Chakra-UI</DrawerHeader>
                    <DrawerBody>
                        <SidebarContent />
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )
}

export default Sidebar

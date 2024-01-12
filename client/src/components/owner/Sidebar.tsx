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
import { useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { BiStoreAlt } from "react-icons/bi";
import { LuLayoutDashboard, LuShoppingCart, LuChevronDown, LuWallet, LuPhone, LuListPlus } from 'react-icons/lu';


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
        icon: <LuPhone />,
        title: 'Support'
    }
];
const SidebarContent = ({ onClick }: { onClick: Function }) => {

    return (<VStack py={'8'}>
        {
            sidebarData.map((item, index) => (
                <Link as={ReactRouterLink} to={`/owner/${item.title.toLowerCase()}`} w="100%" key={index} >
                    <Flex
                        w="100%"
                        justifyContent="start"
                        alignItems="center"
                        backgroundColor={`${index = 1}?'orange.400':'white'`}
                        gap={4}
                        p={'2'}
                        rounded={'md'}
                        cursor={'pointer'}
                        color={`${active == 1}?'white':'gray.800'`}
                        px={'3'}
                        key={index}
                        onClick={() => onClick()}
                    >
                        {item.icon}
                        <Text size={'xl'} _hover={{ textDecoration: 'none' }}>{item.title}</Text>

                    </Flex>
                </Link>
            ))
        }
    </VStack>)

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
            <SidebarContent onClick={onClose} />
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

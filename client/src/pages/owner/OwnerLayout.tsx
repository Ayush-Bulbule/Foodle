import React, { useState, useEffect } from "react";
import Sidebar from '../../components/owner/Sidebar'
import { useBreakpointValue, Box, Flex, Button, Grid } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import { Toaster } from "react-hot-toast";

const OwnerLayout = () => {


    const smVariant = { navigation: 'drawer', navigationButton: true }
    const mdVariant = { navigation: 'sidebar', navigationButton: false }

    // Sidebar Props
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const variants = useBreakpointValue({ base: smVariant, md: mdVariant })

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

    return (
        <>
            <Flex>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <Sidebar
                    //@ts-ignore
                    variant={variants?.navigation}
                    isOpen={isSidebarOpen}
                    onClose={toggleSidebar}
                />

                <Box h={'100vh'} w={{ base: '100vw', lg: '100%' }} ml={{ lg: '250px' }} p={'4'} bg={'gray.50'}>
                    {/* Header Section */}
                    <Box display={'flex'}>
                        <Button onClick={toggleSidebar} bg={'white'} variant={'solid'} border={'1px'} borderColor={'orange.400'}>
                            <HiMenuAlt1 />
                        </Button>
                    </Box>
                    {/* Body */}
                    <Outlet />
                </Box>
            </Flex >
        </>
    )
}

export default OwnerLayout
import React, { useState, useEffect } from "react";
import Sidebar from '../../components/owner/Sidebar'
import { useBreakpointValue, Box, Flex, Button, Grid } from "@chakra-ui/react";
import { HiMenuAlt1 } from 'react-icons/hi'
import InfoCard from "../../components/owner/InfoCard";

const Dashboard = () => {


    const smVariant = { navigation: 'drawer', navigationButton: true }
    const mdVariant = { navigation: 'sidebar', navigationButton: false }

    // Sidebar Props
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const variants = useBreakpointValue({ base: smVariant, md: mdVariant })

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

    return (
        <>
            <Flex>
                <Sidebar
                    variant={variants?.navigation}
                    isOpen={isSidebarOpen}
                    onClose={toggleSidebar}
                />

                <Box h={'100vh'} w={{ base: '100vw', lg: '100%' }} ml={{ lg: '250px' }} p={'4'} bg={'gray.100'}>
                    {/* Header Section */}
                    <Box display={'flex'}>
                        <Button onClick={toggleSidebar} bg={'white'} variant={'solid'} border={'1px'} borderColor={'orange.400'}>
                            <HiMenuAlt1 />
                        </Button>
                    </Box>


                    {/* Body Section */}
                    <Grid
                        mt={'4'}
                        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
                        gap={2}
                    >
                        <InfoCard />
                        <InfoCard />
                        <InfoCard />
                        <InfoCard />

                    </Grid>


                </Box>
            </Flex >
        </>
    )
}

export default Dashboard
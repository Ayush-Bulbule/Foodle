import { Box, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

const LoginPage = () => {
    return (
        <Box flex={1}>
            <Grid placeItems="center" h="100vh">
                <GridItem w='100%' h='10' bg='blue.500' />
                <GridItem w='100%' h='10' bg='blue.500' />
            </Grid>
        </Box>
    )
}

export default LoginPage
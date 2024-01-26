import { Container, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
    return (
        <Container
            maxW={'container.lg'}
            h={'100vh'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="orange.500"
                size="xl"
            />
        </Container>
    )
}

export default Loader
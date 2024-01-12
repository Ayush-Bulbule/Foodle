import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { LuUsers } from 'react-icons/lu'

const InfoCard = () => {
    return (
        <Flex flexDirection={'column'} bg={'white'} p={'6'} rounded={'xl'} shadow={'sm'}>
            <Box display={'flex'} alignItems={'center'} flexDirection={'row'} gap={'2'}>
                <LuUsers />
                <Text size={{ base: 'xs' }}> Users</Text>
            </Box>
            <Text fontSize={'2xl'} fontWeight={'bold'}> 100+</Text>
        </Flex >
    )
}

export default InfoCard
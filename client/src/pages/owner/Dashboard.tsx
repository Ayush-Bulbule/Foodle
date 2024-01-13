import { Box, Grid, Button, } from '@chakra-ui/react';
import InfoCard from '../../components/owner/InfoCard';

const Dashboard = () => {
    return (
        <>
            {/* Gird of Cards */}
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
        </>
    )
}

export default Dashboard
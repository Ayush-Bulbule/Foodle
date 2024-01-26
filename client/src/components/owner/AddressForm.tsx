import { Box, Flex, Grid, Text, Select, Input, Button } from '@chakra-ui/react'
import { IAddress } from '../../types'
import { toast } from 'react-hot-toast'
import { updateRestaurantAddress } from '../../api/restaurantApi'

interface AddressProps {
    address: IAddress,
    setAddress: React.Dispatch<React.SetStateAction<IAddress>>
}

const AddressForm: React.FC<AddressProps> = ({ address, setAddress }) => {

    //Handle Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log(name, value)
        console.log(e.target.value)

        //Update the Address
        setAddress({ ...address, [name]: value });
        console.log("Address")
    }
    //handle Submit
    const handleSubmit = () => {
        console.log(address);
        console.log("Address Updated");
        //Post to update the request

        const data = updateRestaurantAddress(address);
        console.log(data);
        toast.success("Address Updated!!");
    }

    return (
        <>
            <Text mt={'4'} fontSize={'md'} mb={3} fontWeight={'semibold'} color={'orange.400'}>Restaurant Address</Text>
            <Grid
                gap={2}
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }}
            >
                <Flex direction={'column'} mb={'4'}>
                    <Text fontSize={'sm'} mb={1} fontWeight={'semibold'}>Building Name/No</Text>
                    <Input value={address.building} onChange={handleChange} name='building' mb={3} placeholder='Street Address' size='md' />
                    <Text fontSize={'sm'} mb={1} fontWeight={'semibold'}>Locality</Text>
                    <Input value={address.locality} onChange={handleChange} name='locality' mb={3} placeholder='Locality' size='md' />
                    <Text fontSize={'sm'} mb={1} fontWeight={'semibold'}>State</Text>
                    {/* <Select value={address.state} mb={3} placeholder="Select State" size={'md'}>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </Select> */}
                    <Input value={address.state} onChange={handleChange} name='state' mb={3} placeholder='Locality' size='md' />
                </Flex>

                <Flex direction={'column'} mb={'4'}>
                    <Text fontSize={'sm'} mb={1} fontWeight={'semibold'}>Street</Text>
                    <Input value={address.street} onChange={handleChange} name='street' mb={3} placeholder='Street' size='md' />
                    <Text fontSize={'sm'} mb={1} fontWeight={'semibold'}>City</Text>
                    <Input value={address.city} onChange={handleChange} name='city' mb={3} placeholder='City' size='md' />
                    <Text fontSize={'sm'} mb={1} fontWeight={'semibold'}>Zip/PostalCode</Text>
                    <Input value={address.zip} onChange={handleChange} name='zip' mb={3} placeholder={'Pincode'} size='md' />
                </Flex>
                <Box>
                    <Button onClick={handleSubmit} colorScheme="orange" size="sm" mb={'4'}>Update Address </Button>
                </Box>

            </Grid>
        </>
    )
}

export default AddressForm
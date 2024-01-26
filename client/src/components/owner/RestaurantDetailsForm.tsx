import React, { useState, useEffect } from 'react'
import { Box, Flex, Text, Input, Button, Switch, Textarea, GridItem, Grid, Image } from '@chakra-ui/react'
import { TagsInput } from "react-tag-input-component";
import { getRestaurantDetails, updateRestaurant } from '../../api/restaurantApi';
import toast from 'react-hot-toast';
import { IRestaurant } from '../../types';


interface Props {
    profile: IRestaurant,
    setProfile: Function
}

const RestaurantDetailsForm: React.FC<Props> = ({ profile, setProfile }) => {

    const [cuisine, setCuisine] = useState<string[]>([]);
    const [edit, setEdit] = useState(false);

    const [image, setImage] = useState<File | null>(null);


    //cuisine
    useEffect(() => {
        console.log(profile.cuisine)
        console.log("Cuisine")
        setCuisine(profile.cuisine)
    }, []);


    useEffect(() => {
        setProfile({ ...profile, cuisine: cuisine })
    }, [cuisine]);

    //Handle Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        console.log(name, value)
        console.log(e.target.value)
        setProfile({ ...profile, [name]: value });
    }

    //handle Image CHange
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    }
    ////Submit Handler
    const handleSubmit = async () => {
        console.log("Profile Data");
        console.log(profile);

        const formData = new FormData();
        formData.append("name", profile.name);
        formData.append("email", profile.email);
        formData.append("phone", profile.phone);
        formData.append("veg", profile.veg.toString());
        formData.append("description", profile.description);
        formData.append("opens", profile.opens);
        formData.append("closes", profile.closes);
        formData.append("rating", profile.rating.toString());

        if (image) {
            formData.append("image", image);
        }
        //append image

        try {
            const data = await updateRestaurant(profile._id, formData);
            console.log("✅SUCCESS: ", data)

            setEdit(false);
            if (data) {
                toast.success("Data Updated!!");
                // //clear form
                // setProfile({
                //     _id: '',
                //     name: '',
                //     email: '',
                //     phone: '',
                //     image: '',
                //     veg: false,
                //     description: '',
                //     opens: '',
                //     closes: '',
                //     rating: 0,
                //     cuisine: []
                // })
            }
        } catch (err) {
            console.log("Add Menu ERROR: ", err)
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            <Grid gap={3}
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}>
                <Box mt={3}>
                    <Image onChange={(e) => setProfile({ ...profile, image: e.target?.value })} objectFit={'cover'} w={'full'} name="image" src={`http://localhost:4000/${profile.image}`} alt={profile.name} rounded={'xl'} />
                    <Input type='file' onChange={handleImageChange} name='image' mt={4} disabled={!edit} />
                </Box>
                <GridItem
                    colSpan={2}
                    display={'flex'}
                    flexDirection={'column'}
                    columnGap={8}
                    pl={'4'}
                >
                    {/* Restaurant Profile */}
                    <Box position={'relative'} mb={'8'}>
                        <Button onClick={() => setEdit(edit => !edit)} colorScheme="teal" position={'absolute'} right={0} top={0} variant="outline" size="sm" mb={'4'}>Edit Restaurant Data</Button>
                    </Box>

                    {/* Row 1 */}
                    <Flex direction={'row'} gap={6} mb={'4'}>
                        <Box w={{ base: '100%', md: '50%' }}>
                            <Text fontSize={'sm'} mb={2} fontWeight={'semibold'}>Name</Text>
                            <Input onChange={handleChange} disabled={!edit} name="name" value={profile.name} placeholder='Restaurant Name' size='md' />
                        </Box>
                        <Box w={{ base: '100%', md: '50%' }}>
                            <Text fontSize={'sm'} mb={2} fontWeight={'semibold'}>Vegetarian</Text>
                            <Switch mt={1} isChecked={profile.veg} name="veg" size="lg" colorScheme="green" disabled={!edit} />
                        </Box>
                    </Flex>


                    {/* Row 2 */}
                    <Flex direction={'row'} gap={6} mb={'4'}>
                        <Box w={{ base: '100%', md: '50%' }}>
                            <Text fontSize={'sm'} mb={2} fontWeight={'semibold'}>Phone</Text>
                            <Input onChange={(e) => handleChange(e)} name="phone" value={profile.phone} placeholder='Restaurant Phone' size='md' disabled={!edit} />
                        </Box>
                        <Box w={{ base: '100%', md: '50%' }}>
                            <Text fontSize={'sm'} mb={2} fontWeight={'semibold'}>Email</Text>
                            <Input onChange={(e) => handleChange(e)} name="email" value={profile.email} placeholder='Restaurant Email' size='md' disabled={!edit} />
                        </Box>
                    </Flex>

                    <Flex direction={'row'} gap={6} mb={'4'}>
                        <Box w={{ base: '100%', md: '50%' }}>
                            <Text fontSize={'sm'} mb={2} fontWeight={'semibold'}>Opens</Text>
                            <Input onChange={(e) => handleChange(e)} name="opens" value={profile.opens} type="time" placeholder=' Opens' size='md' disabled={!edit} />
                        </Box>
                        <Box w={{ base: '100%', md: '50%' }}>
                            <Text fontSize={'sm'} mb={2} fontWeight={'semibold'}>Closes</Text>
                            <Input onChange={(e) => handleChange(e)} name="closes" value={profile.closes} type="time" placeholder='closes' size='md' disabled={!edit} />
                        </Box>
                    </Flex>


                    <Flex direction={'row'} gap={6} mb={'4'}>
                        <Box w={{ base: '100%', md: '50%' }}>
                            <Text fontSize={'sm'} mb={2} fontWeight={'semibold'}>Available Cuisines</Text>
                            {
                                cuisine &&
                                <TagsInput
                                    value={cuisine}
                                    //@ts-ignore
                                    onChange={setCuisine}
                                    name="cuisine"
                                    placeHolder="Add Cuisins..."
                                    disabled={!edit}
                                />
                            }
                            <em style={{ fontSize: '0.8rem' }}>press enter or comma to add new tag</em>
                        </Box>
                        <Box w={{ base: '100%', md: '50%' }}>
                            <Text fontSize={'sm'} mb={2} fontWeight={'semibold'}>Rate YourRestro</Text>
                            <Input onChange={(e) => handleChange(e)} name="rating" value={profile.rating} type='number' placeholder='0-5' size='md' disabled={!edit} />
                        </Box>
                    </Flex>
                    <Textarea onChange={handleChange} value={profile.description} placeholder='Description' name="description" size='md' disabled={!edit} />
                    <Box mt={3}>
                        <Button onClick={() => handleSubmit()} colorScheme="orange" size="sm" mb={'4'}>Update </Button>
                    </Box>
                </GridItem>
            </Grid>
        </>
    )
}

export default RestaurantDetailsForm
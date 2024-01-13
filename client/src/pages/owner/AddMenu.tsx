import { useState } from 'react'
import { Box, Grid, Text, Input, Flex, Button, Select, Switch, Textarea, GridItem } from '@chakra-ui/react'
import toast, { Toaster } from 'react-hot-toast';


import ImageCropper, { IImageCropArea } from '../../components/owner/ImageCropper';
import FileInput from '../../components/owner/FileInput';
import { addMenu } from '../../api/restaurantApi';


const AddMenu = () => {
    // Image Cropper 
    const [image, setImage] = useState<string | null>("");
    const [imgAfterCrop, setImgAfterCrop] = useState("");

    //Menu Data 
    const [menuData, setMenuData] = useState({
        name: '',
        price: '',
        serving: '',
        category: '',
        veg: false,
        description: '',
        image: null

    })

    // Invoked when new image file is selected
    const onImageSelected = (selectedImg: string | ArrayBuffer | null) => {
        setImage('');
        setImage(selectedImg);
    };

    // Cancelling Image Crop
    const onCropCancel = () => {
        setImage("");
    };

    // Generating Cropped Image When Done Button Clicked
    const onCropDone = (imgCroppedArea: IImageCropArea) => {
        const canvasEle = document.createElement("canvas");
        canvasEle.width = imgCroppedArea.width;
        canvasEle.height = imgCroppedArea.height;
        const context = canvasEle.getContext("2d");
        let imageObj1 = new Image();
        imageObj1.src = image;
        imageObj1.onload = function () {
            context.drawImage(
                imageObj1,
                imgCroppedArea.x,
                imgCroppedArea.y,
                imgCroppedArea.width,
                imgCroppedArea.height,
                0,
                0,
                imgCroppedArea.width,
                imgCroppedArea.height
            );
            // Getting the data URL and Stroring the Image in imgAfterCrop
            const dataURL = canvasEle.toDataURL("image/jpeg");
            setImgAfterCrop(dataURL);
            setImage('')
        };
    };

    // Converting Data URL to Blob  i.e  File for Image Upload
    function dataURLtoBlob(dataURL) {
        var byteString = atob(dataURL.split(',')[1]);
        var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    // Handle Form Submit 
    //onchnage Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setMenuData({ ...menuData, [name]: value });
    }

    //Handle Switch
    const handleSwitch = () => {
        console.log(!menuData.veg)
        setMenuData({ ...menuData, veg: !menuData.veg });
    }

    //onSubmit Handler
    const addMenuData = async () => {
        console.log("Menu Data");
        if (!imgAfterCrop) {
            alert("Please Upload Image")
            return;
        }
        const formData = new FormData();
        formData.append("name", menuData.name);
        formData.append("price", menuData.price);
        formData.append("serving", menuData.serving);
        formData.append("category", menuData.category);
        formData.append("veg", menuData.veg.toString());
        formData.append("description", menuData.description);
        //handle cropped image
        const blob = dataURLtoBlob(imgAfterCrop);
        // Create FormData object
        formData.append('image', blob, 'croppedImage.jpeg');

        try {
            const data = await addMenu(formData);
            console.log("✅SUCCESS: ", data)
            if (data) {
                toast.success(data.msg);
                //clear form
                setMenuData({
                    name: '',
                    price: '',
                    serving: '',
                    category: '',
                    veg: false,
                    description: '',
                    image: null
                })

                setImgAfterCrop("");
            }

        } catch (err) {
            console.log("Add Menu ERROR: ", err)
            toast.error("Something went wrong");
        }
        console.log(formData.get("image"));
        console.log(formData);
        setImage("");
    }



    return (
        <Box mt={'3'} p={'2'}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Text fontSize={'xl'} fontWeight={'bold'}>Add Menu </Text>
            <Grid
                gap={3}
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}>
                <GridItem p={'6'} mt={'6'} bg={'white'} rounded={'xl'} colSpan={{ lg: 2 }}>
                    <Flex direction={'column'}>
                        <Text fontSize={'sm'} fontWeight={'semibold'} py={'2'}>Name </Text>
                        <Input onChange={handleInputChange} name='name' value={menuData.name} placeholder='Menu Name' size='md' />
                        <Flex alignItems={'center'} direction={'row'} gap={'4'} py={'2'}>
                            <Flex direction={'column'} w={'50%'} alignItems={''}>

                                <Text mt={'3'} fontSize={'sm'} fontWeight={'semibold'} py={'2'}>Price </Text>
                                <Input onChange={handleInputChange} value={menuData.price} name='price' placeholder='Price (₹)' size='md' />
                            </Flex>

                            <Flex direction={'column'} w={'50%'} alignItems={''}>
                                <Text mt={'3'} fontSize={'sm'} fontWeight={'semibold'} py={'2'}>Servings </Text>
                                <Input onChange={handleInputChange} value={menuData.serving} name='serving' placeholder='2 Person' size='md' />
                            </Flex>

                        </Flex>
                        {/* Category && VEG/NONVEG */}
                        <Flex mt={'3'} alignItems={'center'} direction={'row'} gap={'4'} py={'2'}>
                            <Flex direction={'column'} w={'50%'} alignItems={''}>
                                <Text fontSize={'sm'} mb={'2'} fontWeight={'semibold'}>Category </Text>
                                <Select onChange={handleInputChange} name='category' placeholder="Select Category" size={'md'}>
                                    <option value="appetizers">Appetizers</option>
                                    <option value="breakfast">Breakfast</option>
                                    <option value="main-course-vegetarian">Main Course (Vegetarian)</option>
                                    <option value="main-course-non-vegetarian">Main Course (Non-Vegetarian)</option>
                                    <option value="breads">Breads</option>
                                    <option value="rice-dishes">Rice Dishes</option>
                                    <option value="desserts">Desserts</option>
                                    <option value="beverages">Beverages</option>
                                    <option value="snacks">Snacks</option>
                                    <option value="sweets">Sweets</option>
                                </Select>
                            </Flex>
                            <Flex direction={'column'} w={'50%'} alignItems={''}>
                                <Text fontSize={'sm'} mb={'2'} fontWeight={'semibold'}>Veg </Text>
                                <Switch checked={menuData.veg} onChange={handleSwitch} size="lg" colorScheme="green" />
                            </Flex>
                        </Flex>
                        <Text fontSize={'sm'} fontWeight={'semibold'} py={'2'}>Description </Text>
                        <Textarea onChange={handleInputChange} value={menuData.description} name='description' placeholder='Description' size='md' />
                    </Flex>
                    <Button onClick={addMenuData} size={'md'} mt={'4'} colorScheme={'orange'}>Add Menu</Button>
                </GridItem>

                {/* Image Cropper */}
                <GridItem p={'6'} mt={'6'} bg={'white'} rounded={'xl'}>
                    {/* File Input Component */}
                    <Text fontSize={'sm'} fontWeight={'semibold'} py={'2'}>Upload Image </Text>
                    <FileInput onImageSelected={onImageSelected} />
                    {
                        image ? <ImageCropper
                            image={image}
                            onCropDone={onCropDone}
                            onCropCancel={onCropCancel}
                        /> :
                            <img src={imgAfterCrop} className="cropped-img" />
                    }
                </GridItem>
            </Grid>
        </Box >
    )
}

export default AddMenu
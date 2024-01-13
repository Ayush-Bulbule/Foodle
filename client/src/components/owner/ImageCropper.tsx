import { useState } from "react";
import { Box, Button } from '@chakra-ui/react';
import Cropper from "react-easy-crop";


export interface IImageCropArea {
    x: number,
    y: number,
    width: number,
    height: number
}

interface ImageCropperProps {
    image: string; // Assuming 'image' is the URL or base64 string of the image
    onCropDone: (croppedArea: IImageCropArea) => void;
    onCropCancel: () => void;
}

function ImageCropper({ image, onCropDone, onCropCancel }: ImageCropperProps) {
    const [crop, setCrop] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);

    const [croppedArea, setCroppedArea] = useState<IImageCropArea | null>(null);
    const aspectRatio = 16 / 9;

    const onCropComplete = (croppedAreaPercentage: any, croppedAreaPixels: any) => {
        setCroppedArea(croppedAreaPixels);
    };

    return (
        <Box position={'relative'} w={'100%'} h={'100%'} >
            <Box position={'relative'} w={'100%'} h={'50%'} minH={'250px'} p={'2'} rounded={'xl'}>
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspectRatio}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                />
            </Box>
            <Box mt={'2'} textAlign={'center'} marginTop={'4'}>
                <Button size={'sm'} bg={'red.400'} color={'white'} onClick={() => onCropCancel()}>Cancel</Button>
                <Button size={'sm'} ml={'4'} bg={'green.400'} color={'white'} onClick={() => croppedArea && onCropDone(croppedArea)}>Done</Button>
            </Box>
        </Box>
    );
}

export default ImageCropper;

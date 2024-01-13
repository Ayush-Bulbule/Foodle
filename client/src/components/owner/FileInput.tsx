import { ChangeEvent, useRef } from "react";
import { Input } from "@chakra-ui/react";

interface FileInputProps {
    onImageSelected: (imageData: string | ArrayBuffer | null) => void;
}

function FileInput({ onImageSelected }: FileInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function (e) {
                onImageSelected(reader.result);
            };
        }
    };

    return (
        <Input
            onChange={handleOnChange}
            mb={'2'}
            p={'2'}
            type="file"
            accept="image/*"
            variant={'outline'} colorScheme={'orange'} size={'md'} placeholder='Upload Thumbnail'
            ref={inputRef}
        />
    );
}

export default FileInput;

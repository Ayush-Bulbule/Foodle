import e from 'express';
import multer from 'multer'

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        console.log(file);
        const ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        console.log(ext)
        cb(null, "img" + '-' + Date.now() + ext)
    }
})
const store = multer({ storage: storage })
export default store
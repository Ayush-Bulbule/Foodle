import e from 'express';
import multer from 'multer'

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        cb(null, file.originalname + '-' + Date.now() + ext)
    }
})
const store = multer({ storage: storage })
export default store
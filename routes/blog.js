const express = require('express');
const router = express.Router();
const multer = require('multer');
const blogController = require('../controllers/blogController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'authorProfile', maxCount: 1 }]), blogController.createBlog);
router.get('/getAll', blogController.getAllBlogs);
router.get('/get/:id', blogController.getBlogById);
router.put('/update/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'authorProfile', maxCount: 1 }]), blogController.updateBlogById);
router.delete('/delete/:id', blogController.deleteBlogById);

module.exports = router;

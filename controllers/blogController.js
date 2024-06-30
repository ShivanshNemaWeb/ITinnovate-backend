const Blog = require('../models/blog');
const { uploadImageToS3 } = require('../helpers/s3');

// Create a new blog
exports.createBlog = async (req, res) => {
    try {
        const { title, authorName, paragraph, content, boxText, lastContent, tags,tag } = req.body;
        let imageUrl = null;
        let authorProfileUrl = null;

        if (req.files['image']) {
            imageUrl = await uploadImageToS3(req.files['image'][0].buffer, req.files['image'][0].originalname, 'blogImages');
        }

        if (req.files['authorProfile']) {
            authorProfileUrl = await uploadImageToS3(req.files['authorProfile'][0].buffer, req.files['authorProfile'][0].originalname, 'authorProfiles');
        }

        const newBlog = new Blog({
            title,
            image: imageUrl,
            author: {
                profile: authorProfileUrl,
                name: authorName
            },
            paragraph,
            content,
            boxText,
            lastContent,
            tags,
            tag
        });

        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update a blog by ID
exports.updateBlogById = async (req, res) => {
    try {
        const { title, authorName, paragraph, content, boxText, lastContent, tags } = req.body;
        let imageUrl = null;
        let authorProfileUrl = null;

        if (req.files['image']) {
            imageUrl = await uploadImageToS3(req.files['image'][0].buffer, req.files['image'][0].originalname, 'blogImages');
        }

        if (req.files['authorProfile']) {
            authorProfileUrl = await uploadImageToS3(req.files['authorProfile'][0].buffer, req.files['authorProfile'][0].originalname, 'authorProfiles');
        }

        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        blog.title = title || blog.title;
        blog.image = imageUrl || blog.image;
        blog.author.profile = authorProfileUrl || blog.author.profile;
        blog.author.name = authorName || blog.author.name;
        blog.paragraph = paragraph || blog.paragraph;
        blog.content = content || blog.content;
        blog.boxText = boxText || blog.boxText;
        blog.lastContent = lastContent || blog.lastContent;
        blog.tags = tags || blog.tags;

        const updatedBlog = await blog.save();
        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a blog by ID
exports.deleteBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        await blog.remove();
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

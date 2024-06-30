const Contact = require("../models/contactUs");
exports.sendEmail = async (req,res) => {
    const { name, email, message,phone } =req.body
    try{

        const newContact = new Contact({
            name,
            email,
            message,
            phone
        });
        await newContact.save();
        res.status(200).json({ message: "Email sent successfully" });
    }
    catch(error){
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


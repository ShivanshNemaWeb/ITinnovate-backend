const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    image:{
        type:String
    },
    author:{
        profile:{
            type:String
        },
        name:{
            type:String,
            require:true
        }
    },
    date:{
        type:Date,
        default: Date.now()
    },
    views:{
        type:Number,
    },
    tag:{
        type:String
    },
    paragraph:{
        type:String
    },
    content:{
        type:String
    },
    boxText:{
        type:String
    },
    lastContent:{
        type:String
    },
tags:{
    type:[String]
}
});

const blog = new mongoose.model('blog',blogSchema);

module.exports = blog

const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here

router.get('/blog',async (req,res)=>{
    try{
        const {page= 1, search= ""} = req.query;
        var blogs ;
        if(search == ""){
            blogs = await Blog.find().skip((page-1) * 5).limit(5);
        }else {
            blogs = await Blog.find({topic : search}).skip((page-1) * 5).limit(5);
        }
        
        res.json({
            status: "Success",
            blogs
        })
    }catch(e){
        res.json({
            status:'Failed',
            message:e.message,
        })
    }
})


router.post('/blog', async (req,res)=>{
    try{
        const blogs = await Blog.create(req.body);
        res.json({
            status:'Successfully created',
            blogs
        })
    }catch(e){
        res.json({
            status:'Failed to create',
            message:e.message,
        })
    }
})


router.put('/blog/:id', async (req,res)=>{
    try{
        await Blog.updateOne({_id:req.params.id},req.body);
        const blogs =  await Blog.findOne({_id: req.params.id});
        res.json({
            status:"success",
            blogs
        })
    }catch(e){
        res.json({
            status:"Failed",
            message:e.message
        })
    }
})


router.delete('/blog/:id', async (req,res)=>{
    try{
        const blogs= await Blog.deleteOne({_id:req.params.id});
        res.json({
            status:"successfully deleted",
            blogs
        })
    }catch(e){
        res.json({
            status:"Failed to delete",
            message:e.message
        })
    }
})
module.exports = router;
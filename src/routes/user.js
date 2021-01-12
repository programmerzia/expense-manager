const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.get('/user', async (req,res)=>{
    try{
        const users = await User.find({})
        res.status(200).send(users)
    }catch(e){
        res.status(404).send()
    }
    res.send('User page...')
})

router.post('/user/register', async (req, res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(e){
        res.send(e)
    }
})
router.post('/user/login', async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.username, req.body.password)
        if(!user){
            res.status(404).send()
        }
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router
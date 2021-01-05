const express = require('express')

const router = new express.Router()

router.get('/user', (req,res)=>{
    res.send('User page...')
})
module.exports = router
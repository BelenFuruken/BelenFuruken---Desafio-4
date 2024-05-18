import express from 'express'
import {promises as fs} from 'fs'
import prod from '../app.js'
const router = express.Router()

router.get('/', async (req,res)=>{
    console.log(prod)
    res.render('home', {prod})
})

router.get('/realtimeproducts', async (req,res)=>{
    res.render('realTimeProducts')
})

export default router
const express = require('express')
const router = express.Router()
const {
    getMenusByDiningHall
} = require('../controllers/menuController')




router.get('/', getMenusByDiningHall)

module.exports = router

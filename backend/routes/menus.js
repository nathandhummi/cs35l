const express = require('express')
const {
    getMenusByDiningHall,
    getMenus
} = require('../controllers/menuController')

const router = express.Router()



router.get('/', getMenus)

module.exports = router

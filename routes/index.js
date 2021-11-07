const express = require('express');

const router = express.Router();

const homeController = require('../controller/home_controller');
router.get('/',homeController.home);

router.post('/create-work',homeController.createWork);
router.post('/delete-todo',homeController.delete);


module.exports = router;
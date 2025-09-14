const express = require("express")
const router = express.Router()
const {getGoals,postGoals,updateGoals,deleteGoals} = require("../controllers/goalControllers") 
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getGoals)

router.post('/', protect, postGoals)

router.put('/:id',protect, updateGoals)

router.delete('/:id',protect, deleteGoals)

module.exports = router
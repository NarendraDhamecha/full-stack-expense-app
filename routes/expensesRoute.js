const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController')

router.get('/', expensesController.getExpenses);

router.post('/', expensesController.postExpenses);

router.delete('/:id', expensesController.deleteExpenses);

module.exports = router;
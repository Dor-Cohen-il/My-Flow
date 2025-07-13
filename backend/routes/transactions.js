const { addExpense, getExpense, deleteExpense, updateExpense } = require('../controllers/expense')
const { addIncome, getIncomes, deleteIncome, updateIncome } = require('../controllers/income')
const { getCashFlowData} = require('../controllers/cashflow')


const router = require('express').Router()

//router.get('/', (req, res) => {
    //res.status(200).json({ message: 'Welcome to the API v1!' });
//});

router.post('/add-income', addIncome)
    .get('/get-income', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .put('/update-income/:id', updateIncome)
    .post('/add-expense', addExpense)
    .get('/get-expense', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .put('/update-expense/:id', updateExpense)
    .get('/get-cashflow', getCashFlowData);

module.exports = router;
const expenseSchema = require("../models/expenseModel")


exports.addExpense = async (req, res) => {
    const {title, amount, type, category, description, date} = req.body

    const expense = expenseSchema({
        title,
        amount,
        type,
        category,
        description,
        date
    })

    try {
        //Validations
        if(!title || !category || !description){
            return res.status(400).json({message: 'All fields are required'})
        }
        if(amount <= 0 || !amount=== 'number'){
            return res.status(400).json({message: 'Amount must be a positive number'})
        }
        await expense.save()
        res.status(200).json({message: 'expense added'})
    } catch (error) {
        res.status(500).json({message: 'Server error'})

    }
    console.log(expense);
}

exports.getExpense = async (req, res) =>{
    try {
        const expenses = await expenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    console.log(id);
    expenseSchema.findByIdAndDelete(id)
    .then((expense) =>{
        res.status(200).json({message: 'expense deleted'})
    })
    .catch((err) =>{
        res.status(500).json({message: 'Server error'});
    })

}
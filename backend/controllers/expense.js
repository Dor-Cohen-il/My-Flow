const expenseSchema = require("../models/expenseModel")


exports.addExpense = async (req, res) => {
    const {title, amount, type, category, description, start_date, end_date, frequency} = req.body

    const expense = expenseSchema({
        title,
        amount,
        type,
        start_date,
        end_date,
        frequency,
        category,
        description
    })

    try {
        //Validations
        if(!title || !category || !amount || !start_date){
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

exports.updateExpense = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameters
    const { title, amount, type, category, description, start_date, end_date, frequency } = req.body; // Get the update data from the request body
    if (!id) {
        return res.status(400).json({ message: 'Asset ID is required for update.' });
    }

    try {
        const updatedExpense = await expenseSchema.findByIdAndUpdate(
            id,
            { // This is the update object. Only include fields you want to change.
                title,
                amount,
                type,
                category,
                description,
                start_date,
                end_date,
                frequency
            },
            {
                new: true, // Return the updated document
                runValidators: true // Run schema validators on the update operation
            }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Asset not found.' });
        }

        // Successfully updated the asset
        res.status(200).json({
            asset: updatedExpense // Send back the updated asset
        });

    } catch (error) {
        // Handle various errors, e.g., validation errors, database errors
        console.error('Error updating asset:', error); // Log the full error for debugging

        // Check for Mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }

        // Generic server error
        res.status(500).json({ message: 'Server error during update.' });
    }
};

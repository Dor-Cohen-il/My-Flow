const IncomeSchema = require("../models/incomeModel")


exports.addIncome = async (req, res) => {
    const {amount, type, start_date ,end_date ,frequency , category, description, date} = req.body

    const income = IncomeSchema({
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
        if (!category || !amount || !start_date) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        if (amount <= 0 || !amount=== 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number' })
        }
        await income.save()
        res.status(200).json({ message: 'Income added' })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })

    }
    console.log(income);
}

exports.getIncomes = async (req, res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    console.log(id);
    IncomeSchema.findByIdAndDelete(id)
    .then((income) =>{
        res.status(200).json({message: 'Income deleted'})
    })
    .catch((err) =>{
        res.status(500).json({message: 'Server error'});
    })

}

exports.updateIncome = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameters
    const { amount, type, category, description, start_date, end_date, frequency } = req.body; // Get the update data from the request body
    if (!id) {
        return res.status(400).json({ message: 'Asset ID is required for update.' });
    }

    try {
        const updatedIncome = await IncomeSchema.findByIdAndUpdate(
            id,
            { 
                amount,
                type,
                category,
                description,
                start_date,
                end_date,
                frequency
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedIncome) {
            return res.status(404).json({ message: 'Asset not found.' });
        }

        // Successfully updated the asset
        res.status(200).json({
            asset: updatedIncome // Send back the updated asset
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

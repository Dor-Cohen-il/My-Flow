const assetsSchema = require("../models/assetsModel")


exports.addAssets = async (req, res) => {
    const {title, amount, type, category, description, date} = req.body

    const asset = assetsSchema({
        title,
        amount,
        type,
        category,
        description,
        date
    })

    try {
        //Validations
        if(!title || !category || !amount || !date || !description){
            return res.status(400).json({message: 'All fields are required'})
        }
        if(amount <= 0 || !amount=== 'number'){
            return res.status(400).json({message: 'Amount must be a positive number'})
        }
        await asset.save()
        res.status(200).json({message: 'Asset added'})
    } catch (error) {
        res.status(500).json({message: 'Server error'})

    }
    console.log(income);
}

exports.getAssets = async (req, res) =>{
    try {
        const assets = await assetsSchema.find().sort({createdAt: -1})
        res.status(200).json(assets)
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

exports.deleteAsset = async (req, res) =>{
    const {id} = req.params;
    console.log(id);
    assetsSchema.findByIdAndDelete(id)
    .then((asset) =>{
        res.status(200).json({message: 'Asset deleted'})
    })
    .catch((err) =>{
        res.status(500).json({message: 'Server error'});
    })

}

exports.updateAsset = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameters
    const { title, amount, type, category, description, date } = req.body; // Get the update data from the request body

    // Optional: Log the ID and update data for debugging
    console.log('Updating asset with ID:', id);
    console.log('Update data:', req.body);

    if (!id) {
        return res.status(400).json({ message: 'Asset ID is required for update.' });
    }

    try {
        const updatedAsset = await assetsSchema.findByIdAndUpdate(
            id,
            { // This is the update object. Only include fields you want to change.
                title,
                amount,
                type,
                category,
                description,
                date
            },
            {
                new: true, // Return the updated document
                runValidators: true // Run schema validators on the update operation
            }
        );

        if (!updatedAsset) {
            return res.status(404).json({ message: 'Asset not found.' });
        }

        // Successfully updated the asset
        res.status(200).json({
            message: 'Asset updated successfully.',
            asset: updatedAsset // Send back the updated asset
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

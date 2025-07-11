// controllers/cashflowController.js
const IncomeSchema = require("../models/incomeModel");
const ExpenseSchema = require("../models/expenseModel"); // וודא שיש לך סכימה כזו עבור הוצאות

exports.getCashFlowData = async (req, res) => {
    try {
        const { startDate, endDate } = req.query; // קבל את התאריכים מ-query parameters

        // ולידציה בסיסית של התאריכים
        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Start date and end date are required for cash flow." });
        }

        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format." });
        }

const incomes = await IncomeSchema.find({
    $or: [
        // תנאי א': הכנסות שתקופתן חופפת את טווח המסנן.
        // הכנסות שמתחילות לפני או בתאריך הסיום של המסנן, ומסתיימות אחרי או בתאריך ההתחלה של המסנן.
        {
            start_date: { $lte: parsedEndDate },
            end_date: { $gte: parsedStartDate }
        },
        // תנאי ב': הכנסות חד פעמיות שמתחילות בטווח המסנן והלאה.
        {
            $and: [
                { frequency: 'one-time' },
                { start_date: { $gte: parsedStartDate } }
            ]
        }
    ]
}).sort({ createdAt: -1 });

// אותה לוגיקה עבור הוצאות:
const expenses = await ExpenseSchema.find({
    $or: [
        {
            start_date: { $lte: parsedEndDate },
            end_date: { $gte: parsedStartDate }
        },
        {
            $and: [
                { frequency: { $ne: 'one-time' } }, // כפי שהגדרת קודם, הוצאות לא חד פעמיות
                {
                    $or: [ // ותאריך הסיום שלהן עונה על אחד התנאים האלה
                        { end_date: { $lte: parsedEndDate } },
                        { end_date: { $gte: parsedStartDate } }
                    ]
                }
            ]
        }
    ]
}).sort({ createdAt: -1 });
        // החזרת התוצאות
        res.status(200).json({ incomes, expenses });

    } catch (error) {
        console.error("Server error in getCashFlowData:", error);
        res.status(500).json({ message: 'Server error fetching cash flow data' });
    }
};
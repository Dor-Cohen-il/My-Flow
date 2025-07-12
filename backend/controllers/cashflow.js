const { DateTime, Duration, Interval} = require('luxon');
// controllers/cashflowController.js
const IncomeSchema = require("../models/incomeModel");
const ExpenseSchema = require("../models/expenseModel"); // וודא שיש לך סכימה כזו עבור הוצאות

const BASE_URL = 'http://localhost:8000/api/v1';
const axios = require('axios');

const setCashFlowData = (data) => {
    console.log("Cash Flow Data Updated:", data);
};
const setError = (message) => {
    console.error("Error Set:", message);
};

function getIntervalsByPeriod(startDateString, endDateString, splitIntervalType) {
    const startDateCalc = DateTime.fromISO(startDateString);
    const endDateCalc = DateTime.fromISO(endDateString);

    if (!startDateCalc.isValid || !endDateCalc.isValid) {
        return [];
    }

    const fullInterval = Interval.fromDateTimes(startDateCalc, endDateCalc);

    let splitDuration;
    switch (splitIntervalType) {
        case 'one-time':
            splitIntervalType = startDateCalc;
        case 'daily':
            splitDuration = Duration.fromObject({ days: 1 });
            break;
        case 'weekly':
            splitDuration = Duration.fromObject({ weeks: 1 });
            break;
        case 'biweekly':
            splitDuration = Duration.fromObject({ weeks: 2 });
            break;
        case 'monthly':
            splitDuration = Duration.fromObject({ months: 1 });
            break;
        case 'quarterly':
            splitDuration = Duration.fromObject({ months: 3 });
            break;
        case 'yearly':
            splitDuration = Duration.fromObject({ years: 1 });
            break;
        default:
            return splitDuration;
    }

    const smallerIntervals = fullInterval.splitBy(splitDuration);
    const resultDatesList = smallerIntervals.map(interval => interval.start.toISODate());

    return resultDatesList;
}

function fromListToArray(oldlist){
    const newArray = []
    oldlist.forEach(date => {
        const pushDate = {intervalDate: date, amount: 0}
        newArray.push(pushDate)  
    });
    return newArray;
}

function isDateWithinRange(dateToCheckString, startDateString, endDateString) {
    const dateToCheck = DateTime.fromISO(dateToCheckString).startOf('day'); // נקודת התחלה של יום
    const startDate = DateTime.fromISO(startDateString).startOf('day');
    const endDate = DateTime.fromISO(endDateString).endOf('day');

    const range = Interval.fromDateTimes(startDate, endDate);

    return range.contains(dateToCheck);
}


const getCashFlow = async (startDate, endDate, interval) => {
    try {
        const startIso = startDate ? new Date(startDate).toISOString() : '';
        const endIso = endDate ? new Date(endDate).toISOString() : '';
        const emptyCashflowArray = getIntervalsByPeriod(startIso, endIso, interval) // make a list of the dates
        const cashflowArray = fromListToArray(emptyCashflowArray); //makes an array from the list
        console.log(`Making request to: ${BASE_URL}/get-cashflow?startDate=${startIso}&endDate=${endIso}`);

        const response = await axios.get(`${BASE_URL}/get-cashflow?startDate=${startIso}&endDate=${endIso}`);
        //Create lists
        //list values: amount, type, start_date,end_date, frequency
        const incomesList = response.data.incomes;
        const expensesList = response.data.expenses;
        //Clean the lists
        incomesList.forEach(item => {
            delete item._id;
            delete item.title;
            delete item.category;
            delete item.description;
            delete item.createdAt;
            delete item.updatedAt;
            delete item.__v;
            item.start_date = DateTime.fromISO(item.start_date).toFormat('yyyy-MM-dd');
            item.end_date = DateTime.fromISO(item.end_date).toFormat('yyyy-MM-dd');
            if (item.frequency != 'one-time') {
            item.occurs = getIntervalsByPeriod(item.start_date, item.end_date, item.frequency);
            } else {
                const dt = DateTime.fromISO(item.start_date);
                item.occurs = [dt.toFormat('yyyy-MM-dd')];
            }
        });
        expensesList.forEach(item => {
            delete item._id;
            delete item.title;
            delete item.category;
            delete item.description;
            delete item.createdAt;
            delete item.updatedAt;
            delete item.__v;
            item.start_date = DateTime.fromISO(item.start_date);
            item.end_date = DateTime.fromISO(item.end_date);
            if (item.frequency != 'one-time') {
            item.occurs = getIntervalsByPeriod(item.start_date, item.end_date, item.frequency);
            } else {
                const dt = DateTime.fromISO(item.start_date);
                item.occurs = [dt.toFormat('yyyy-MM-dd')];
            }
        });

        cashflowArray.forEach(item => {
            let amount = 0;
          const endIntervalDate = item.intervalDate;
            incomesList.forEach(incomeitem => {
                incomeitem.occurs.forEach(occursitem => {
                 if (isDateWithinRange(occursitem, incomeitem.start_date, endIntervalDate) == true) {
                    amount = amount + incomeitem.amount
                 } else {

                 }
                
                }) 
            });
                expensesList.forEach(expenseitem => {
                expenseitem.occurs.forEach(occursitem => {
                 if (isDateWithinRange(occursitem, expenseitem.start_date, endIntervalDate) == true) {
                    amount = amount - expenseitem.amount
                 } else {

                 }
                
                }) 
            });
            item.amount = amount;
        });
        console.log(cashflowArray)
        setError(null);
        return "Works";
    } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
        console.error("Error fetching cash flow:", errorMessage);
        setCashFlowData([]);
        return null;
    }
};

async function runTest() {
    console.log("Starting getCashFlow test...");
    try {
        const result = await getCashFlow(new Date("2025-07-12"), new Date("2026-07-18"), 'weekly');
        console.log("Test finished. Result:", result);
    } catch (e) {
        console.error("Test failed with exception:", e);
    }
}

// API
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


        // החזרת התוצאות
        res.status(200).json({ incomes, expenses });
        getCashFlow();

    } catch (error) {
        console.error("Server error in getCashFlowData:", error);
        res.status(500).json({ message: 'Server error fetching cash flow data' });
    }
};
const BASE_URL = 'http://localhost:8000/api/v1';
const axios = require('axios');

const setCashFlowData = (data) => {
    console.log("Cash Flow Data Updated:", data);
};
const setError = (message) => {
    console.error("Error Set:", message);
};

function seperatePeriod(endDate1, startDate1, interval) {
const periodLength = endDate1 - startDate1;
let intervalInMillieseconds = 0;
    switch (interval) {
        case 'daily':
            intervalInMillieseconds = 86400000;
            break;
        case 'weekly':
            intervalInMillieseconds = 604800000;
            break;
        case 'biweekly':
            intervalInMillieseconds = 1209600000;
            break;
        case 'monthly':
            intervalInMillieseconds = 2592000000;
            break;
        case 'quarterly':
            intervalInMillieseconds = 7776000000;
            break;
        case 'yearly':
            intervalInMillieseconds = 31536000000;
            break;
        default:
            break;
    }
    return Math.floor(periodLength / intervalInMillieseconds);
}

const getCashFlow = async (startDate, endDate, interval = 'yearly') => {
    try {
        const startIso = startDate ? new Date(startDate).toISOString() : '';
        const endIso = endDate ? new Date(endDate).toISOString() : '';

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
        });
        expensesList.forEach(item => {
            delete item._id;
            delete item.title;
            delete item.category;
            delete item.description;
            delete item.createdAt;
            delete item.updatedAt;
            delete item.__v;
        });
        
        console.log(seperatePeriod(endDate, startDate, interval))
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
        const result = await getCashFlow(new Date("2025-07-11"), new Date("2025-07-18"), 'daily');
        console.log("Test finished. Result:", result);
    } catch (e) {
        console.error("Test failed with exception:", e);
    }
}

runTest();
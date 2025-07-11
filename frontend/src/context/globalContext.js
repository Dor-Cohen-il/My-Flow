import React from 'react';
import axios from 'axios';


const BASE_URL = 'http://localhost:8000/api/v1';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  
    const [incomes, setIncomes] = React.useState([]);
    const [expenses, setExpenses] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [cashFlowData, setCashFlowData] = React.useState([]); // <-- הוסף את הסטייט הזה

    //Income's functions
    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}/add-income/`, income);
            // You can handle the response here if needed
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
        getIncome();
    }
    const getIncome = async (income) => {
        try {
            const response = await axios.get(`${BASE_URL}/get-income`);
            setIncomes(response.data)
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    }

    const deleteIncome = async (id) => {
        const res = await axios.delete(`${BASE_URL}/delete-income/${id}`);
        getIncome();
    }

        const updateIncome = async (id) => {
        const res = await axios.put(`${BASE_URL}/update-income/${id}`);
        getIncome();
    }

    const totalIncome = () => {
        let totalIncome = 0
        incomes.forEach((income) => {
            console.log(income)
            totalIncome += income.amount;
        })
        return totalIncome;
    }

        const addExpense = async (expense) => {
        try {
            const response = await axios.post(`${BASE_URL}/add-expense/`, expense);
            // You can handle the response here if needed
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
        getExpense();
    }
    const getExpense = async (expense) => {
        try {
            const response = await axios.get(`${BASE_URL}/get-expense`);
            setExpenses(response.data)
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    }

    const deleteExpense = async (id) => {
        const res = await axios.delete(`${BASE_URL}/delete-expense/${id}`);
        getExpense();
    }

    const totalExpense = () => {
        let totalExpense = 0
        expenses.forEach((expense) => {
            console.log(expense)
            totalExpense += expense.amount;
        })
        return totalExpense;
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
            history.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })
            return history.slice(0, 6)
    }
// בתוך GlobalProvider
const getCashFlow = async (startDate, endDate) => {
    try {
        const startIso = startDate ? new Date(startDate).toISOString() : '';
        const endIso = endDate ? new Date(endDate).toISOString() : '';

        // שליחת בקשה לשרת
        const response = await axios.get(`${BASE_URL}/get-cashflow?startDate=${startIso}&endDate=${endIso}`);

        // השרת מחזיר { incomes: [], expenses: [] }
        const { incomes, expenses } = response.data;

        // איחוד הרשימות לרשימה אחת
        // וודא שאתה לוקח רק את השדות שאתה צריך: id, type, amount, start_date, end_date, frequency
        const combinedData = [];

        incomes.forEach(item => {
            combinedData.push({
                _id: item._id, // השתמש ב-_id עבור זיהוי ייחודי
                type: item.type,
                amount: item.amount,
                start_date: item.start_date,
                end_date: item.end_date,
                frequency: item.frequency,
                // ייתכן שתרצה גם את ה-title וה-category לצורך תצוגה
                title: item.title,
                category: item.category
            });
        });

        expenses.forEach(item => {
            combinedData.push({
                _id: item._id,
                type: item.type,
                amount: item.amount,
                start_date: item.start_date,
                end_date: item.end_date,
                frequency: item.frequency,
                // ייתכן שתרצה גם את ה-title וה-category לצורך תצוגה
                title: item.title,
                category: item.category
            });
        });

        // שמור את הרשימה המאוחדת במצב החדש
        setCashFlowData(combinedData);
        setError(null); // נקה שגיאות קודמות
        console.log("Combined Cash Flow Data:", combinedData); // לוג לבדיקה
        return combinedData; // החזר את הנתונים המאוחדים
    } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
        console.error("Error fetching cash flow:", errorMessage);
        setCashFlowData([]); // נקה את הנתונים במקרה של שגיאה
        return null;
    }
};
    return (
    <GlobalContext.Provider value={{
        addIncome,
        getIncome,
        incomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpense,
        expenses,
        deleteExpense,
        totalExpense,
        transactionHistory,
        error,
        getCashFlow,
        cashFlowData
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
};
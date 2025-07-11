import React from 'react';
import axios from 'axios';


const BASE_URL = 'http://localhost:8000/api/v1';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  
    const [incomes, setIncomes] = React.useState([]);
    const [expenses, setExpenses] = React.useState([]);
    const [error, setError] = React.useState(null);
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

    const totalIncome = () => {
        let totalIncome = 0
        incomes.forEach((income) => {
            console.log(income)
            totalIncome += income.amount;
        })
        return totalIncome;
    }
    //Expenses' function
    //router.post('/add-income', addIncome)
     //   .get('/get-income', getIncomes)
       // .delete('/delete-income/:id', deleteIncome)
//.post('/add-expense', addExpense)
     //   .get('/get-expense', getExpense)
      //  .delete('/delete-expense/:id', deleteExpense)
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
        transactionHistory
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
};
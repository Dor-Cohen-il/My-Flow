import React from 'react';
import axios from 'axios';


const BASE_URL = 'http://localhost:8000/api/v1';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  
    const [incomes, setIncomes] = React.useState([]);
    const [expenses, setExpenses] = React.useState([]);
    const [error, setError] = React.useState(null);

    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}/add-income/`, income);
            // You can handle the response here if needed
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    }
    const getIncome = async (income) => {
        try {
            const response = await axios.get(`${BASE_URL}/get-income/`);
            setIncomes(response.date)
            console.log("Get Incomes works")
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    }
    getIncome();

    return (
    <GlobalContext.Provider value={{
        addIncome,
        getIncome,
        incomes
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
};
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
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
    <GlobalContext.Provider value={{
        addIncome,
        hello: 'world'
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
};
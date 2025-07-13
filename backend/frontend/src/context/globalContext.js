import React, { useEffect } from 'react'; // Import useEffect
import axios from 'axios';
const { DateTime, Duration, Interval} = require('luxon');

const BASE_URL = 'https://my-flow-692738584656.me-west1.run.app/api/v1';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  
    const [incomes, setIncomes] = React.useState([]);
    const [expenses, setExpenses] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [cashFlowData, setCashFlowData] = React.useState([]);

    // --- Add a loading state for better UX ---
    const [loadingCashFlow, setLoadingCashFlow] = React.useState(false);


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

    //Cash flow 
    
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
                // For 'one-time', it's a specific date, not a duration for splitting
                // The current logic expects a duration for splitBy, so this case needs careful handling
                // If it's truly one-time, you might not split by duration here.
                // Assuming 'one-time' means a single point on the chart,
                // the `fullInterval` itself should represent that.
                // For now, let's make sure it doesn't fall through to default.
                // If 'one-time' implies a single point, this function might not be the right place to handle it.
                // For the purpose of intervals, we'll ensure it doesn't break the switch.
                // Perhaps 'one-time' cash flows are directly added to the array without interval generation.
                // For the chart, if it's a specific day, let's treat it as daily for interval generation.
                splitDuration = Duration.fromObject({ days: 1 }); // Default to daily for 'one-time' to get a point
                break;
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
                // Handle unsupported interval types gracefully or throw an error
                console.warn(`Unsupported splitIntervalType: ${splitIntervalType}. Defaulting to daily.`);
                splitDuration = Duration.fromObject({ days: 1 }); // Default to daily
                break;
        }
    
        const smallerIntervals = fullInterval.splitBy(splitDuration);
        const resultDatesList = smallerIntervals.map(interval => interval.start.toISODate());
    
        return resultDatesList;
    }
    
    function fromListToArray(oldlist){
        const newArray = []
        oldlist.forEach(date => {
            const pushDate = {date: date, amount: 0} // Changed 'intervalDate' to 'date' to match your chart component expectation
            newArray.push(pushDate)  
        });
        return newArray;
    }
    
    function isDateWithinRange(dateToCheckString, startDateString, endDateString) {
        const dateToCheck = DateTime.fromISO(dateToCheckString).startOf('day');
        const startDate = DateTime.fromISO(startDateString).startOf('day');
        const endDate = DateTime.fromISO(endDateString).endOf('day');
    
        const range = Interval.fromDateTimes(startDate, endDate);
    
        return range.contains(dateToCheck);
    }
    
    
    const getCashFlow = async (startDate, endDate, interval) => {
        setLoadingCashFlow(true); // Set loading state
        try {
            // Set default dates if not provided
            const defaultStartDate = DateTime.now().minus({ months: 6 }).startOf('day').toISODate(); // 6 months ago
            const defaultEndDate = DateTime.now().plus({ months: 6 }).endOf('day').toISODate();    // 6 months from now
            const defaultInterval = 'monthly'; // Or 'weekly', 'daily' etc.
            
            const effectiveStartDate = startDate ? new Date(startDate).toISOString() : new Date(defaultStartDate).toISOString();
            const effectiveEndDate = endDate ? new Date(endDate).toISOString() : new Date(defaultEndDate).toISOString();
            const effectiveInterval = interval || defaultInterval;

            const emptyCashflowArray = getIntervalsByPeriod(effectiveStartDate, effectiveEndDate, effectiveInterval);
            const cashflowArray = fromListToArray(emptyCashflowArray);
            
            console.log(`Making request to: ${BASE_URL}/get-cashflow?startDate=${effectiveStartDate}&endDate=${effectiveEndDate}`);
    
            const response = await axios.get(`${BASE_URL}/get-cashflow?startDate=${effectiveStartDate}&endDate=${effectiveEndDate}`);
            
            const incomesList = response.data.incomes;
            const expensesList = response.data.expenses;

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
                // Ensure Luxon DateTime objects are used consistently here if needed for date operations
                item.start_date = DateTime.fromISO(item.start_date).toFormat('yyyy-MM-dd'); // Convert to string for consistency
                item.end_date = DateTime.fromISO(item.end_date).toFormat('yyyy-MM-dd');   // Convert to string for consistency

                if (item.frequency != 'one-time') {
                    item.occurs = getIntervalsByPeriod(item.start_date, item.end_date, item.frequency);
                } else {
                    const dt = DateTime.fromISO(item.start_date);
                    item.occurs = [dt.toFormat('yyyy-MM-dd')];
                }
            });
    
            cashflowArray.forEach(item => {
                let amount = 0;
                // Use 'date' property as consistent with fromListToArray
                const intervalDate = item.date; 

                incomesList.forEach(incomeitem => {
                    incomeitem.occurs.forEach(occursitem => {
                        // Check if the 'occursitem' date falls on or before the 'intervalDate'
                        // and also after or on the income's start_date.
                        // This logic needs to reflect cumulative cash flow up to 'intervalDate'.
                        if (DateTime.fromISO(occursitem) <= DateTime.fromISO(intervalDate) && DateTime.fromISO(occursitem) >= DateTime.fromISO(incomeitem.start_date)) {
                            amount += incomeitem.amount;
                        }
                    }); 
                });
                expensesList.forEach(expenseitem => {
                    expenseitem.occurs.forEach(occursitem => {
                        // Same logic for expenses
                        if (DateTime.fromISO(occursitem) <= DateTime.fromISO(intervalDate) && DateTime.fromISO(occursitem) >= DateTime.fromISO(expenseitem.start_date)) {
                            amount -= expenseitem.amount;
                        }
                    }); 
                });
                item.amount = amount;
            });
            console.log("Final Cash Flow Array:", cashflowArray);
            setError(null);
            setCashFlowData(cashflowArray);
            return "Works";
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            setError(errorMessage);
            console.error("Error fetching cash flow:", errorMessage);
            setCashFlowData([]);
            return null;
        } finally {
            setLoadingCashFlow(false); // End loading state
        }
    };

    // --- NEW: useEffect Hook to call getCashFlow on component mount ---
    React.useEffect(() => {
        // You might want to define default start/end dates and interval here
        // or let getCashFlow use its internal defaults.
        // For example, to fetch data for the last 6 months and next 6 months, by month:
        const startDate = DateTime.now().startOf('day').toJSDate();
        const endDate = DateTime.now().plus({ months: 12 }).endOf('day').toJSDate();
        const intervalType = 'weekly';

        getCashFlow(startDate, endDate, intervalType);
    }, []); // Empty dependency array ensures this runs only once on mount


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
            cashFlowData,
            loadingCashFlow // Expose loading state
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
};
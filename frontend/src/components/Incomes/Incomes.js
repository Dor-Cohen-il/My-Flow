import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/layout";
import Form from "../Form/Form";
import { useGlobalContext } from "../../context/globalContext";
import IncomeItem from "../IncomeItem/IncomeItem";


function Incomes() {
  // Destructure state and functions from your global context
  // Assuming getIncome fetches only income data or you filter it later.
  // We will need to update `incomes` state when an item is successfully updated.
  const { incomes, getIncome, deleteIncome, /* Add any other context methods you need here */ } = useGlobalContext();

  useEffect(() => {
    // Fetch incomes when the component mounts
    getIncome();
  }, [getIncome]); // Add getIncome to dependency array to ensure it runs if getIncome itself changes (unlikely for a stable context function)

  // This function will be passed down to each IncomeItem.
  // When an IncomeItem successfully updates itself on the backend,
  // it will call this function with the newly updated asset data.
  const handleIncomeUpdate = (updatedAsset) => {
    // Find the updated asset in the current 'incomes' array
    // and replace it with the new updatedAsset data.
    const updatedIncomes = incomes.map(income =>
      income._id === updatedAsset._id ? updatedAsset : income
    );
     getIncome(); // Best practice if no direct setter for `incomes` state in context
  };


  return (
    <IncomesStyled>
        <InnerLayout>
            <h1>Incomes</h1>
            <div className="income-content">
                <div className="form-container">
                    <Form />
                </div>
                <div className="incomes">
                    {incomes && Array.isArray(incomes) && incomes.map((income) => {
                        const {_id, title, amount, start_date, end_date, frequency, category, description, type} = income;
                        return (
                            <IncomeItem
                                key={_id}
                                income={income} // Pass the entire income object
                                onDelete={deleteIncome} // Renamed from deleteItem to onDelete for clarity in IncomeItem
                                indicatorColor="var(--color-green)" // Passed as a prop
                                // Pass the handleIncomeUpdate function as onUpdateSuccess
                                onUpdateSuccess={handleIncomeUpdate}
                            />
                        );
                    })}
                </div>
            </div>
        </InnerLayout>
    </IncomesStyled>
  );
}

const IncomesStyled = styled.div`
  display: flex;
  overflow: auto;
  .income-content {
    display: flex;
    gap: 2rem;
    flex-direction: column; /* Changed to column for better layout on smaller screens or if incomes take full width */

    @media (min-width: 768px) { /* Adjust for larger screens */
        flex-direction: row; /* Keep row layout on larger screens */
    }

    .form-container {
        /* You might want to give the form a specific width or flex basis */
        flex-basis: 30%; /* Example: Form takes 30% width */
        min-width: 300px; /* Ensure form doesn't get too small */
    }

    .incomes {
        flex: 1; /* Incomes list takes remaining space */
    }
  }
`;

export default Incomes;
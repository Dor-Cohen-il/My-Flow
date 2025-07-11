import React, { useEffect, useState } from "react"; // Import useState
import styled from "styled-components";
import { InnerLayout } from "../../styles/layout";
import { useGlobalContext } from "../../context/globalContext";
import DatePicker from "react-datepicker"; // Import DatePicker for UI controls
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS

function Cashflow() {
  const { getCashFlow, cashFlowReport, error } = useGlobalContext();

  // Use state for user-selectable dates and interval
  const [selectedStartDate, setSelectedStartDate] = useState(new Date("2025-07-01")); // Default to beginning of a month for example
  const [selectedEndDate, setSelectedEndDate] = useState(new Date("2025-07-31"));   // Default to end of a month
  const [selectedInterval, setSelectedInterval] = useState('monthly'); // Default interval

  // This useEffect will run when selectedStartDate, selectedEndDate, or selectedInterval changes
  useEffect(() => {
    // Only call getCashFlow if all selected values are valid
    if (selectedStartDate instanceof Date && !isNaN(selectedStartDate) &&
        selectedEndDate instanceof Date && !isNaN(selectedEndDate) &&
        selectedInterval) {
    }
  }, [getCashFlow, selectedStartDate, selectedEndDate, selectedInterval]); // Dependencies are now state variables

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>CashFlow</h1>
      
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  .expense-content {
    display: flex;
    gap: 2rem;
    .expenses {
      flex: 1;
    }
  }
`;

export default Cashflow;
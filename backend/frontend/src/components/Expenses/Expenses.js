import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/layout";
import ExpenseForm from "../Form/ExpenseForm";
import { useGlobalContext } from "../../context/globalContext";
import ExpenseItem from "../IncomeItem/ExpenseItem";


function Expenses() {
  const {expenses, getExpense, deleteExpense} = useGlobalContext();
  useEffect(() => {
    getExpense();
  }, []);

  const handleExpenseUpdate = (updatedAsset) => {
    const updatedExpenses = expenses.map(expense =>
      expense._id === updatedAsset._id ? updatedAsset : expense
    );
    getExpense();
  }
  return (
    <ExpenseStyled>
        <InnerLayout>
      <h1>Expenses</h1>
      <div className="expense-content">
        <div className="form-container">
          <ExpenseForm />
        </div>
        <div className="expense">
          {expenses && Array.isArray(expenses) && expenses.map((expense) => {
              const {_id, amount, date, category, description, type} = expense;
              return <ExpenseItem
                        key={_id}
                        expense={expense} // Pass the entire income object
                        onDelete={deleteExpense} // Renamed from deleteItem to onDelete for clarity in IncomeItem
                        indicatorColor="var(--color-green)" // Passed as a prop
                        // Pass the handleIncomeUpdate function as onUpdateSuccess
                        onUpdateSuccess={handleExpenseUpdate}
                      />
            })}
        </div>
      </div>
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
  .expenses{
  flex: 1;}
}
`;

export default Expenses;
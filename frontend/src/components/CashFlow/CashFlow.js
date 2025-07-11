import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/layout";
import ExpenseForm from "../Form/ExpenseForm";
import { useGlobalContext } from "../../context/globalContext";

function Expenses() {
  const {addExpense, expenses, getExpense, deleteExpense} = useGlobalContext();
  useEffect(() => {
    getExpense();
  }, []);
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
              const {_id, title, amount, date, category, description, type} = expense;
              return <ExpenseItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  category={category}
                  indicatorColor="var(--color-red)"
                  date={date}
                  deleteItem={deleteExpense}
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
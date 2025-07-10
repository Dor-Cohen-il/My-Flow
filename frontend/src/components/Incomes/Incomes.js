import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/layout";
import Form from "../Form/Form";
import { useGlobalContext } from "../../context/globalContext";
import IncomeItem from "../IncomeItem/IncomeItem";


function Incomes() {
  const {addIncome, incomes, getIncome, deleteIncome} = useGlobalContext();
  useEffect(() => {
    getIncome();
  }, [incomes]);
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
              const {_id, title, amount, date, category, description, type} = income;
              return <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  category={category}
                  indicatorColor="var(--color-green)"
                  date={date}
                  deleteItem={deleteIncome}
              />
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
  .incomes{
  flex: 1;}
}
`;

export default Incomes;
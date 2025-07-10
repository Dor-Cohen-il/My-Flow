import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/layout";
import Form from "../Form/Form";
import { useGlobalContext } from "../../context/globalContext";
import IncomeItem from "../IncomeItem/IncomeItem";

function Incomes() {
  const {addIncome, incomes, getIncome} = useGlobalContext();
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
                  // ודא שאתה מעביר את ה-date ואת ה-deleteItem, אחרת הקומפוננטה IncomeItem לא תעבוד כראוי
                  date={date}
                  deleteItem={() => console.log('Delete functionality not passed yet')} // החלף בפונקציה האמיתית שלך
              />
            })}
        </div>
      </div>
    </InnerLayout>
    </IncomesStyled>
  );
}
const IncomesStyled = styled.div`

`;

export default Incomes;
import React from "react";

function IncomeItem({ title, amount, date, category, description, deleteItem, indicatorColor, type }) {
  return (
    <IncomeItemStyled>
        <div className="icon">
            </div>
        <div className="content">
            <h5>{title}</h5>
            <p>Amount: ${amount}</p>
            <p>Date: {new Date(date).toLocaleDateString()}</p>
            <p>Category: {category}</p>
            <p>Description: {description}</p>
        </div>
    </IncomeItemStyled>
  );
}
const IncomeItemStyled = styled.div`

`;

export default IncomeItem;

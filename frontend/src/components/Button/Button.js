import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/layout";

function Button({name, icon, onClick, bg, bPad, color,bRadius}) {
  return (
    <ButtonStyled style={{
        background: bg,
        padding: bPad,
        color: color,
        borderRadius: bRadius,

    }} onClick={onClick}>
        {icon}
        {name}
    </ButtonStyled>
  );
}
const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .4s ease-in-out;
    max-width: 306px;
    width: 100%;
    &:hover{
        transform: scale(1.05);
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    }&:active{
        transform: scale(0.95);
        box-shadow: 0px 1px 15px rgba(0, 0, 0.06);
    }
`;

export default Button;

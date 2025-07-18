import React from "react";
import styled from "styled-components";
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../utils/icons';
import Button from "../Button/Button";
import { dateFormat } from "../../utils/dateFormat";
import formatCurrency from "../../utils/formatCurrency";

function AssetItem({ id, title, amount, date, category, description, deleteItem, indicatorColor, type }) {
  const categoryIcon = () =>{
      switch(category) {
          case 'salary':
              return money;
          case 'freelancing':
              return freelance;
          case 'investments':
              return stocks;
          case 'stocks':
              return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return ''
        }
    }

  return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="icon">
                {categoryIcon()}
            </div>
            <div className="content">
                <h5>{title} - {formatCurrency(amount)} </h5>
                <div className="title-place"></div>
                <div className="inner-content">
                    <div className="text">
                        <p>{calender} {dateFormat(date)} </p>
                        <p>{comment}{description} </p>
                        <p style={{ marginleft: '80px' }}>
                            <Button
                                icon={trash}
                                bPad={'0.5rem'}
                                bRad={'5%'}
                                bg={'var(--primary-color'}
                                color={'#fff'}
                                iColor={'#fff'}
                                hColor={'var(--color-green)'}
                                onClick={() => deleteItem(id)}
                            />
                        </p>
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
  );
}
const IncomeItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0rem;
    color: #222260;
    height: 8rem;
    .icon{
        width: 50px;
        height: 50px;
        border-radius: 10px;
        background: #F5F5F5;
        display: flex;
        align-items: left;
        justify-content: left;
        border: 2px solid #FFFFFF;
        margin-right: 1rem;
        i{
            font-size: 2.6rem;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        max-width: 600px;
        h5{
            font-size: 1rem;
            padding-left: 1rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        .title-placer{}
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 0.5rem;
                p{
                    display: flex;
                    align-items: left;
                    gap: 0.2rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }
`;

export default IncomeItem;

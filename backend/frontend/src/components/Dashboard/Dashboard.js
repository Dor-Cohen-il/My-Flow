import React, {useEffect} from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/layout";
import Chart from "../Chart/Chart";
import { useGlobalContext } from "../../context/globalContext";
import formatCurrency from "../../utils/formatCurrency";
import History from "../History/History"

function Dashboard() {
  const { totalIncome, totalExpense, getIncome, getExpense} = useGlobalContext()

  useEffect(() => {
  }, [])
  return (
    <DashboardStyled>
        <InnerLayout>
      <h1>All Transactions</h1>
      <div className="stats-con">
          <div className="chart-con">
              <Chart />
              <div className="amount-con">
                <div className="income">
                  <h2>Total Income</h2>
                  <p>
                    {formatCurrency(totalIncome())}
                  </p>
                </div>
                  <div className="expense">
                  <h2>Total expense</h2>
                  <p>
                    {formatCurrency(totalExpense())}
                  </p>
                </div>
                </div>
              </div>
            <div className="history-con">
              <History />
              </div>
          </div>
    </InnerLayout>
    </DashboardStyled>
  );
}
const DashboardStyled = styled.div`
    flex: 1;
    height: 100%;
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 0.5rem;
        max-width: 100%;
        .chart-con{
            grid-column: 1 / 5;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    h2{
                        margin-top: -10px;
                        font-size: 1.2rem;
                    }
                    p{
                        font-size: 1rem;
                        font-weight: 700;
                        white-space: nowrap; /* מונע שבירת שורות במספרים גדולים */
                    }
                }

            }
        }

        .history-con{
            grid-column: 5 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 0.8rem;
                span{
                    font-size: 0.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;


export default Dashboard;
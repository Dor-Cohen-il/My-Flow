import React, { use } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/icons";
const { DateTime, Duration, Interval} = require('luxon');

function ExpenseForm() {
    const {addExpense, getExpense, error, getCashFlow} = useGlobalContext()
    const [inputState, setInputState] = React.useState({
        amount: '',
        start_date: new Date(),
        end_date: null,
        frequency: 'one-time',
        category: 'other',
        description: ''
    });

    const { amount, start_date, category, description, end_date, frequency } = inputState;

    const handleInput = (name) => (e) => {
        setInputState({
            ...inputState,
            [name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        const startDate = DateTime.now().startOf('day').toJSDate();
        const endDate = DateTime.now().plus({ months: 12 }).endOf('day').toJSDate();
        const intervalType = 'weekly';
        e.preventDefault();
        addExpense(inputState);
        getExpense();
        getCashFlow(startDate, endDate, intervalType);
        setInputState({
            amount: '',
            start_date: new Date(),
            end_date: null,
            frequency: 'one-time',
            category: 'other',
            description: ''
        })
    }
    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className="error">{ error }</p>}   
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled >Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>  
                    <option value="travelling">Travelling</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <input value={amount}  
                    type="number" 
                    name={'amount'} 
                    placeholder={'Expense amount'}
                    onChange={handleInput('amount')} 
                />
            </div>
            <div className="input-control">
                <DatePicker
                    showIcon
                    id='start_date'
                    selected={start_date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, start_date: date})
                    }}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    showIcon
                    id='end_date'
                    selected={end_date}
                    dateFormat="dd/MM/yyyy"
                    autoComplete="off"
                    onChange={(date) => {
                        setInputState({...inputState, end_date: date})
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={frequency} name="frequency" id="frequency" onChange={handleInput('frequency')}>
                    <option value='' disabled>Frequency</option>
                    <option value="one-time">One-time</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="halfyear">Half-Year</option>
                    <option value="yearly">Yearly</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add a description' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
                <Button 
                    name={'Add Expense'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
        </FormStyled>

    )
}



    const FormStyled = styled.form`
     display: flex;
    flex-direction: column;
    gap: 1rem;

    input, textarea, select {
        width: 70%;
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);

        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }

    .input-control {
        max-width: 306px;
    }


    .selects {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        max-width: 306px;
        width: 100%;
        select {
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .react-datepicker-wrapper {
        width: 100%;
        max-width: 306px;
    }

    .react-datepicker-wrapper .react-datepicker__input-container {
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;
    }

    input.custom-datepicker-input {
        width: 100%;
        border: 2px solid #fff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 5px;
    }

    .react-datepicker__calendar-icon {
        position: absolute;
        left: -5px;
        top: 47%;
        transform: translateY(-50%);
        font-size: 0.8em;
        color: #F56692;
    }

    .react-datepicker {
        font-family: 'Arial', sans-serif;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        background-color: #f8f8f8;
    }

    .react-datepicker__header {
        background-color: #F56692;
        color: #fff;
        border-bottom: none;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .react-datepicker__current-month,
    .react-datepicker__month-year {
        font-size: 18px;
        font-weight: bold;
        color: #fff;
    }

    .react-datepicker__month {
        padding: 10px;
    }

    .react-datepicker__day-name {
        color: #555;
        font-weight: bold;
        font-size: 14px;
    }

    .react-datepicker__day {
        width: 2.2rem;
        height: 2.2rem;
        line-height: 2.2rem;
        margin: 3px;
        border-radius: 50%;
        transition: background-color 0.2s ease, color 0.2s ease;
    }

    .react-datepicker__day--selected,
    .react-datepicker__day--range-start,
    .react-datepicker__day--range-end,
    .react-datepicker__day--in-range {
        background-color: #F56692;
        color: #fff;
        border-radius: 50%;
    }

    .react-datepicker__day--today {
        color: #F56692;
        font-weight: bold;
    }

    .react-datepicker__day--today.react-datepicker__day--selected {
        background-color: #F56692;
        color: #fff;
    }

    .react-datepicker__day:not(.react-datepicker__day--selected):not(.react-datepicker__day--in-range):hover {
        background-color: #e0e0e0;
        color: #333;
    }

    .react-datepicker__day--outside-month {
        color: #bbb;
    }

    .react-datepicker__navigation {
        top: 15px;
    }

    .react-datepicker__navigation--previous {
        left: 15px;
    }

    .react-datepicker__navigation--next {
        right: 15px;
    }

    .react-datepicker__navigation--previous::before,
    .react-datepicker__navigation--next::before {
        border-color: #fff;
        border-width: 2px 2px 0 0;
    }

    .react-datepicker__navigation--previous:hover::before,
    .react-datepicker__navigation--next:hover::before {
        border-color: #f0f0f0;
    }

    .react-datepicker__triangle {
        display: none;
    }

    .submit-btn {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-self: left;
        background-color: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: .25rem;
        box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
        box-sizing: border-box;
        color: rgba(0, 0, 0, 0.85);
        cursor: pointer;
        font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
        font-size: 16px;
        font-weight: 600;
        justify-content: center;
        line-height: 1.25;
        margin: 0;
        min-height: 3rem;
        padding: calc(.875rem - 1px) calc(1.5rem - 1px);
        position: relative;
        text-decoration: none;
        transition: all 250ms;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: baseline;
        width: 100%;
        max-width: 306px;
    }

    .submit-btn:hover,
    .submit-btn:focus {
        border-color: rgba(0, 0, 0, 0.15);
        box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
        color: rgba(0, 0, 0, 0.65);
    }

    .submit-btn:hover {
        transform: translateY(-1px);
    }

    .submit-btn:active {
        background-color: #F0F0F1;
        border-color: rgba(0, 0, 0, 0.15);
        box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
        color: rgba(0, 0, 0, 0.65);
        transform: translateY(0);
    }
`;

export default ExpenseForm;   
///////////

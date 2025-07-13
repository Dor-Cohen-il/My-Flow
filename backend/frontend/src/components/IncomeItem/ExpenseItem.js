import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios'; // Import axios for HTTP requests
import DatePicker from "react-datepicker";
// Import all your icons
import { bitcoin, book, calender, card, circle, clothing, repeat, save ,comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt, edit, cancel } from '../../utils/icons'; // Added 'edit' icon if you have one. If not, you can add a simple text 'Edit' or use another icon.
import Button from "../Button/Button";
import { dateFormat } from "../../utils/dateFormat";
import formatCurrency from "../../utils/formatCurrency"; // Assuming this utility exists

// The IncomeItem component now expects 'income' as a single prop object,
// and 'onDelete', 'onUpdateSuccess' as callback functions.
function ExpenseItem({ expense, onDelete, onUpdateSuccess, indicatorColor }) { // Added indicatorColor here
    // Destructure properties from the 'income' object
    const { _id, title, amount, start_date, end_date,frequency, category, description, type } = expense;

    // State to control edit mode
    const [isEditing, setIsEditing] = useState(false);

    // State to hold the values being edited. Initialize with current income values.
    const [editedExpense, setEditedExpense] = useState({
        _id: _id,
        title: title,
        amount: amount,
        type: type, // e.g., 'income'
        category: category,
        description: description,
        // Format date for <input type="date"> (YYYY-MM-DD)
        start_date: new Date(start_date).toISOString().split('T')[0],
        end_date: new Date(end_date).toISOString().split('T')[0],
        frequency: frequency,
    });


    const categoryIcon = () => {
        switch (category) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return ''
        }
    }

    // Handler for input changes in edit mode
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedExpense(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleDateChange = (date, name) => {
        // ה-date כאן הוא התאריך שה-DatePicker החזיר ישירות
        // ה-name (end_date או start_date) חייב להיות מועבר ידנית
        setEditedExpense(prev => ({
            ...prev,
            [name]: date
        }));
    };
    // Handler for clicking the Edit button
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Handler for clicking the Cancel button
    const handleCancelClick = () => {
        setIsEditing(false);
        // Reset editedIncome to original values on cancel
        setEditedExpense({
            _id: _id,
            title: title,
            amount: amount,
            type: type,
            category: category,
            description: description,
            start_date: new Date(start_date).toISOString().split('T')[0],
            end_date: new Date(end_date).toISOString().split('T')[0],
            frequency: frequency

        });
    };

    // Handler for clicking the Save button (sends update request to server)
    const handleSaveClick = async () => {
        try {
            // Validate basic input before sending (optional but recommended)
            if (!editedExpense.title || !editedExpense.amount || !editedExpense.category || !editedExpense.start_date) {
                alert('Please fill in all required fields.');
                return;
            }
            if (editedExpense.amount <= 0) {
                alert('Amount must be positive.');
                return;
            }

            // Your backend API URL for updating an asset
            const response = await axios.put(
                `http://localhost:8000/api/v1/update-expense/${editedExpense._id}`,
                editedExpense // The edited data from state
            );

            console.log('Update successful:', response.data);
            setIsEditing(false); // Exit edit mode

            // Call the callback from the parent component to update the UI
            if (onUpdateSuccess) {
                onUpdateSuccess(response.data.asset); // Pass the updated asset object from the server response
            }

        } catch (error) {
            console.error('Error updating income:', error.response ? error.response.data : error.message);
            alert(`Failed to update income: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    // Render logic based on `isEditing` state
    return (
        <ExpenseItemStyled indicator={indicatorColor}>
            <div className="icon">
                {categoryIcon()}
            </div>
            <div className="content">
                {isEditing ? (
                    // Edit mode form
                    <div className="edit-form">
                        <input
                            type="text"
                            name="title"
                            value={editedExpense.title}
                            onChange={handleChange}
                            placeholder="Income Title"
                        /><br />
                        <input
                            type="number"
                            name="amount"
                            value={editedExpense.amount}
                            onChange={handleChange}
                            placeholder="Income Amount"
                        /><br />
                        {/* You might want a <select> here for categories if they are fixed */}
                        <input
                            type="text"
                            name="category"
                            value={editedExpense.category}
                            onChange={handleChange}
                            placeholder="Category"
                        /><br />
                        <DatePicker
                            name="start_date"
                            value={editedExpense.start_date}
                            onChange={(date) => handleDateChange(date, "start_date")}
                        />
                        <DatePicker
                           type="end_date"
                            name="end_date"
                            value={editedExpense.end_date}
                            onChange={(date) => handleDateChange(date, "end_date")}
                        /><br />
                        <input
                            type="frequency"
                            name="frequency"
                            value={editedExpense.frequency}
                            onChange={handleChange}
                        /><br />
                        <textarea
                            name="description"
                            value={editedExpense.description}
                            onChange={handleChange}
                            placeholder="Description (optional)"
                            rows="2"
                        ></textarea><br />
                        <div className="buttons">
                            <Button
                                icon={save} // No icon for Save
                                bPad={'0.5rem 1rem'}
                                bRad={'5%'}
                                bg={'var(--primary-color)'}
                                color={'#fff'}
                                onClick={handleSaveClick}
                                text="Save"
                            />
                            <Button
                                icon={cancel} // No icon for Cancel
                                bPad={'0.5rem 1rem'}
                                bRad={'5%'}
                                bg={'var(--color-grey-light)'}
                                color={'#333'}
                                onClick={handleCancelClick}
                                text="Cancel"
                            />
                        </div>
                    </div>
                ) : (
                    // Display mode
                    <>
                        <h5>{title} - {formatCurrency(amount)} </h5>
                        <div className="title-place"></div> {/* This div seems empty, you might want to remove it or add content */}
                        <div className="inner-content">
                            <div className="text">
                                <p>{calender} {dateFormat(start_date)} </p>
                                <p>{calender} {dateFormat(end_date)} </p>
                                {frequency !== 'one-time' ? (
                                    <p>{repeat} {frequency} </p>
                                ) : (
                                    <p></p>
                                )}
                                <p>{comment}{description} </p>
                            </div>
                            <div className="actions">
                                <Button
                                    icon={edit} // Using the 'edit' icon, make sure it's imported
                                    bPad={'0.5rem'}
                                    bRad={'5%'}
                                    bg={'var(--primary-color)'}
                                    color={'#fff'}
                                    iColor={'#fff'}
                                    hColor={'var(--color-blue)'} // Example hover color
                                    onClick={handleEditClick}
                                />
                                <Button
                                    icon={trash}
                                    bPad={'0.5rem'}
                                    bRad={'5%'}
                                    bg={'var(--primary-color)'}
                                    color={'#fff'}
                                    iColor={'#fff'}
                                    hColor={'var(--color-red)'} // Changed hover to red for delete
                                    onClick={() => onDelete(_id)} // Use _id directly
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </ExpenseItemStyled>
    );
}

const ExpenseItemStyled = styled.div`
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
    height: auto; /* Changed from 8rem to auto to accommodate the form */
    min-height: 8rem; /* Ensure minimum height */


    .icon{
        width: 50px;
        height: 50px;
        border-radius: 10px;
        background: #F5F5F5;
        display: flex;
        align-items: left; /* Keep left alignment as per your original */
        justify-content: left; /* Keep left alignment as per your original */
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
        max-width: 600px; /* Keep max-width for content container */
        
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
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%; /* Ensure inner-content takes full width */

            .text{
                flex: 1; /* Allow text to take available space */
                display: flex;
                flex-direction: column; /* Stack paragraphs vertically */
                align-items: flex-start; /* Align text to the left */
                gap: 0.2rem; /* Reduce gap between text items */

                p{
                    display: flex;
                    align-items: center;
                    gap: 0.2rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                    margin: 0; /* Remove default paragraph margins */
                }
            }
            .actions{
                display: flex;
                gap: 0.5rem; /* Space between edit and delete buttons */
                align-items: center;
            }
        }
    }

    // Styles for the edit form
    .edit-form {
        display: flex;
        flex-direction: row;
        gap: 0.1rem;
        width: 100%;

        label {
            font-weight: bold;
            font-size: 0.9rem;
            color: #444;
        }

        input[type="text"],
        input[type="number"],
        input[type="date"],
        textarea {
            width: calc(100% - 10px); /* Adjust width to account for padding */
            padding: 0.4rem;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 0.9rem;
            box-sizing: border-box; /* Include padding and border in the element's total width and height */
        }

        textarea {
            resize: vertical; /* Allow vertical resizing of textarea */
            min-height: 30px;
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
        .buttons {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.5rem;
            max-width: 20px;
            justify-content: flex-end; /* Align buttons to the right */
        }
    }
`;

export default ExpenseItem;
///

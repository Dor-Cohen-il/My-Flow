import React from 'react';
import styled from "styled-components";
import avatar from '../../img/avatar.png'; // Assuming you have an avatar image in this path
import { menuItems } from '../../utils/menuItems';

function Navigation() {
  return (
    <NavStyled>
        <div className="user-con">
            <img src={avatar} alt="User Avatar" />
            <div className="text">
                <h2>Daniel</h2>
                <p>Your Money</p>
            </div>
        </div>
        <ul className="menu-items" style={{ listStyle: "none", padding: 0}}>
            {menuItems.map((item, index) => (
                <li
                key={item.id}>
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
            ))}
        </ul>
        <div className="bottom-nav">
            <li>
                Logout
            </li>
        </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
    padding: 2rem, 1.5rem;
    width: 25%;
    min-width: 220px;  
    max-width: 400px;
    height: 90vh;
    background: rgba(2252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    z-index: 1;

    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: 0.2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.6);
            margin-left: 0.5rem;
            margin-top: 1rem;
            z-index: 1;
        }
  }
`;

export default Navigation;

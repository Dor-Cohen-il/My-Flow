import React from 'react';
import styled from "styled-components";
import avatar from '../../img/avatar.png'; // Assuming you have an avatar image in this path
import { menuItems } from '../../utils/menuItems';
import { signout } from '../../utils/icons';

function Navigation({active, setActive}) {

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
                key={item.id}
                onClick={() => setActive(item.id)}
                className={active === item.id ? "active" : ""}
                >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
            ))}
        </ul>
        <div className="bottom-nav" style={{ listStyle: "none", marginLeft: "1rem", marginBottom:"1rem"}}>
            <li>
                {signout} Sign Out
            </li>
        </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
    padding: 2rem, 1.5rem;
    width: 25%;
    min-width: 110px;  
    max-width: 200px;
    height: 90vh;
    background: rgba(2252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    border-radius: 10px;
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
            margin-top: 0.5rem;
            z-index: 1;
        }
        h2{
            margin-top: 50px;
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
  }
        .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        list-style: none;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: 0.2rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.4s ease-in-out;
            color: rgba(34, 34, 96, 0.6);
            padding-left: 1rem;
            position: relative;
        }
        i{
            color: rgba(34, 34, 96, 0.6);
            font-size: 1.4rem;
            transition: all 0.4s ease-in-out;
        }
        .active{
            color: rgba(34, 34, 96, 1) !important;
            i{
                color: rgba(34, 34, 96, 1) !important;
            }
            &::before{
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 4px;
                height: 100%;
                background: #222260;
                border-radius: 0 10px 10px 0;
                }
        }
}
        ////My on addition
        .bottom-nav{
        flex: 1;
        display: flex;
        flex-direction: column;
        list-style: none;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: 0.2rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.4s ease-in-out;
            color: rgba(34, 34, 96, 0.6);
            padding-left: 1rem;
            position: relative;
        }
        i{
            color: rgba(34, 34, 96, 0.6);
            font-size: 1.4rem;
            transition: all 0.4s ease-in-out;
        }
`;

export default Navigation;

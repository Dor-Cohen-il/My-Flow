import React from 'react';
import styled from "styled-components";
import { keyframes } from 'styled-components';
import { useWindowSize } from '../../utils/useWindowSize';

function Orb() {

    const { width, height } = useWindowSize();
    //console.log('Window size:', width, height);
    //Animation
    const moveOrb = keyframes`
    0% {
        transform: translate(0, 0);
    }
    50% {
        transform: translate(${width/1.2}px, ${height/2}px);
    }
    100% {
        transform: translate(0, 0);
    `;
    const OrbStyled = styled.div`
    height: 70vh;
    width: 70vh;
    position: absolute;
    mborder-radius: 50%;
    margin-left: -37vh;
    margin-top: -37vh;
    background: linear-gradient(180deg, #f56692 0%, #F2994A 100%);
    filter: blur(400px);
    animation: ${moveOrb} 15s alternate linear infinite;
    z-index: 0;
    `;
  return (
    <OrbStyled>
    </OrbStyled>
  );
}
export default Orb;
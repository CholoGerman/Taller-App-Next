import React from 'react';
import styled from 'styled-components';

const Pattern = ({ children }) => {
  return (
    <StyledWrapper>
      <div className="pattern-background">
        {children}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .pattern-background {
    width: 100%;
    min-height: 100vh;
    background: 
      /* Gradiente principal */
      radial-gradient(
        125% 125% at -2% 101%,
        rgba(245, 87, 2, 1) 10.5%,
        rgba(245, 120, 2, 1) 16%,
        rgba(245, 140, 2, 1) 17.5%,
        rgba(245, 170, 100, 1) 25%,
        rgba(238, 174, 202, 1) 40%,
        rgba(202, 179, 214, 1) 65%,
        rgba(148, 201, 233, 1) 100%
      ),
      /* Patrón de puntos semitransparentes */
      radial-gradient(circle at 20px 20px, rgba(255, 255, 255, 0.15) 2px, transparent 2px);
    background-size: auto, 40px 40px;
    background-blend-mode: overlay;
  }
`;

export default Pattern;
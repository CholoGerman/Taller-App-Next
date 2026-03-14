import React from 'react';
import styled from 'styled-components';

const Input = ({ label, name, type = 'text', defaultValue, onChange, ...props }) => {
  return (
    <StyledWrapper>
      <div className="input-group">
        <input
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder=" " /* Placeholder vacío para activar :not(:placeholder-shown) */
          autoComplete="off"
          className="input"
          {...props}
        />
        <label htmlFor={name} className="user-label">
          {label}
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input-group {
    position: relative;
    width: 100%;
  }

  .input {
    border: solid 1.5px #9e9e9e;
    border-radius: 1rem;
    background: none;
    padding: 1rem;
    font-size: 1rem;
    color: #f5f5f5;
    transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    box-sizing: border-box;
  }

  .user-label {
    position: absolute;
    left: 15px;
    color:rgb(129, 129, 129);
    pointer-events: none;
    transform: translateY(1rem);
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .input:focus,
  .input:not(:placeholder-shown) {
    outline: none;
    border: 1.5px solid #1a73e8;
  }

  .input:focus ~ label,
  .input:not(:placeholder-shown) ~ label {
    transform: translateY(-50%) scale(0.8);
    background-color: #212121;
    padding: 0 0.2em;
    color: #2196f3;
  }
`;

export default Input;
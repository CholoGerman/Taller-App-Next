import React from 'react';
import styled from 'styled-components';

const Select = ({ label, name, value, defaultValue, onChange, children, ...rest }) => {
  const selectProps = {
    name,
    id: name,
    onChange,
    className: "select",
    ...(value !== undefined ? { value } : { defaultValue }),
    ...rest
  };

  return (
    <StyledWrapper>
      <div className="select-group">
        <select {...selectProps}>
          {children}
        </select>
        <label htmlFor={name} className="user-label">
          {label}
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .select-group {
    position: relative;
    width: 100%;
  }

  .select {
    border: solid 1.5px #9e9e9e;
    border-radius: 1rem;
    background: none;
    padding: 1rem;
    font-size: 1rem;
    color:gray-800
    transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    box-sizing: border-box;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23f5f5f5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1rem;
  }

  /* Estilo para las opciones dentro del select (funciona en algunos navegadores) */
  .select option {
    background: #212121;
    color: #f5f5f5;
  }

  .user-label {
    position: absolute;
    left: 15px;
    color: #e8e8e8;
    pointer-events: none;
    transform: translateY(1rem);
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .select:focus,
  .select:valid {
    outline: none;
    border: 1.5px solid #1a73e8;
  }

  .select:focus ~ label,
  .select:valid ~ label {
    transform: translateY(-50%) scale(0.8);
    background-color: #212121;
    padding: 0 0.2em;
    color: #2196f3;
  }
`;

export default Select;
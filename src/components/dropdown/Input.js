import React from 'react';
import styled from 'styled-components';

function Input({ onChange, value, style }) {
  return (
    <StyledInput placeholder='Search...' onChange={(e) => onChange(e.target.value)} value={value} />
  )
};

const StyledInput = styled.input`
  position: relative;
  height: 2rem;
  width: 20rem;
  border: 0;
  border-radius: 10px;
  margin: .5rem;
  padding-top: .25rem;
  padding-left: .75rem;
  font-size: 14px;
  background: #F0F4FF;
  box-shadow: inset 3px 3px 4px 2px #ced8f5;
`

export default Input
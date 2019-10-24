import React from 'react';
import styled from 'styled-components';

const StyledColumn = styled.div`
  width: ${props => props.width};
  background: ${props => props.background};
`;

const Column = props => (
  <StyledColumn {...props}>{props.children}</StyledColumn>
);

export default Column;

import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const StyledSlice = styled.div`
  background: ${props => props.color};
  margin-top: 5px;
  padding: 20px;
`;

class Slice extends React.Component {
  render() {
    const { title, description, duration, color } = this.props;
    return (
      <StyledSlice {...this.props}>
          <h3>{title}</h3>
          <div>{duration}</div>
      </StyledSlice>
    );
  }
}

export default Slice;

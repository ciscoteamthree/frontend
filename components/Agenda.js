import React from 'react';
import styled from 'styled-components';
import Flex, { FlexItem } from 'styled-flex-component';
import moment from 'moment';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { isEmpty, isNull, isEqual, sortBy } from 'lodash';

const Element = styled.li`
  padding: 10px;
  margin: 0;
  background: ${props => props.color};
  height: ${props => props.duration * 15}px;
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
`;

const SortableItem = SortableElement(({ slice }) => (
  <Element color={slice.color} duration={slice.duration}>
    <Flex full justifyBetween column>
      <p>{slice.duration} min</p>
      <h1 style={{ textAlign: 'center', color: 'white' }}>{slice.title}</h1>
      <p>{slice.duration} min</p>
    </Flex>
  </Element>
));

const SortableList = SortableContainer(({ slices }) => {
  return (
    <List>
      {slices &&
        slices.map((slice, index) => (
          <SortableItem key={`item-${slice.id}`} index={index} slice={slice} />
        ))}
    </List>
  );
});

class Agenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slices: isNull(props.agenda) ? [] : props.agenda
    };
  }

  // Will check if the agenda needs an update
  componentWillUpdate(nextProps, nextState, nextContext) {
    // Get all values from our state and from our new props
    const ourList = this.state.slices.map(a => a.title);
    const newList = nextProps.agenda.map(a => a.title);

    // Check if the a sorted version of our titles is equal to a
    // sorted version of the new list, if so, its the same list
    if (!isEqual(sortBy(ourList), sortBy(newList))) {
      this.setState({ slices: nextProps.agenda });
    }
  }

  // Will run on sort end, so the state updates its index
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      slices: arrayMove(this.state.slices, oldIndex, newIndex)
    });
  };

  render() {
    const { slices } = this.state;
    return <SortableList slices={slices} onSortEnd={this.onSortEnd} />;
  }
}

export default Agenda;

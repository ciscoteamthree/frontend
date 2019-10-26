import React from 'react';
import styled from 'styled-components';
import Flex, { FlexItem } from 'styled-flex-component';
import moment from 'moment';
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { isEmpty, isNull, isEqual, sortBy } from 'lodash';

const Element = styled.li`
  padding: 10px;
  margin: 0;
  background: ${props => props.color};
  height: ${props => (props.duration / props.totalDuration) * 100}%;
  list-style-type: none;
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
  height: 92vh;
`;

const SliceTitle = styled.p`
  font-size: 1.5rem;
`;

const DragHandle = SortableHandle(() => (
  <i
    className="icon icon-list-menu_28"
    style={{ color: 'white', fontWeight: '1000' }}
  >
    {' '}
  </i>
));

const minDuration = 1;
const maxDuration = 60;

const SortableItem = SortableElement(
  ({
    slice,
    totalDuration,
    onSliceTitleClick,
    onSliceTitleChange,
    onSliceTitleSave,
    onSliceDurationClick,
    onSliceDurationChange,
    onSliceDurationSave,
    disabled
  }) => {
    const isEditingTitle = !disabled && 'editingTitle' in slice && slice.editingTitle;
    const isEditingDuration =
      !disabled && 'editingDuration' in slice && slice.editingDuration;
    return (
      <Element
        color={slice.color}
        duration={slice.duration}
        totalDuration={totalDuration}
      >
        <Flex full center>
            <Flex full column justifyBetween style={{ flexBasis: '15%'}}>
              <div>
                {isEditingDuration ? (
                  <div className="md-input-group slice-duration">
                    <input
                      className="md-input"
                      type="number"
                      placeholder={minDuration}
                      min={minDuration}
                      max={maxDuration}
                      onChange={e => onSliceDurationChange(slice, e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          onSliceDurationSave(slice);
                        }
                      }}
                      value={slice.duration}
                      style={{
                          backgroundColor: 'white',
                          fontSize: '15px',
                          height: '32px',
                          width: '70px'
                      }}
                      onBlur={() => {
                          onSliceDurationSave(slice);
                      }}
                      autoFocus
                    />
                  </div>
                ) : (
                  <p onPointerDown={() => onSliceDurationClick(slice)} style={{ color: 'white', fontStyle: 'italic'}}>
                    {slice.duration} min
                  </p>
                )}
                </div>
                <div>
                    { !disabled && <DragHandle/> }
                </div>
                <div></div>
            </Flex>
            <Flex full center justifyBetween column style={{ flexBasis: '90%'}}>
                {isEditingTitle ? (
                  <div style={{ textAlign: 'center', color: 'white' }}>
                    <div className="md-input-group medium-12">
                      <input
                        className="md-input"
                        type="text"
                        placeholder="Slice title"
                        onChange={e => onSliceTitleChange(slice, e.target.value)}
                        onKeyPress={e => {
                          if (e.key === 'Enter') {
                            onSliceTitleSave(slice);
                          }
                        }}
                        value={slice.title}
                        style={{
                          backgroundColor: 'white'
                        }}
                        onBlur={() => onSliceTitleSave(slice)}
                        autoFocus
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    onPointerDown={() => {
                      onSliceTitleClick(slice);
                    }}
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      overflow: 'hidden'
                    }}
                  >
                    <SliceTitle>{slice.title}</SliceTitle>
                  </div>
                )}
              </Flex>
        </Flex>
      </Element>
    );
  }
);

const SortableList = SortableContainer(
  ({
    slices,
    onSliceTitleClick,
    onSliceTitleChange,
    onSliceTitleSave,
    onSliceDurationClick,
    onSliceDurationChange,
    onSliceDurationSave,
    disabled
  }) => {
    const totalDuration = slices.reduce((a, b) => a + b.duration, 0);
    return (
      <List>
        {slices &&
          slices.map((slice, index) => (
            <SortableItem
              key={`item-${slice.id}`}
              index={index}
              onSliceTitleClick={onSliceTitleClick}
              onSliceTitleChange={onSliceTitleChange}
              onSliceTitleSave={onSliceTitleSave}
              onSliceDurationClick={onSliceDurationClick}
              onSliceDurationChange={onSliceDurationChange}
              onSliceDurationSave={onSliceDurationSave}
              slice={slice}
              disabled={disabled}
              totalDuration={totalDuration}
            />
          ))}
      </List>
    );
  }
);

class Agenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slices: isNull(props.agenda) ? [] : props.agenda
    };
    this.onSliceTitleClick.bind(this);
  }

  // Will check if the agenda needs an update
  componentWillReceiveProps(nextProps) {
    // Get all values from our state and from our new props
    const ourList = this.state.slices && this.state.slices.map(a => a.title);
    const newList = nextProps.agenda && nextProps.agenda.map(a => a.title);

    // Check if the a sorted version of our titles is equal to a
    // sorted version of the new list, if so, its the same list
    if (this.props.disabled || !isEqual(sortBy(ourList), sortBy(newList))) {
      this.setState({ slices: nextProps.agenda });
    }
  }

  onSliceDurationClick = slice => {
    const slices = this.state.slices;
    const foundIndex = slices.findIndex(x => x.id == slice.id);
    if (foundIndex === -1) {
      return;
    }
    slice['editingDuration'] = true;
    slices[foundIndex] = slice;
    this.setState({ slices });
  };

  onSliceDurationChange = (slice, duration) => {
    const slices = this.state.slices;
    //const foundSlice = this.state.slices.find(stateSlice => stateSlice.id == slice.id)
    const foundIndex = slices.findIndex(x => x.id == slice.id);
    if (foundIndex === -1) {
      return;
    }
    duration = Number(duration);
    if (duration < minDuration) {
      duration = minDuration;
    } else if (duration > maxDuration) {
      duration = maxDuration;
    }
    slice['duration'] = duration;
    slices[foundIndex] = slice;
    this.setState({ slices });
  };

  onSliceDurationSave = slice => {
    const slices = this.state.slices;
    const foundIndex = slices.findIndex(x => x.id == slice.id);
    if (foundIndex === -1) {
      return;
    }
    slice['editingDuration'] = false;
    slices[foundIndex] = slice;
    this.setState({ slices });
  };

  onSliceTitleClick = slice => {
    const slices = this.state.slices;
    const foundIndex = slices.findIndex(x => x.id == slice.id);
    if (foundIndex === -1) {
      return;
    }
    slice['editingTitle'] = true;
    slices[foundIndex] = slice;
    this.setState({ slices });
  };

  onSliceTitleChange = (slice, title) => {
    const slices = this.state.slices;
    const foundIndex = slices.findIndex(x => x.id == slice.id);
    if (foundIndex === -1) {
      return;
    }
    slice['title'] = title;
    slices[foundIndex] = slice;
    this.setState({ slices });
  };

  onSliceTitleSave = slice => {
    const slices = this.state.slices;
    const foundIndex = slices.findIndex(x => x.id == slice.id);
    if (foundIndex === -1) {
      return;
    }
    slice['editingTitle'] = false;
    slices[foundIndex] = slice;
    this.setState({ slices });
  };

  // Will run on sort end, so the state updates its index
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(
      {
        slices: arrayMove(this.state.slices, oldIndex, newIndex)
      },
      () => this.props.setAgenda(this.state.slices)
    );
  };

  render() {
    const { slices } = this.state;
    return (
      <SortableList
        slices={slices}
        onSliceTitleClick={this.onSliceTitleClick}
        onSliceTitleChange={this.onSliceTitleChange}
        onSliceTitleSave={this.onSliceTitleSave}
        onSliceDurationClick={this.onSliceDurationClick}
        onSliceDurationChange={this.onSliceDurationChange}
        onSliceDurationSave={this.onSliceDurationSave}
        distance={5}
        disabled={this.props.disabled}
        onSortEnd={this.onSortEnd}
        useDragHandle
        lockAxis={'y'}
      />
    );
  }
}

export default Agenda;

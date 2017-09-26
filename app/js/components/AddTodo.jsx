import React from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions';

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div style={{width:'100%', float: 'left'}}>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>
        ADD RSS URL
      </button>
    </div>
  );
};
export default connect()(AddTodo);
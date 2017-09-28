import { createStore, combineReducers } from 'redux';
import { loadState, saveState } from '../components/localStorage.jsx'

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
          todo(t, action)
      );
          case 'DELETE_TODO':
          console.log("DELETE STORE")
  return state.filter(({ id }) =>
                      id !== action.id);
    default:
      return state;
  }
};

const feed = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_FEED':
      return [
        ...state,
      ];
    default:
      return state;
  }
};

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const persistedState = loadState();

console.log("load")
console.log(persistedState)

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export default createStore(todoApp,persistedState)
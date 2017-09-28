import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route} from 'react-router-dom'
import AddTodo from './AddTodo.jsx';
import TodoList from './TodoList.jsx';
import MainRight from './MainRight.jsx';
import Footer from './Footer.jsx';
import store from '../store';

import { loadState, saveState } from './localStorage.jsx'

store.subscribe(() => {
    saveState(store.getState());
})
console.log("save")
console.log(store.getState().todos);

const TodoApp = () => (
  <div>
    <AddTodo />
    <TodoList />
    <MainRight />
  </div>
);

export default (
  <Provider store={store}>
    <BrowserRouter>
        <Route path="/:filter?" component={TodoApp} />    
    </BrowserRouter>
  </Provider>
)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route, NavLink } from 'react-router-dom'
import { toggleTodo, deleteTodo } from '../actions';


const RouteTest = ({ id }) => (
    <div>
     <Route path="/:filter" render={({match}) => (
          <Compare url={match.params.filter} id={id}/>
        )}/>
    </div>
)

class Compare extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       content: null
    }
  }
//  componentDidMount = () => {
//    fetch(this.props.url)
//      .then(res => res.text())
//      .then(res => {
//        this.setState({
//          content: res
//        })
//      })
//  }
  
  render() {
    const {content} = this.state
    if (this.props.url == this.props.id){
         return (
            <div>{this.props.url}</div>
        )
    } else {
        return (
            null
        )
    }
  }
}

const Todo = ({
  onClick,
  onDelete,
  completed,
  text,
  linkTo,
  idA,
  }) => (
  <li
    onClick={onClick}
    style={{backgroundColor:'#e2e2e2', padding:'5px', marginTop:'10px',borderRadius:'5px'}}
    >
    <NavLink activeStyle={{fontWeight: 'bold',color: 'red'}} to={idA.toString()}>{text}</NavLink><button style={{margin:'10px',width:'40px',backgroundColor:'#b40303',color:'#fff',border:'0',borderRadius:'10px'}} onClick={onDelete}><p>X</p></button>
  </li>
);

const TodoList = ({
  todos,
  onTodoClick,
  onDeleteClick
  }) => (
  <ul style={{width:'20%',float:'left',listStyle:'none'}}>
    {todos.map(todo =>
        <Todo
          key={todo.id}
          idA={todo.id}
          {...todo}
          onDelete={() => onDeleteClick(todo.id)}
          onClick={() => onTodoClick(todo.id)}
          />
    )}
  </ul>
        
);

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
          t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
          t => !t.completed
      );
  }
}

const mapStateToProps = (
  state
) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};
const mapDispatchToProps = (
  dispatch
) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
    onDeleteClick: (id) => {
      dispatch(deleteTodo(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
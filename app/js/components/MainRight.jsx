import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { toggleTodo, saveFeed } from '../actions';
var FeedMe = require('feedme');
var http = require('http');

const RouteTest = ({ id, text }) => (
    <div>
     <Route path="/:filter" render={({match}) => (
          <Compare url={match.params.filter} id={id} text={text}/>
        )}/>
    </div>
)

  function createMarkup(text) {
  return {__html: text};
}

class Compare extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       id: this.props.id,
       text: this.props.text,
       url: this.props.url,
       rssArray: [],
       content: null
    }
  }
    
  componentDidMount = () => {
      var array = this.state.rssArray;
      var idNew = 0;
    http.get(this.props.text, function(res) {
      var parser = new FeedMe();
      parser.on('item', function(item) {
        array.push(<li key={idNew++}><h2>{item.title} - {item.pubdate}</h2><p dangerouslySetInnerHTML={createMarkup(item.description)}></p><hr/></li>)
      });
      res.pipe(parser);
    }, function(){
        dispatch(saveFeed(array));
        this.setState({
          rssArray: array
      }, function(){
          console.log(this.state.rssArray)
      })
    });
      
  }
  

  
//  componentDidMount = () => {
//    fetch(this.props.text)
//      .then(res => res.text())
//      .then(res => {
//        this.setState({
//          content: res
//        })
//      })
//  }
  
  render() {
    const {content} = this.state
    const rssArray = this.state.rssArray
    if (this.props.url == this.props.id){
         return (
            <div>ABC<ul style={{listStyle:'none'}}>{rssArray}</ul></div>
        )
    }else{
         return (
            null
        )
    }
  }
}

const Todo = ({
  onClick,
  completed,
  text,
  linkTo,
  idA,
  }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration:
        completed ?
          'line-through' :
          'none'
    }}
    className={
        completed ?
          'completed' :
          ''
    }
    >
    <Link to={idA.toString()}>{text}</Link>
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
  }) => (
    <div>
    {todos.map(todo =>
        <div style={{width:'70%', float: 'left'}} key={todo.id}>
            <RouteTest id={todo.id} text={todo.text}/>
        </div>
    )}  
    </div>
);

const getVisibleTodos = (
  todos,
  filter,
  feed
) => {
  switch (filter) {
    case 'SHOW_ALL':
      console.log(feed)
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

const getFeed = (
  feed,
    filter
) => {
  switch (filter) {
    case 'SHOW_FEED':
      console.log(feed)
      return feed;
  }
}

const mapStateToProps = (
  state
) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter,
    ),
    feed: getFeed(state.feed)
  };
};
const mapDispatchToProps = (
  dispatch
) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
var textID = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const addTodo = (text) => {
    textID = "";
    for( var i=0; i < 7; i++ )
textID += possible.charAt(Math.floor(Math.random() * possible.length));
  return {
    type: 'ADD_TODO',
    id: textID,
    text
  };
};

export const saveFeed = (text) => {
  return {
    type: 'SAVE_FEED',
    text
  };
};

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};

export const deleteTodo = (id) => {
    console.log("DELETE TODO ACTION")
  return {
    type: 'DELETE_TODO',
    id
  };
};

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};

import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { connect } from 'react-redux';
//

const FilterLink = ({ filter, children }) => (
    <Link
        to={filter === 'all' ? '' : filter}
        activeStyle={{
            textDecoration: 'none',
            color: 'red',
        }}
    >
            {children}    
    </Link>
);

const RouteTest = () => (
    <div>
     <Route exact={true} path="/" render={() => (
              <p>Welcome</p>
            )}/>
     <Route exact={true} path="/test" render={() => (
          <p>Hello</p>
        )}/>
     <Route path="/:filter" render={({match}) => (
          <p>{match.params.filter}</p>
        )}/>
    </div>
)


export default () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="all">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="active">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="completed">
      Completed
    </FilterLink>
    <RouteTest/>
  </p>
);
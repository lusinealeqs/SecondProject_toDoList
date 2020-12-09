import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './components/Pages/ToDo';
import './Style/body.css'
import SingleTask from './components/Pages/SingleTask'
import NotFound from './components/Pages/NotFound'
import { Redirect, Route, Switch } from 'react-router-dom';
import NavMenu from './components/NavMenu'


function App() {
  return (<>
    {/* <h1 className="title">Welcome to Your ToDo Space</h1> */}
    {/* <Todo /> */}

    <NavMenu />
    <Switch>
      <Route path='/' exact component={Todo} />
      <Route path='/task/:id' exact component={SingleTask} />
      <Route path='/task/1' exact component={SingleTask} />
      <Route path='/not-found' exact component={NotFound} />
      <Redirect to='/not-found'/>
    </Switch>
  </>
  );
}

export default App;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './components/ToDo';
import './Style/body.css'


function App() {
  return (<>
    <h1 className="title">Welcome to Your ToDo Space</h1>
    <Todo />
  </>
  );
}

export default App;
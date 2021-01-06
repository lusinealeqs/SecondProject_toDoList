import React, { PureComponent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Todo from './components/Pages/ToDo';
import './Style/body.css'
import SingleTask from './components/Pages/SingleTask'
import NotFound from './components/Pages/NotFound'
import About from './components/Pages/About'
import Spinner from './components/Spinner/Spinner';
import { Redirect, Route, Switch } from 'react-router-dom';
import NavMenu from './components/NavMenu'
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import Footer from './components/Footer'

class App extends PureComponent {
  
  componentDidUpdate() {
    const { errorMessage, successMessage } = this.props;
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
    }
  }

  render() {
    const { showSpinner } = this.props;
    return (
      <>
      <NavMenu />
        <div className='app'>
          <Switch>
            <Route path='/' exact component={Todo} />
            <Route path='/task/:id' exact component={SingleTask} />
            <Route path='/about' exact component={About} />
            <Route path='/not-found' exact component={NotFound} />
            <Redirect to='/not-found' />
          </Switch>
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Footer />
        </div>
        {showSpinner && <Spinner />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.error,
    successMessage: state.successMessage,
    showSpinner: state.loading,
  }
}

export default connect(mapStateToProps, null)(App);

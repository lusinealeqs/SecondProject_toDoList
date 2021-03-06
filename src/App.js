import React, { PureComponent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Todo from "./components/Pages/ToDo";
import "./Style/body.css";
import SingleTask from "./components/Pages/SingleTask/SingleTask";
import NotFound from "./components/Pages/NotFound/NotFound";
import About from "./components/Pages/About/About";
import Contact from "./components/Pages/Contact/Contact";
import Spinner from "./components/Spinner/Spinner";
import { Redirect, Route, Switch } from "react-router-dom";
import NavMenu from "./components/NavMenu/NavMenu";
import Register from "./components/Pages/Register/Register";
import Login from "./components/Pages/Login/Login";
import Footer from "./components/Footer/Footer";
import CustomRoute from "./components/CustomRoute";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";

class App extends PureComponent {
    componentDidUpdate() {
        const {
            errorMessage,
            successMessage,
            authErrorMessage,
            authSuccessMessage,
        } = this.props;
        if (errorMessage) {
            toast.error(errorMessage);
        }
        if (successMessage) {
            toast.success(successMessage);
        }
        if (authErrorMessage) {
            toast.error(authErrorMessage);
        }
        if (authSuccessMessage) {
            toast.success(authSuccessMessage);
        }
    }

    render() {
        const { showSpinner, showAuthSpinner } = this.props;
        return (
            <>
                <NavMenu />

                <main>
                    <Switch>
                        <CustomRoute
                            type="private"
                            path="/"
                            exact
                            component={Todo}
                        />
                        <CustomRoute
                            type="private"
                            path="/task/:id"
                            exact
                            component={SingleTask}
                        />
                        <Route path="/about" exact component={About} />
                        <Route path="/contact" exact component={Contact} />
                        <Route path="/not-found" exact component={NotFound} />
                        <CustomRoute
                            path="/register"
                            exact
                            component={Register}
                        />
                        <CustomRoute path="/login" exact component={Login} />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>

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
                {(showSpinner || showAuthSpinner) && <Spinner />}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.taskReducer.error,
        successMessage: state.taskReducer.successMessage,
        authErrorMessage: state.authReducer.error,
        authSuccessMessage: state.authReducer.successMessage,
        showSpinner: state.taskReducer.loading,
        showAuthSpinner: state.authReducer.loading,
    };
};

export default connect(mapStateToProps, null)(App);

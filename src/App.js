import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createMuiTheme';
import AuthRoute from './utils/authRoute';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
// Components
import NavBar from './components/layout/navBar';
import themeFile from './utils/theme';
import jwtDecode from 'jwt-decode';
// Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import axios from 'axios';
import user from './pages/user';



const theme = createTheme(themeFile);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <NavBar />
            <div className="container">

              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={Signup} />
                <Route exact path="/user/:handle" component={user} />
                <Route exact path="/user/:handle/scream/:screamId" component={user} />

              </Switch>
            </div>
          </Router>

        </Provider>

      </MuiThemeProvider>
    );
  }
}

export default App;

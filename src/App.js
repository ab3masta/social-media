import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createMuiTheme';
import AuthRoute from './utils/authRoute';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
// Components
import NavBar from './components/navBar';
import themeFile from './utils/theme';
import jwtDecode from 'jwt-decode';
// Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';



const theme = createTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
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
                <AuthRoute exact path="/login" component={Login} authenticated={authenticated} />
                <AuthRoute exact path="/signup" component={Signup} authenticated={authenticated} />
              </Switch>
            </div>
          </Router>

        </Provider>

      </MuiThemeProvider>
    );
  }
}

export default App;

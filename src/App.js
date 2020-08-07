import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createTheme from '@material-ui/core/styles/createMuiTheme';
// Components
import NavBar from './components/NavBar';
//Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';



const theme = createTheme({
  palette: {
    primary: {
      light: '#33cc9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    },
  },
  typography: {
    useNextvariants: true,
  }
});


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <NavBar />
            <div class="container">

              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

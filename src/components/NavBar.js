import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import PostScream from './PostScream';
// MUI stuff 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MyButtons from '../utils/MyButtons';

//Icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';


class NavBar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar position="fixed">
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                           <PostScream />

                            <Link to="/">
                                <MyButtons tip="Home">
                                    <HomeIcon />
                                </MyButtons>
                            </Link>

                            <MyButtons tip="Notifications">
                                <Notifications />
                            </MyButtons>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/login">
                                    Login
                   </Button>
                                <Button color="inherit" component={Link} to="/">
                                    Home
                   </Button>
                                <Button color="inherit" component={Link} to="/signup">
                                    Signup
                   </Button>
                            </Fragment>
                        )}
                </Toolbar>
            </AppBar>
        )
    }
}

NavBar.propTypes = {
    authenticated: propTypes.bool.isRequired,
};


const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(NavBar);
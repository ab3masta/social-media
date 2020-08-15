import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import axios from 'axios';
import Scream from '../components/scream/scream';
import StaticProfile from '../components/profile/StaticProfile';
//Redux
import { connect } from 'react-redux';

// MUI stuff
import { Dialog, DialogTitle, DialogContent, Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
//Icons
import UnfolMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';

import { Link } from 'react-router-dom';
import { getUserData } from '../redux/actions/dataActions';

export class user extends Component {
    state = {
        profile: null,
        screamIdParam: null
    };
    componentDidMount() {
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;

        if (screamId) {
            this.setState({
                screamIdParam: screamId
            });
        }
        this.props.getUserData(handle);
        axios.get(`/user/${handle}`).then(res => {
            this.setState({
                profile: res.data.user
            });
        }).catch(error => console.log(error));
    }
    render() {
        const { screams, loading } = this.props.data;
        const { screamIdParam } = this.state;

        let screamsMarkup = !loading ? (
            screams === null ? (
                <p>No scream from this user</p>
            ) : !screamIdParam ? (
                screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
            ) : (
                        screams.map((scream) => {
                            
                            if (scream.screamId !== screamIdParam) {
                                return <Scream key={scream.screamsId} scream={scream} />;
                            }else{
                                return <Scream key={scream.screamsId} scream={scream} openDialog />
                            }
                        })
                    )
        ) : (<p> Loading ...</p>);
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (<p> Loading ...</p>) : (
                        <StaticProfile profile={this.state.profile} />
                    )}
                </Grid>
            </Grid>
        );
    }
}

user.propTypes = {
    getUserData: propTypes.func.isRequired,
    data: propTypes.object.isRequired,
}

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);

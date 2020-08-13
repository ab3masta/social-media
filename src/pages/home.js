import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Scream from '../components/scream';
import Profile from '../components/profile';

import propTypes from 'prop-types';


import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class Home extends Component {

    componentDidMount() {
        this.props.getScreams();
    };

    render() {
        const { screams, loading } = this.props.data;
        let recentScreamsMarkup = !loading ? (
            screams.map((scream) => <Scream key={scream.screamsId} scream={scream} />)
        ) : (<p> Loading ...</p>);
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        );
    };
};

Home.propTypes = {
    getScreams: propTypes.func.isRequired,
    data: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data
});
export default connect(mapStateToProps, { getScreams })(Home);
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Scream from '../components/scream';
import Profile from '../components/profile';

class Home extends Component {
    state = {
        screams : null
    }
    componentDidMount() {
        axios.get('/screams').then(res => {
            this.setState({
                screams: res.data
            })
        }).catch(error => console.log(error));
    }
    render() {
        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map(scream => <Scream key={scream.userHandle} scream = {scream} /> )
        ) : <p> Loading ...</p>
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

export default Home
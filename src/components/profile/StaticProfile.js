import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
//Redux
import { connect } from 'react-redux';

// MUI stuff
import { Dialog, DialogTitle, DialogContent, Button, CircularProgress, Grid, Typography, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MuiLink from '@material-ui/core/Link';

//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import CalendarToday from '@material-ui/icons/CalendarToday';

import MyButtons from '../../utils/MyButtons';
import { Link } from 'react-router-dom';
import { getUserData } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%',
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span , svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
    },

});

const StaticProfile = (props) => {
    const { classes, profile: { handle, createAt, imageUrl, bio, website, location } } = props;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image" />


                </div>
                <hr />
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />
                    {location && (
                        <Fragment>
                            <LocationOn color="primary" /> <span>{location}</span>
                            <hr />
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color="primary" />
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                {' '}{website}
                            </a>
                            <hr />
                        </Fragment>
                    )}
                    <CalendarToday color="primary" />{' '} <span>
                        Joined {dayjs(createAt).format('MMM YYYY ')}
                    </span>

                </div>

            </div>
        </Paper>
    );
}

StaticProfile.propTypes = {
    profile: propTypes.object.isRequired,
    classes: propTypes.object.isRequired,
}
export default withStyles(styles)(StaticProfile);

import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import LikeButton from './LikeButton';

//Redux
import { connect } from 'react-redux';
import { getScream } from '../redux/actions/dataActions';

// MUI stuff
import { Dialog, DialogTitle, DialogContent, Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
//Icons
import UnfolMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';

import MyButtons from '../utils/MyButtons';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
    ...theme.spreadThis,
    invisibleSeparator: {
        border: 'none',
        margin: '4px'
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    DialogContent: {
        padding: '20px'
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
});

class ScreamDialog extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getScream(this.props.screamsId);
    }
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes,
            scream: { screamId, body, createAt, likeCount, commentCount, userImage, userHandle },
            UI: { loading } } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
                <Grid container spacing={16}>
                    <Grid item sm={5}>
                        <img src={userImage} alt="Profile" className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={7}>
                        <Typography component={Link} color="primary" variant="h5" to={`/user/${userHandle}`}>
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body1">
                            {body}
                        </Typography>

                        <LikeButton screamsId={screamId} />

                        <span>{likeCount} Likes</span>
                        <MyButtons tip="comments">
                            <ChatIcon color="primary" />
                        </MyButtons>
                        <span>{commentCount} comments</span>

                    </Grid>
                </Grid>
            );
        return (
            <Fragment>
                <MyButtons onClick={this.handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
                    <UnfolMore color="primary" />
                </MyButtons>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButtons tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButtons>
                    <DialogContent className={classes.DialogContent}>
                        {dialogMarkup}
                    </DialogContent>

                </Dialog>
            </Fragment>
        );
    }
};

ScreamDialog.propTypes = {
    getScream: propTypes.func.isRequired,
    screamsId: propTypes.string.isRequired,
    userHandle: propTypes.string.isRequired,
    scream: propTypes.object.isRequired,
    UI: propTypes.object.isRequired,
};

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
});
const mapActionsToProps = {
    getScream
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));


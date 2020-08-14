import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import LikeButton from './LikeButton';
//Redux
import { connect } from 'react-redux';

// MUI stuff
import { Dialog, DialogTitle, DialogContent, Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
//Icons
import UnfolMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';

import MyButtons from '../../utils/MyButtons';
import { Link } from 'react-router-dom';
import { getScream } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    commentImage: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20
    }
});

class Comments extends Component {
    render() {
        const { comments, classes } = this.props;
        return (
            <Grid container>
                {comments.map((comment, index) => {
                    const { body, createAt, userImage, userHandle } = comment;
                    return (
                        <Fragment key={createAt} >
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" className={classes.commentImage} />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
                                                {userHandle}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {dayjs(createAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator} />
                                            <Typography variant="body1"> {body} </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comment.lenght - 1 && (
                                <hr className={classes.visibleSeparator} />
                            )}
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }
};

Comments.propTypes = {
    comments: propTypes.array.isRequired
}

export default withStyles(styles)(Comments);

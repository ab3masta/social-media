import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import propTypes from 'prop-types';
import MyButtons from '../../utils/MyButtons';
import ScreamDialog from './ScreamDialog';
//MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Redux stuff
import { connect } from 'react-redux';


//Icons
import ChatIcon from '@material-ui/icons/Chat';

import DeleteScream from './DeleteScream';
import LikeButton from './LikeButton';


const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
        objectFit: 'cover'

    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}
class Scream extends Component {

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            scream: { body, createAt, userImage, userHandle, screamsId, likeCount, commentCount, screamId },
            user: {
                authenticated,
                credentials: { handle }
            }
        } = this.props;


        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamsId={screamsId} />
        ) : null;
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile image" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/user/${userHandle}`} color="primary">
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createAt).fromNow()}
                    </Typography>

                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton screamsId={screamsId} />
                    <span>{likeCount} Likes</span>
                    <MyButtons tip="comments">
                        <ChatIcon color="primary" />
                    </MyButtons>
                    <span>{commentCount} comments</span>
                    <ScreamDialog screamsId={screamsId == null ? screamId : screamsId} userHandle={userHandle} openDialog={this.props.openDialog} />
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    user: propTypes.object.isRequired,
    scream: propTypes.object.isRequired,
    classes: propTypes.object.isRequired,
    openDialog: propTypes.bool
}
const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
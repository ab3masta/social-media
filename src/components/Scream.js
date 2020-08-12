import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import propTypes from 'prop-types';
import MyButtons from '../utils/MyButtons';

//MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Redux stuff
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

//Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteScream from './DeleteScream';


const styles = {
    card: {
        position:'relative',
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
    likedScream = () => {
        if (this.props.user.likes && this.props.user.likes.find((like) => like.screamId === this.props.scream.screamsId)) {
            return true;
        } else {
            return false;
        }
    };

    likeScream = () => {
        this.props.likeScream(this.props.scream.screamsId);
    };

    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamsId);
    };

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            scream: { body, createAt, userImage, userHandle, screamsId, likeCount, commentCount },
            user: {
                authenticated,
                credentials: { handle }
            }
        } = this.props;

        const likeButton = !authenticated ? (
            <MyButtons tip="Like">
                <Link to='/login'>
                    <FavoriteBorder color="primary" />
                </Link>
            </MyButtons>
        ) : (
                this.likedScream() ? (
                    <MyButtons tip="Undo like" onClick={this.unlikeScream}>
                        <FavoriteIcon color="primary" />
                    </MyButtons>
                ) : (
                        <MyButtons tip="like" onClick={this.likeScream}>
                            <FavoriteBorder color="primary" />
                        </MyButtons>
                    )
            );
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamsId={screamsId}/>
        ) : null;
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile image" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createAt).fromNow()}
                    </Typography>

                    <Typography variant="body1">
                        {body}
                    </Typography>
                    {likeButton}
                    <span>{likeCount} Likes</span>
                    <MyButtons tip="comments">
                        <ChatIcon color="primary" />
                    </MyButtons>
                    <span>{commentCount} comments</span>
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    likeScream: propTypes.func.isRequired,
    unlikeScream: propTypes.func.isRequired,
    user: propTypes.object.isRequired,
    scream: propTypes.object.isRequired,
    classes: propTypes.object.isRequired
}
const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));
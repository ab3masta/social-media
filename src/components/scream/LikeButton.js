import React, { Component } from 'react';
import MyButtons from '../../utils/MyButtons';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
//Icons
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
// redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

class LikeButton extends Component {
    likedScream = () => {
        if (this.props.user.likes && this.props.user.likes.find((like) => like.screamId === this.props.screamsId)) {
            return true;
        } else {
            return false;
        }
    };

    likeScream = () => {
        this.props.likeScream(this.props.screamsId);
    };

    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamsId);
    };

    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to='/login'>
                <MyButtons tip="Like">
                    <FavoriteBorder color="primary" />
                </MyButtons>
            </Link>
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
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: propTypes.object.isRequired,
    screamsId: propTypes.string.isRequired,
    likeScream: propTypes.func.isRequired,
    unlikeScream: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
    user: state.user
})
const mapActionsToProps = {
    likeScream, unlikeScream
}
export default connect(mapStateToProps, mapActionsToProps)(LikeButton);

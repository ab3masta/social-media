import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import LikeButton from './LikeButton';
import Comments from './Comments';

//Redux
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

// MUI stuff
import { Dialog, DialogTitle, DialogContent, Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
//Icons
import UnfolMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';

import MyButtons from '../../utils/MyButtons';
import { Link } from 'react-router-dom';


const styles = (theme) => ({
    ...theme.spreadThis,

});
export class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        };
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                body: '',

            });
        };
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.screamsId, { body: this.state.body });
    }
    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;
        const commentFormMarkUp = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField name="body" type="text" label="Comment on scream" error={errors.body ? true : false}
                        helperText={errors.body} value={this.state.body}
                        onChange={this.handleChange} fullWidth className={classes.textField} />
                    <Button type="submit" variant="contained" color="primary" className={classes.button} >
                        Submit
                    </Button>
                </form>
                <hr className={classes.visibleSeparator} />
            </Grid>
        ) : null;
        return commentFormMarkUp;
    }
}

CommentForm.propTypes = {
    submitComment: propTypes.func.isRequired,
    UI: propTypes.object.isRequired,
    classes: propTypes.object.isRequired,
    screamsId: propTypes.string.isRequired,
    authenticated: propTypes.bool.isRequired,


}
const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
});


export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));

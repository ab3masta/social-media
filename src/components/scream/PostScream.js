import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//Redux
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataActions';

// MUI stuff
import { Dialog, DialogTitle, DialogContent, Button, CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
//Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import MyButtons from '../../utils/MyButtons';

const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: '10px'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
});

class PostScream extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            body: '',
            errors: {}
        };
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', open: false, errors: {} });
        }
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postScream({ body: this.state.body });
    };

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;
        return (
            <Fragment>
                <MyButtons onClick={this.handleOpen} tip="Post a Scream!">
                    <AddIcon />
                </MyButtons>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButtons tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButtons>
                    <DialogTitle>Post a new scream</DialogTitle>
                    <DialogContent>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField id="body" name="body" type="text" label="SCREAM!!" multiline rows="3"
                                placeholder="Scream at your follow" error={errors.body ? true : false}
                                helperText={errors.body} className={classes.textField} onChange={this.handleChange}
                                fullWidth value={this.state.body} />

                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
};

PostScream.propTypes = {
    postScream: propTypes.func.isRequired,
    UI: propTypes.object.isRequired,
    clearErrors: propTypes.func.isRequired,

};

const mapStateToProps = state => ({
    UI: state.UI
});

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream));
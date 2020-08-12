import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import propTypes from 'prop-types';
import MyButtons from '../utils/MyButtons';

//MUI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

//Icon
import DeleteOutline from '@material-ui/icons/DeleteOutline';

//redux
import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';


const styles = {
    deleteButton : {
        position: 'absolute',
        left: '90%',
        top:'10%'
    }

}
class DeleteScream extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    deleteScream = () => {
        this.props.deleteScream(this.props.screamsId)
        this.setState({ open: false });
    };


    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <MyButtons tip="Delete Scream" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary" />
                </MyButtons>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle >
                        Are you sure you want to delete this scream ?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.deleteScream} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}
DeleteScream.propTypes = {
    deleteScream: propTypes.func.isRequired,
    classes: propTypes.object.isRequired,
    screamsId: propTypes.string.isRequired
}
export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream));

import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import propTypes from 'prop-types';
import AppIcon from '../images/icon.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
})


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginUser(userData, this.props.history);

    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="Aboubacar" className={classes.image} />
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email"
                            helperText={errors.email} error={errors.email ? true : false}
                            label="Email" className={classes.textField}
                            value={this.state.email} onChange={this.handleChange} fullWidth />

                        <TextField id="password" name="password" type="password"
                            label="Password" className={classes.textField}
                            helperText={errors.password} error={errors.password ? true : false}
                            value={this.state.password} onChange={this.handleChange} fullWidth />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary"
                            className={classes.button} disabled={loading}> Login {loading && (
                                <CircularProgress className={classes.progress} size={30} />
                            )} </Button>
                        <br />
                        <small>don't have an account ? sign up <Link to="/signup"> here </Link> </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

Login.propTypes = {
    classes: propTypes.object.isRequired,
    loginUser: propTypes.func.isRequired,
    user: propTypes.object.isRequired,
    UI: propTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
};
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));
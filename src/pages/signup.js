import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import propTypes from 'prop-types';
import AppIcon from '../images/icon.jpg';
import { Link } from 'react-router-dom';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
})


class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.password,
            handle: this.state.handle
        };
        this.props.signupUser(newUserData, this.props.history);
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
                        Signup
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

                        <TextField id="confirmPassword" name="confirmPassword" type="password"
                            label="Confirm Password" className={classes.textField}
                            helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword} onChange={this.handleChange} fullWidth />

                        <TextField id="handle" name="handle" type="text"
                            label="Handle" className={classes.textField}
                            helperText={errors.handle} error={errors.handle ? true : false}
                            value={this.state.handle} onChange={this.handleChange} fullWidth />

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary"
                            className={classes.button} disabled={loading}> Signup {loading && (
                                <CircularProgress className={classes.progress} size={30} />
                            )} </Button>
                        <br />
                        <small>Already have an account ? login <Link to="/login"> here </Link> </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

Signup.propTypes = {
    classes: propTypes.object.isRequired,
    signupUser: propTypes.func.isRequired,
    user: propTypes.object.isRequired,
    UI: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    signupUser
};
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));
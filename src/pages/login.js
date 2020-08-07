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


const styles = {
    form: {
        textAlign: 'center',
    },
    image: {
        height: "50px",
        width: "50px",
        margin: " 20px auto 20px auto"
    },
    pageTitle: {
        margin: " 10px auto 10px auto"
    },
    textField: {
        margin: " 10px auto 10px auto"
    },
    button: {
        marginTop: '20px',
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: '10px'
    },
    progress: {
        position: 'absolute'
    }


}


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        axios.post('/login', userData).then((res) => {
            console.log(res.data);
            this.setState({
                loading: false,
            });
            this.props.history.push('/');
        }).catch((error) => {
            this.setState({
                errors: error.response.data,
                loading: false

            });

        });
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
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
                            className={classes.button} disabled = {loading}> Login {loading && (
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
    classes: propTypes.object.isRequired
}

export default withStyles(styles)(Login);
import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import LikeButton from './LikeButton';
import Comments from './Comments';
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

class Comments extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Comments

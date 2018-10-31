import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import UserIcon from '@material-ui/icons/PersonPin';
import Popover from '@material-ui/core/Popover';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChangePassIcon from '@material-ui/icons/VpnKey';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import MangoLogo from './images/mango.png';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {
    setSidebarVisibility,
    AUTH_LOGOUT,
} from 'react-admin';

import authProvider from './authProvider';

const styles = theme => ({
    root: {
        flexGrow: 1,
        color: '#FFF',
        backgroundColor: '#252433',
    },
    button: {
        padding: '5px 5px',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -18,
        marginRight: 10,
    },
    headroomWrapper: {
        height: 48,
    },
    listIcon: {
        margin: 0,
    },
    logo: {
        width: 35,
        marginRight: 10,
        marginLeft: -8,
    }
});

class CustomAppbar extends PureComponent {
    state = {
        anchorEl: null,
    };
    handleUserClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };
    handleUserClose = () => {
        this.setState({
            anchorEl: null,
        });
    };
    handleLogout = () => {
        authProvider(AUTH_LOGOUT, {}).then(() => {
        });
    };
    render() {
        const { handleSidebar, setSidebarVisible, classes, ...props } = this.props;
        const { anchorEl } = this.state;
        const userDetails = sessionStorage.getItem('userDetails');
        let username = '';
        if (userDetails !== null && userDetails !== undefined) {
            username = userDetails !== null && userDetails !== undefined ? userDetails : '';
        }
        const userPopoverOpen = Boolean(anchorEl);
        return (
            <div className={classes.headroomWrapper}>
                <AppBar {...props} className={classes.root}>
                    <Toolbar variant="dense" >
                        <img src={MangoLogo} alt="Mango" className={classes.logo} />
                        {props.location.pathname === '/' ? <Typography variant="title" color="inherit" id="react-admin-title" className={classes.grow}>
                            {'Master Data Management'}
                        </Typography> : <Typography variant="title" color="inherit" className={classes.grow}>
                                <div id="react-admin-title"></div>
                            </Typography>}
                        <Button
                            aria-owns={userPopoverOpen ? 'user-popper' : null}
                            aria-haspopup="true"
                            color="inherit"
                            className={classes.button}
                            onClick={this.handleUserClick}
                        >
                            <Typography color="inherit">Welcome, {username} !</Typography>
                            <UserIcon className={classes.rightIcon} />
                        </Button>
                        <Popover
                            id="user-popper"
                            open={userPopoverOpen}
                            anchorEl={anchorEl}
                            onClose={this.handleUserClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <List component="nav">
                                <ListItem button onClick={this.handleLogout}>
                                    <ListItemIcon className={classes.listIcon}>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </List>
                        </Popover>
                    </Toolbar>
                </AppBar>
            </div >
        );
    }
}

export default connect(
    (state) => ({
        location: state.routing.location,
    }),
    (dispatch) => ({
        setSidebarVisible: bindActionCreators(setSidebarVisibility, dispatch),
    })
)(withStyles(styles)(CustomAppbar));

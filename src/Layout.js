import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
    Notification,
    Sidebar,
    setSidebarVisibility
} from 'react-admin';
import { bindActionCreators } from 'redux';
import CustomAppbar from './CustomAppbar';
import Menu from './Menu/Menu';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        position: 'relative',
    },
    appFrame: {
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'auto',
    },
    contentWithSidebar: {
        display: 'flex',
        flexGrow: 1,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2,
        padding: theme.spacing.unit * 3,
        paddingLeft: 5,
    },
});

class AppLayout extends Component {
    state = {
        openSidebar: true,
    };
    componentWillMount() {
        this.props.setSidebarVisible(true);
    }
    handleSidebar = (status) => {
        if (this.state.openSidebar !== status) {
            this.setState({
                openSidebar: status,
            });
        }
    };

    render() {
        const {
            children,
            classes,
            dashboard,
            isLoading,
            setSidebarVisible,
            ...props,
        } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <CustomAppbar {...props} />
                    <main className={classes.contentWithSidebar}>
                        <Sidebar className={classes.sidebar}>
                            <Menu open={this.state.openSidebar} handleSidebar={this.handleSidebar} />
                        </Sidebar>
                        <div className={classes.content}>
                            {children}
                        </div>
                    </main>
                    <Notification />
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        setSidebarVisible: bindActionCreators(setSidebarVisibility, dispatch),
    })
)(withStyles(styles)(AppLayout));


/* eslint react/jsx-key: off */
import React from 'react';
import PropTypes from 'prop-types';
import { Show, SimpleShowLayout, TextField, translate, CardActions } from 'react-admin'; // eslint-disable-line import/no-unresolved
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

const styles = theme => ({
    button: {
        color: '#3f51b5 !important',
        '&:hover': {
            backgroundColor: 'rgba(63, 81, 181, 0.08) !important',
        },
    },
    channelInput: {
        color: '#333 !important',
    },
    icon: {
        marginRight: 5,
    },
});

const UserTitle = translate(({ record, translate }) => (
    <span>
        {record ? translate('region.edit.title', { title: record.name }) : ''}
    </span>
));

const getRedirectPath = () => {
    let path = '/regions';
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser !== null && currentUser !== undefined) {
        if (currentUser.redirectPath !== null && currentUser.redirectPath !== undefined && currentUser.redirectPath !== '') {
            path = currentUser.redirectPath;
        }
    }
    return path;
}

const UserShowActions = ({ redirect, classes, basePath, data, resource }) => (
    <CardActions>
        <Button className={classes.button} onClick={() => redirect(`${encodeURI(getRedirectPath())}`)}>
            <ListIcon className={classes.icon} />{'List'}
        </Button>
        <Button className={classes.button} onClick={() => redirect(`${basePath}/${data.id}`)}>
            <EditIcon className={classes.icon} />{'Edit'}
        </Button>
    </CardActions>
);

const UserShow = ({ redirect, classes, ...props }) => (
    <div>
        <Show actions={<UserShowActions classes={classes} redirect={redirect} regionId={props.match.params} />} title={<UserTitle />} {...props}>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="code" />
                <TextField source="description" />
            </SimpleShowLayout>
        </Show>
    </div>
);

UserShow.propTypes = {
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

export default connect(
    null,
    (dispatch) => ({
        redirect: bindActionCreators(push, dispatch),
    })
)(withStyles(styles)(UserShow));

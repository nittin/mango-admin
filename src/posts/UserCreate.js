/* eslint react/jsx-key: off */
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListIcon from '@material-ui/icons/List';
import {
    Create,
    SaveButton,
    SimpleForm,
    TextInput,
    ReferenceInput,
    AutocompleteInput,
    Toolbar,
    required,
    CardActions,
} from 'react-admin';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { change } from 'redux-form';

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

const getRedirectPath = () => {
    let path = '/regions';
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser !== null && currentUser !== undefined) {
        if (currentUser.redirectPath !== null && currentUser.redirectPath !== undefined && currentUser.redirectPath !== '') {
            path = currentUser.redirectPath;
        }
    }
    return path;
};

const UserCreateActions = ({ redirect, classes, basePath, data, resource }) => (
    <CardActions>
        <Button className={classes.button} onClick={() => redirect(encodeURI(getRedirectPath()))}>
            <ListIcon className={classes.icon} />{'List'}
        </Button>
    </CardActions>
);

const UserCreateToolbar = ({ ...props }) => (
    <Toolbar {...props}>
        <SaveButton
            label="app.action.save_and_show"
            redirect="show"
            submitOnEnter={true}
        />
        <SaveButton
            label="app.action.save"
            redirect={false}
            submitOnEnter={false}
            variant="flat"
        />
    </Toolbar>
);

class UserCreate extends PureComponent {
    state = {
    };
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

    }
    render() {
        const { regionData, changeForm, recordForm, classes, redirect, ...props } = this.props;
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        let isChannelView = false;
        if (recordForm !== undefined && recordForm !== null) {
            if (recordForm.values !== undefined && recordForm.values !== null) {
                const { parentId } = recordForm.values;
                isChannelView = parentId !== undefined && parentId !== null && parentId !== '';
            }
        }
        return (
            <div>
                <Create actions={<UserCreateActions classes={classes} redirect={redirect} />} {...props}>
                    <SimpleForm
                        toolbar={<UserCreateToolbar />}
                    >
                        <TextInput label="Channel" source="channelCode" disabled />
                        <TextInput fullWidth source="name" validate={[required()]} />
                        <TextInput fullWidth source="code" validate={[required()]} />
                        <TextInput fullWidth source="description" />
                    </SimpleForm>
                </Create>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        recordForm: state.form['record-form'],
        regionData: state.admin.resources.regions.data,
    }),
    (dispatch) => ({
        redirect: bindActionCreators(push, dispatch),
        changeForm: bindActionCreators(change, dispatch),
    })
)(withStyles(styles)(UserCreate));

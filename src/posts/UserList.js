/* eslint react/jsx-key: off */
import PeopleIcon from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { parse } from 'query-string';
import { withStyles } from '@material-ui/core/styles';
import {
    Datagrid,
    EditButton,
    Filter,
    List,
    Responsive,
    ShowButton,
    SimpleList,
    TextField,
    TextInput,
    GET_LIST,
    ReferenceInput,
    AutocompleteInput,
} from 'react-admin';
import { bindActionCreators } from 'redux';
import dataProvider from '../dataProvider';
import { USER_CLEAR_STATE, USER_CHANGE_CURRENT_DATA } from './userActions';

const styles = theme => ({

});

class UserList extends PureComponent {
    componentWillMount() {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('regionBreadcrum');
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
            type: USER_CLEAR_STATE,
        });
    }

    render() {
        const { classes, dispatch, ...props } = this.props;
        return (
            <List
                {...props}
                sort={{ field: 'id', order: 'ASC' }}
            >
                <Responsive
                    small={
                        <SimpleList
                            primaryText={record => record.id}
                            secondaryText={record =>
                                record.name
                            }
                        />
                    }
                    medium={
                        <Datagrid hover={false}>
                            <TextField source="id" />
                            <TextField source="name" />
                            <EditButton />
                            <ShowButton />
                        </Datagrid>
                    }
                />
            </List>
        );
    }
}

export default connect(
    (state) => ({
        currentUser: state.regioninfo.currentUser,
        regionParams: state.admin.resources.regions.list.params,
    }),
    (dispatch) => ({
        redirect: bindActionCreators(push, dispatch),
        dispatch: dispatch,
    })
)(withStyles(styles)(UserList));

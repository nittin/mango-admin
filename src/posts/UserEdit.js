/* eslint react/jsx-key: off */
import React from 'react';
import PropTypes from 'prop-types';
import {
    Edit,
    SimpleForm,
    DisabledInput,
    TextInput,
    required,
    CardActions,
    ListButton,
    ShowButton,
    RefreshButton,
    translate,
    DeleteButton,
} from 'react-admin';

const UserTitle = translate(({ record, translate }) => (
    <span>
        {record ? translate('region.edit.title', { title: record.name }) : ''}
    </span>
));

const UserEditActions = ({ basePath, data, resource }) => (
    <CardActions>
        <UserTitle />
        <ShowButton basePath={basePath} record={data} />
        <ListButton basePath={basePath} />
        <RefreshButton />
        <DeleteButton basePath={basePath} record={data} resource={resource} />
    </CardActions>
);

const UserEdit = (props) => (
    <div>
        <Edit actions={<UserEditActions />} {...props}>
            <SimpleForm >
                <DisabledInput source="id" />
                <TextInput fullWidth source="name" validate={[required()]} />
                <TextInput fullWidth source="description" />
            </SimpleForm>
        </Edit>
    </div>
);

UserEdit.propTypes = {
    id: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

export default UserEdit;

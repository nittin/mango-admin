import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import RoleIcon from '@material-ui/icons/VerifiedUser';
import AppIcon from '@material-ui/icons/Apps';
import PermissionIcon from '@material-ui/icons/Assistant';
import ChannelIcon from '@material-ui/icons/Comment';
import TitleIcon from '@material-ui/icons/Gesture';
import PositionIcon from '@material-ui/icons/Weekend';
import ProducerIcon from '@material-ui/icons/PersonPin';
import UserIcon from '@material-ui/icons/Public';
import IconButton from '@material-ui/core/IconButton';
import CloseArrowIcon from '@material-ui/icons/ArrowBack';
import OpenArrowIcon from '@material-ui/icons/ArrowForward';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UserProducerIcon from '@material-ui/icons/PermContactCalendar';
import CodeMasterIcon from '@material-ui/icons/Widgets';
import CodeDetailIcon from '@material-ui/icons/Storage';
import CategoriesIcon from '@material-ui/icons/Assignment';
import ArticleIcon from '@material-ui/icons/Description';
import OfficeIcon from '@material-ui/icons/Business';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FolderIcon from '@material-ui/icons/Folder';
import TreeIcon from '@material-ui/icons/DeviceHub';
import AuthorIcon from '@material-ui/icons/FolderShared';
import MiscIcon from '@material-ui/icons/Work';

import {
    setSidebarVisibility,
} from 'react-admin';

import {
    translate,
    MenuItemLink,
    Responsive,
} from 'react-admin';
import { withRouter } from 'react-router-dom';

import ExpandPanel from './ExpandPanel';

const itemGroups = [
    { id: 0, name: 'NONE_TOP', icon: <FolderIcon /> },
    { id: 1, name: 'Hierarchy', icon: <TreeIcon /> },
    { id: 2, name: 'Authorization', icon: <AuthorIcon /> },
    { id: 3, name: 'Documents', icon: <FolderIcon /> },
    { id: 4, name: 'MISC', icon: <MiscIcon /> },
];

const items = [
    // Map.
    { name: 'positions', icon: <PositionIcon />, groupId: 1 },
    { name: 'offices', icon: <OfficeIcon />, groupId: 1 },
    { name: 'regions', icon: <UserIcon />, groupId: 1 },
    { name: 'titles', icon: <TitleIcon />, groupId: 1 },
    { name: 'producers', icon: <ProducerIcon />, groupId: 1 },
    { name: 'article-categories', icon: <CategoriesIcon />, groupId: 1 },
    { name: 'articles', icon: <ArticleIcon />, groupId: 1 },

    // Authorization.
    { name: 'apps', icon: <AppIcon />, groupId: 2 },
    { name: 'users', icon: <PersonIcon />, groupId: 2 },
    { name: 'roles', icon: <RoleIcon />, groupId: 2 },
    { name: 'permissions', icon: <PermissionIcon />, groupId: 2 },

];

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
    menuButton: {
        display: 'flex',
        justifyContent: 'center',
    },
    primary: {
        padding: '0 3px',
        opacity: 0.7,
    }
};
class Menu extends PureComponent {
    constructor(props) {
        super(props);
        const menuTemps = [];
        itemGroups.forEach((element) => {
            const itempTemps = items.filter((itemp) => itemp.groupId === element.id);
            menuTemps.push({ ...element, items: itempTemps });
        });
        this.state = {
            menuItems: menuTemps,
        };
    }

    render() {
        const { setSidebarVisible, open, handleSidebar, onMenuClick, translate } = this.props;
        let csTemp = {};

        return (
            <div style={styles.main}>
                <MenuItemLink
                    to="/"
                    primaryText={translate('pos.dashboard')}
                    leftIcon={<DashboardIcon />}
                    onClick={onMenuClick}
                />

                {
                    this.state.menuItems.map((group) => {
                        if (group.id === 0) {
                            return group.items.map((item) => (
                                <MenuItemLink
                                    key={item.name}
                                    to={`/${item.name}`}
                                    primaryText={translate(`resources.${item.name}.name`, {
                                        smart_count: 2,
                                    })}
                                    leftIcon={item.icon}
                                    onClick={onMenuClick}
                                />
                            ));
                        }
                        return (
                            <ExpandPanel key={group.id} icon={group.icon} title={group.name} menuOpen={open}>
                                {
                                    group.items.map((item) => {
                                        return (
                                            <div key={item.name}>
                                                <MenuItemLink
                                                    to={`/${item.name}`}
                                                    primaryText={translate(`resources.${item.name}.name`, {
                                                        smart_count: 2,
                                                    })}
                                                    leftIcon={item.icon}
                                                    onClick={onMenuClick}
                                                />
                                            </div>
                                        );
                                    })
                                }
                            </ExpandPanel>
                        );
                    })
                }
                <MenuItemLink
                    to="/configuration"
                    primaryText={translate('pos.configuration')}
                    leftIcon={<SettingsIcon />}
                    onClick={onMenuClick}
                />
                <MenuItem
                    onClick={() => {
                        handleSidebar(!open);
                        setSidebarVisible(!open);
                    }}
                >
                    <ListItemIcon>
                        {open ? <CloseArrowIcon /> : <OpenArrowIcon />}
                    </ListItemIcon>
                    <ListItemText style={styles.primary} inset primary={translate('pos.collapse')} />
                </MenuItem>

            </div>
        );
    }
}

const enhance = compose(
    withRouter,
    connect(
        state => ({
            locale: state.i18n.locale,
        }),
        dispatch => ({
            setSidebarVisible: bindActionCreators(setSidebarVisibility, dispatch),
        })
    ),
    translate
);

export default enhance(Menu);

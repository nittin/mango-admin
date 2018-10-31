import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    root: {
        width: '100%',
    },
    panelContainer: {
        boxShadow: 'none',
        background: 'transparent',
        color: 'rgba(0, 0, 0, 0.54)',

    },
    panelSummary: {
        padding: '0px 16px',
        height: '52px !important',
        minHeight: '0px !important',
        '&:hover': {
            background: 'rgba(0, 0, 0, 0.08)',
        },
    },
    panelDetails: {
        display: 'block',
        padding: '0px 16px',
    },
    panelDetailsSmall: {
        display: 'block',
        padding: 0,
    },
    summaryIcon: {
        paddingRight: '1.2em',
        textOverflow: 'ellipsis',
    },
    summaryIconSmall: {
        padding: '0 !important',
    },
    expandIconSmall: {
        right: '0px !important',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        color: 'rgba(0, 0, 0, 0.54)',
    },
});

class ExpandPanel extends Component {
    render() {
        const { classes, title, children, icon, menuOpen } = this.props;
        return (
            <div className={classes.root}>
                <ExpansionPanel className={classes.panelContainer}>
                    {menuOpen ? (
                        <ExpansionPanelSummary className={classes.panelSummary} expandIcon={<ExpandMoreIcon />}>
                            <div className={classes.summaryIcon}>{icon}</div>
                            <Typography className={classes.heading}>{title}</Typography>
                        </ExpansionPanelSummary>
                    ) : (<ExpansionPanelSummary className={classes.panelSummary}>
                        <div className={classes.summaryIconSmall}>{icon}</div>
                    </ExpansionPanelSummary>)}
                    <ExpansionPanelDetails className={menuOpen ? classes.panelDetails : classes.panelDetailsSmall}>
                        {children}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(styles)(ExpandPanel);

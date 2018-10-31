import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { translate, changeLocale, Title } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';

const styles = {
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
};

const Configuration = ({
    classes,
    locale,
    changeLocale,
    translate,
}) => (
    <Card>
        <Title title={translate('pos.configuration')} />
        <CardContent>
            <div className={classes.label}>{translate('pos.language')}</div>
            <Button
                variant="raised"
                className={classes.button}
                color={locale === 'en' ? 'primary' : 'default'}
                onClick={() => changeLocale('en')}
            >
                English
            </Button>
            <Button
                variant="raised"
                className={classes.button}
                color={locale === 'vi' ? 'primary' : 'default'}
                onClick={() => changeLocale('vi')}
            >
                Tiếng Việt
            </Button>
        </CardContent>
    </Card>
);

const mapStateToProps = state => ({
    locale: state.i18n.locale,
});

export default compose(
    connect(
        mapStateToProps,
        {
            changeLocale,
        }
    ),
    translate,
    withStyles(styles)
)(Configuration);

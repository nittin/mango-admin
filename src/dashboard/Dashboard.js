import React, { PureComponent } from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

class Dashboard extends PureComponent {
    render() {
        return (
            <Grid container spacing={16} justify="center">
                <Grid item sm={12}>
                    <Card>
                        <CardHeader title={`Welcome ${sessionStorage.getItem('userDetails')}!`} />
                    </Card>
                </Grid>
            </Grid>
        );
    }
}
  
export default Dashboard;

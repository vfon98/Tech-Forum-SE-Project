import React, { Component } from 'react';
import { Grid, withStyles } from '@material-ui/core';

import Layout from '../Layout/Layout';
import UsersTable from './UsersTable';
import BannedUsers from './BannedUsers';

const wrapperStyles = {
  '@media (max-width: 960px)': {
    wrapper: {
      display: 'flex',
    },
    normalUsers: {
      order: 2,
      '@media (min-width: 600px)': {
        marginTop: '16px',
      }
    },
    bannedUsers: {
      order: 1,
    },
  },
};

class UsersManager extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <Grid container className={classes.wrapper}>
          <Grid item xs={12} md={8} lg={9} className={classes.normalUsers}>
            <UsersTable />
          </Grid>
          <Grid item xs={12} md={4} lg={3} className={classes.bannedUsers}>
            <BannedUsers />
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default withStyles(wrapperStyles)(UsersManager);

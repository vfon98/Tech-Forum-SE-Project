import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import Layout from '../Layout/Layout';
import UsersTable from './UsersTable';
import BannedUsers from './BannedUsers';

class UsersManager extends Component {
  render() {
    return (
      <Layout>
        <Grid container>
          <Grid item sm={9}>
            <UsersTable />
          </Grid>
          <Grid item sm={3}>
            <BannedUsers />
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default UsersManager;

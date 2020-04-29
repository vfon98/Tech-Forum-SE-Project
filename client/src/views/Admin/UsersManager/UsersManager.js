import React, { Component } from 'react';
import Layout from '../Layout/Layout';
import UsersTable from './UsersTable';
import { Grid, Table } from '@material-ui/core';
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

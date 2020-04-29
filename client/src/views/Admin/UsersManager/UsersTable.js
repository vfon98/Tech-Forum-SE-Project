import React, { Component } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Box,
  TableBody,
  Avatar,
  IconButton,
  Tooltip,
  Typography,
  Divider,
  InputBase,
} from '@material-ui/core';
import { parseLongDateFrom } from 'utils/converter';
import { LockTwoTone, DirectionsTwoTone, Search } from '@material-ui/icons';
import axios from 'axios/instance';

import { withStyles } from '@material-ui/styles';
import { textColor } from 'assets/jss/main';
import usersTableStyles from 'assets/jss/admin/usersTableStyles';

const StyledCell = withStyles({
  root: {
    background: '#27293D',
    color: textColor,
    borderColor: '#3D3F51',
    whiteSpace: 'nowrap',
    cursor: 'default',
  },
})(TableCell);

const UserRow = props => {
  const { classes } = props;
  return (
    <TableRow>
      {/* <StyledCell padding='checkbox'>{props.no + 1}</StyledCell> */}
      <StyledCell>
        <Box className={classes.username} display='flex' alignItems='center'>
          <Avatar className={classes.avatar} src={props.avatar} alt={props.name} />
          {props.name}
        </Box>
      </StyledCell>
      <StyledCell padding='none'>{props.email || 'unknown'}</StyledCell>
      <StyledCell>
        {props.loginMethod === 'fb' ? 'Facebook' : 'Email'}
      </StyledCell>
      <StyledCell padding='none'>
        {parseLongDateFrom(props.createdAt)}
      </StyledCell>
      <StyledCell padding='none' align='center'>
        <Box>
          <IconButton color='inherit' size='small'>
            <Tooltip title='Ban this account' placement='top' arrow>
              <LockTwoTone fontSize='small' color='error' />
            </Tooltip>
          </IconButton>
          <IconButton color='inherit' size='small'>
            <Tooltip title='View profile' placement='top' arrow>
              <DirectionsTwoTone
                fontSize='small'
                className={classes.viewIcon}
              />
            </Tooltip>
          </IconButton>
        </Box>
      </StyledCell>
    </TableRow>
  );
};

class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      originalArray: [],
    };
  }

  componentDidMount() {
    axios
      .get('/admin/users')
      .then(res => {
        this.setState({
          users: res.data.users,
          originalArray: res.data.users,
        });
      })
      .catch(err => console.log(err));
  }

  handleSearch = e => {
    const keyword = e.target.value;
    this.setState({
      users: this.filterByKeyword(keyword),
    });
  };

  filterByKeyword = keyword => {
    const { originalArray } = this.state;
    return originalArray.filter(
      item =>
        item.display_name.includes(keyword) ||
        (item.email && item.email.includes(keyword))
    );
  };

  render() {
    const { users } = this.state;
    const { classes } = this.props;

    return (
      <Box mx={2}>
        <Paper className={classes.table}>
          <TableContainer>
            <Box className={classes.tableWrapper} >
              <Typography className={classes.tableTitle}>
                Current active users
              </Typography>
              {/* <TextField variant='outlined' size='small'/> */}
              <Box>
                <InputBase
                  className={classes.searchInput}
                  placeholder='Search by name or email'
                  onKeyUp={this.handleSearch}
                />
                <IconButton color='inherit' className={classes.iconButton}>
                  <Search />
                </IconButton>
              </Box>
            </Box>
            <Divider className={classes.divider} />
            <Table size='small'>
              <TableHead>
                <TableRow>
                  {/* <StyledCell padding='checkbox'>#</StyledCell> */}
                  <StyledCell>Name</StyledCell>
                  <StyledCell padding='none'>Email</StyledCell>
                  <StyledCell>Method</StyledCell>
                  <StyledCell padding='none'>Created at</StyledCell>
                  <StyledCell padding='none' align='center'>
                    Action
                  </StyledCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length ? (
                  users.map((user, index) => (
                    <UserRow
                      key={user._id}
                      classes={classes}
                      no={index}
                      name={user.display_name}
                      avatar={user.avatar}
                      email={user.email}
                      loginMethod={user.login_method}
                      createdAt={user.created_at}
                    />
                  ))
                ) : (
                  <TableRow>
                    <StyledCell className={classes.emptyRow} colSpan={5}>
                      Empty data
                    </StyledCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    );
  }
}

export default withStyles(usersTableStyles)(UsersTable);

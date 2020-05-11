import React, { Component, useState } from 'react';
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
import { Link } from 'react-router-dom';
import axios from 'axios/instance';

import { withStyles } from '@material-ui/styles';
import { textColor } from 'assets/jss/main';
import usersTableStyles from 'assets/jss/admin/usersTableStyles';
import BanUserPopup from './BanUserPopup';

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
  const { classes, user } = props;
  const [openPopup, setOpenPopup] = useState(false);
  const togglePopup = () => {
    setOpenPopup(!openPopup);
  };

  return (
    <TableRow>
      {/* <StyledCell padding='checkbox'>{props.no + 1}</StyledCell> */}
      <StyledCell>
        <Box className={classes.username}>
          <Avatar
            className={classes.avatar}
            src={user.avatar}
            alt={user.display_name}
          />
          {user.display_name}
        </Box>
      </StyledCell>
      <StyledCell padding='none'>{user.email || 'unknown'}</StyledCell>
      <StyledCell>
        {user.login_method === 'fb' ? 'Facebook' : 'Email'}
      </StyledCell>
      <StyledCell padding='none'>
        {parseLongDateFrom(user.created_at)}
      </StyledCell>
      <StyledCell padding='none' align='center'>
        <Box>
          <Tooltip title='Ban this account' placement='top' arrow>
            <IconButton color='inherit' size='small' onClick={togglePopup}>
              <LockTwoTone fontSize='small' color='error' />
            </IconButton>
          </Tooltip>
          <Tooltip title='View profile' placement='top' arrow>
            <IconButton
              color='inherit'
              size='small'
              component={Link}
              to={`/profile/${user._id}`}
            >
              <DirectionsTwoTone
                fontSize='small'
                className={classes.viewIcon}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </StyledCell>
      <BanUserPopup isOpen={openPopup} onClose={togglePopup} user={user} />
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
    window.fetchUsers = this.fetchUsers.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
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
      <Box className={classes.tableWrapper}>
        <Paper className={classes.table}>
          <TableContainer>
            <Box className={classes.titleWrapper}>
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
                      user={user}
                      openPopup={this.togglePopup}
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

import React, { Component } from 'react';
import Layout from '../Layout/Layout';
import {
  Paper,
  Box,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Button,
  Divider,
} from '@material-ui/core';
import RoomRow from './RoomRow';
import axios from 'axios/instance';

import { withStyles } from '@material-ui/styles';
import usersTableStyles from 'assets/jss/admin/usersTableStyles';
import { textColor } from 'assets/jss/main';
import { AddToQueue } from '@material-ui/icons';
import AddRoomPopup from './AddRoomPopup';

const StyledCell = withStyles({
  root: {
    background: '#27293D',
    color: textColor,
    borderColor: '#3D3F51',
    whiteSpace: 'nowrap',
    cursor: 'default',
  },
})(TableCell);

class RoomsManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      openPopup: false,
    };
    window.fetchRooms = this.fetchRooms.bind(this);
  }

  componentDidMount() {
    this.fetchRooms();
  }

  fetchRooms = () => {
    axios.get('/admin/rooms').then(res => {
      this.setState({
        rooms: res.data.rooms,
      });
    });
  };

  togglePopup = () => {
    this.setState({
      openPopup: !this.state.openPopup,
    });
  };

  render() {
    const { classes } = this.props;
    const { rooms, openPopup } = this.state;

    return (
      <Layout>
        <Box className={classes.tableWrapper}>
          <Paper className={classes.table}>
            <Button
              variant='extended'
              size='small'
              startIcon={<AddToQueue />}
              className={classes.addButton}
              onClick={this.togglePopup}
            >
              Create a new room
            </Button>
            <AddRoomPopup open={openPopup} onClose={this.togglePopup} />
            <Divider />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledCell>#</StyledCell>
                    <StyledCell>Thumbnail</StyledCell>
                    <StyledCell>Room name</StyledCell>
                    <StyledCell align='center'>Total Posts</StyledCell>
                    <StyledCell align='center'>Total News</StyledCell>
                    <StyledCell align='center'>Status</StyledCell>
                    <StyledCell>Created at</StyledCell>
                    <StyledCell align='center'>Actions</StyledCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rooms.map((room, index) => (
                    <RoomRow
                      key={room.id}
                      index={index}
                      classes={classes}
                      room={room}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Layout>
    );
  }
}

export default withStyles(usersTableStyles)(RoomsManager);

import React, { Component, useState } from 'react';
import {
  TableCell,
  TableRow,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { parseLongDateFrom } from 'utils/converter';
import { Link } from 'react-router-dom';
import axios from 'axios/instance';

import { textColor } from 'assets/jss/main';
import { withStyles } from '@material-ui/styles';
import {
  DirectionsTwoTone,
  VisibilityTwoTone,
  VisibilityOffTwoTone,
} from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import ConfirmPopup from 'components/ConfirmPopup';

const StyledCell = withStyles({
  root: {
    background: '#27293D',
    color: textColor,
    borderColor: '#3D3F51',
    whiteSpace: 'nowrap',
    cursor: 'default',
  },
})(TableCell);

const ActiveButton = props => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const togglePopup = () => setOpenConfirm(!openConfirm);
  const handleClose = option => {
    togglePopup();
    if (option === 'yes') {
      // Active room
      axios
        .post('/rooms/active', { roomId: props.roomId })
        .then(() => {
          window.fetchRooms();
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <>
      <Tooltip title='Active this room' arrow placement='top'>
        <IconButton size='small' onClick={togglePopup}>
          <VisibilityTwoTone style={{ color: green[400] }} fontSize='small' />
        </IconButton>
      </Tooltip>
      <ConfirmPopup isOpen={openConfirm} handleClose={handleClose} />
    </>
  );
};

const HiddenButton = props => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const togglePopup = () => setOpenConfirm(!openConfirm);
  const handleClose = option => {
    togglePopup();
    if (option === 'yes') {
      // code goes here
      axios
        .post('/rooms/hide', { roomId: props.roomId })
        .then(() => {
          window.fetchRooms();
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <>
      <Tooltip title='Hide this room' arrow placement='top'>
        <IconButton size='small' onClick={togglePopup}>
          <VisibilityOffTwoTone color='error' fontSize='small' />
        </IconButton>
      </Tooltip>
      <ConfirmPopup isOpen={openConfirm} handleClose={handleClose} />
    </>
  );
};

class RoomRow extends Component {
  render() {
    const { classes, room, index } = this.props;
    return (
      <TableRow>
        <StyledCell>{index + 1}</StyledCell>
        <StyledCell className={classes.imageCell}>
          <img src={room.image} alt={room.name} style={{ maxWidth: '100%' }} />
        </StyledCell>
        <StyledCell variant='head'>{room.name}</StyledCell>
        <StyledCell align='center'>{room.total_posts}</StyledCell>
        <StyledCell align='center'>{room.total_news}</StyledCell>
        <StyledCell align='center'>
          {room.hidden ? (
            <Typography className={classes.hiddenText}>Hidden</Typography>
          ) : (
            <Typography className={classes.activeText}>Active</Typography>
          )}
        </StyledCell>
        <StyledCell>{parseLongDateFrom(room.created_at)}</StyledCell>
        <StyledCell align='center'>
          {room.hidden ? (
            <ActiveButton roomId={room.id} />
          ) : (
            <HiddenButton roomId={room.id} />
          )}
          <Tooltip title='Visit this room' arrow placement='top'>
            <IconButton size='small' component={Link} to={`/room/${room.name}`}>
              <DirectionsTwoTone
                className={classes.navigateButton}
                fontSize='small'
              />
            </IconButton>
          </Tooltip>
        </StyledCell>
      </TableRow>
    );
  }
}

export default RoomRow;

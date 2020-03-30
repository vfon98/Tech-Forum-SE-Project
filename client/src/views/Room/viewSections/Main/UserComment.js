import React, { Component, useState } from 'react';
import {
  Grid,
  Avatar,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import { getIdentifier } from '../../../../utils/userIdentifier';
import { timeFrom } from '../../../../utils/converter';
import { getUser } from '../../../../utils/session';

import { withStyles } from '@material-ui/styles';
import roomStyles from 'assets/jss/roomStyles';
import {
  FlagTwoTone,
  VerifiedUserTwoTone,
  MoreVert,
  Edit,
  DeleteForever,
} from '@material-ui/icons';
import ConfirmPopup from '../../../../components/ConfirmPopup';

const OwnerIcon = props => {
  const { classes } = props;
  return (
    <Tooltip title='Post owner' arrow interactive placement='left-end'>
      <FlagTwoTone fontSize='small' className={classes.commentOwnerIcon} />
    </Tooltip>
  );
};

const AdminIcon = props => {
  const { classes } = props;
  return (
    <Tooltip title='Administrator' arrow interactive placement='left-end'>
      <VerifiedUserTwoTone
        fontSize='small'
        className={classes.commentAdminIcon}
      />
    </Tooltip>
  );
};

const OptionPanel = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const { classes } = props;

  const handleCloseConfirm = option => {
    setIsOpenConfirm(false);
    // Option got 'yes' or 'no'
    if (option === 'yes') {
      props.handleDeleteComment();
    }
  };

  const handleClickDelete = () => {
    setIsOpenConfirm(true);
  };

  const handleClickUpdate = () => {
    props.handleUpdateComment();
  };

  return (
    <Box component='span' className={classes.moreIcon}>
      <Tooltip
        open={isOpen}
        onClose={() => setIsOpen(false)}
        disableTouchListener
        disableHoverListener
        title={
          <ButtonGroup variant='text'>
            <Button
              className={classes.btnLink}
              size='small'
              color='inherit'
              startIcon={<Edit />}
              onClick={handleClickUpdate}
            >
              Update
            </Button>
            <Button
              className={classes.btnLink}
              size='small'
              color='inherit'
              startIcon={<DeleteForever />}
              onClick={handleClickDelete}
            >
              Delete
            </Button>
          </ButtonGroup>
        }
        arrow
        interactive
      >
        <IconButton
          color='inherit'
          size='small'
          onClick={() => setIsOpen(!isOpen)}
        >
          <MoreVert />
        </IconButton>
      </Tooltip>
      <ConfirmPopup isOpen={isOpenConfirm} handleClose={handleCloseConfirm} />
    </Box>
  );
};

// MAIN CLASS
class UserComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenOption: false,
    };
  }

  isOwnComment = () => {
    const { comment } = this.props;
    const user = getUser();
    return user && comment.user_id === user._id;
  };

  render() {
    const { classes } = this.props;
    const { comment, isOwner, isAdmin } = this.props;

    return (
      <Grid container className={classes.commentContainer}>
        <Grid container sm={1} justify='center'>
          <Avatar
            src={comment && comment.user.avatar}
            alt={comment && comment.user.display_name}
          />
        </Grid>
        <Grid item sm={11}>
          <Box className={classes.comment}>
            <Typography>
              <strong className={classes.userName}>
                {comment ? comment.user.display_name : 'Display name'}
              </strong>
              <small className={classes.secondaryText}>
                {comment ? getIdentifier(comment.user.email) : '@example'}
              </small>
              {/* Show comment options unless the owner */}
              {this.isOwnComment() && (
                <OptionPanel
                  classes={classes}
                  // Pass to parent
                  handleUpdateComment={() => this.props.onUpdateComment(comment)}
                  handleDeleteComment={() => this.props.onDeleteComment(comment.id)}
                />
              )}
              {/*  */}
              <Box
                display='flex'
                alignItems='center'
                className={classes.timeText}
              >
                {/* Add icon if owner's comment */}
                {isOwner && <OwnerIcon classes={classes} />}
                {isAdmin && <AdminIcon classes={classes} />}
                <Box>
                  {comment ? timeFrom(comment.created_at) : 'long time ago'}
                </Box>
              </Box>
              <Typography className={classes.commentContent}>
                {comment && comment.content}
              </Typography>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(roomStyles)(UserComment);

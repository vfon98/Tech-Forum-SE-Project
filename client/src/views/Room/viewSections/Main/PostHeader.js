import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  CardHeader,
  Avatar,
  Box,
  Typography,
  IconButton,
} from '@material-ui/core';
import { AccessTimeTwoTone, MoreVert } from '@material-ui/icons';
import { getIdentifier } from '../../../../utils/userIdentifier';
import { timeFrom } from '../../../../utils/converter';

import { withStyles } from '@material-ui/styles';
import roomStyles from 'assets/jss/roomStyles';

import PostOptions from './PostOptions';

class PostHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverAnchor: null,
    };
  }

  togglePostOptions = e => {
    this.setState({
      popoverAnchor: e.currentTarget,
    });
  };

  handleClosePopover = () => {
    this.setState({
      popoverAnchor: null,
    });
  };

  render() {
    const { classes, post } = this.props;
    return (
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar
            component={Link}
            to={`/wall/${post.user.id}`}
            className={classes.avatarLg}
            src={post && post.user.avatar}
            alt={post && post.user.display_name}
          >
            Ex
          </Avatar>
        }
        title={
          <Box verticalAlign='middle'>
            <Link to={`/wall/${post.user.id}`} className={classes.userName}>
              {post ? post.user.display_name : 'Display name'}
            </Link>
            <span className={classes.secondaryText}>
              {/* Change email to identifier */}
              {post ? getIdentifier(post.user.email) : '@example'}
            </span>
          </Box>
        }
        subheader={
          <Box display='flex' alignItems='center' className={classes.text}>
            <AccessTimeTwoTone className={classes.headerIcon} />
            <Typography component='span' className={classes.timeText}>
              {post ? timeFrom(post.created_at) : 'unknown'}
            </Typography>
          </Box>
        }
        action={
          <>
            <IconButton
              className={classes.text}
              onClick={this.togglePostOptions}
            >
              <MoreVert />
            </IconButton>
            <PostOptions
              popoverAnchor={this.state.popoverAnchor}
              handleClosePopover={this.handleClosePopover}
              postId={post.id}
              userId={post.user.id}
              isBlocked={post.comment_blocked}
            />
          </>
        }
      />
    );
  }
}

export default withStyles(roomStyles)(PostHeader);

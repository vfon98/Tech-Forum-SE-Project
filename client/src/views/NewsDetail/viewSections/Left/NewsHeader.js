import React, { Component } from 'react';
import {
  CardContent,
  Typography,
  Divider,
  CardHeader,
  Avatar,
  Box,
} from '@material-ui/core';
import {
  EventAvailableTwoTone,
  VisibilityTwoTone,
  ChatTwoTone,
} from '@material-ui/icons';
import { parseDateFrom } from '../../../../utils/time';

import { withStyles } from '@material-ui/styles';
import newsDetailStyles from '../../../../assets/jss/newsDetailStyles';
import { getIdentifier } from '../../../../utils/userIdentifier';

class NewsHeader extends Component {
  render() {
    const { classes } = this.props;
    const { news, commentsNum, viewsNum } = this.props;

    return (
      <>
        <CardContent>
          <Typography className={classes.newsHeader}>
            {news
              ? news.header
              : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'}
          </Typography>
        </CardContent>
        <Divider />
        <CardHeader
          avatar={
            <Avatar
              className={classes.avatarLg}
              src={news.user ? news.user.avatar : ''}
              alt={news.user ? news.user.display_name : 'Example'}
            >
              Ex
            </Avatar>
          }
          title={
            <Box verticalAlign='middle'>
              <strong className={classes.userName}>
                {news.user ? news.user.display_name : 'Display name'}
              </strong>
              <span className={classes.secondaryText}>
                {/* Change email to identifier */}
                {news.user ? getIdentifier(news.user.email) : '@example'}
              </span>
            </Box>
          }
          subheader={
            <Box display='flex'>
              <Box className={classes.newsSubheader}>
                <EventAvailableTwoTone
                  className={classes.headerIcon}
                  color='inherit'
                />
                <Typography component='span' className={classes.timeText}>
                  {news ? parseDateFrom(news.created_at) : 'unknown'}
                </Typography>
              </Box>
              <Box className={classes.newsSubheader}>
                <ChatTwoTone className={classes.headerIcon} color='inherit' />
                <Typography component='span' className={classes.timeText}>
                  {commentsNum} comments
                </Typography>
              </Box>
              <Box className={classes.newsSubheader}>
                <VisibilityTwoTone
                  className={classes.headerIcon}
                  color='inherit'
                />
                <Typography component='span' className={classes.timeText}>
                  {viewsNum} views
                </Typography>
              </Box>
            </Box>
          }
        />
      </>
    );
  }
}

export default withStyles(newsDetailStyles)(NewsHeader);

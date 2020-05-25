import React, { Component } from 'react';
import {
  Button,
  Grid,
  Container,
  Typography,
  Box,
  Avatar,
  Divider,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import roomNewsStyles from 'assets/jss/roomNewsStyles';
import { timeFrom, parseStringFrom, parseTextFromHTML } from 'utils/converter';

class RecentNewsItem extends Component {
  render() {
    const { classes, news } = this.props;

    return (
      <>
        <Button className={classes.newsItem}>
          <Link
            to={`/news/${news ? news.id : ''}`}
            className={classes.newsItemTitle}
          >
            <Grid container spacing={1}>
              <Grid item sm={4} lg={3} xs={12} className={classes.imgWrapper}>
                <img
                  className={classes.newsImg}
                  src={news ? news.thumbnail : ''}
                />
              </Grid>
              <Grid item sm={8} lg={9} xs={12}>
                <h4 className={classes.newsTitle}>{news ? news.header : ''}</h4>
                <p
                  className={classes.newsBodyText}
                  dangerouslySetInnerHTML={{
                    __html: news ? parseTextFromHTML(news.content) : '',
                  }}
                ></p>
                <Typography className={classes.newsRoomName}>
                  #{news.room.name}
                </Typography>
                <Box className={classes.newsAvatarWrapper}>
                  <Avatar
                    component={Link}
                    to={`/wall/${news.user.id}`}
                    className={classes.avatarSm}
                    src={news.user ? news.user.avatar : ''}
                    alt={news.user ? news.user.display_name : ''}
                  />
                  <Link
                    className={classes.newsAuthorText}
                    to={`/wall/${news.user.id}`}
                  >
                    {news.user ? news.user.display_name : 'Loading'}
                  </Link>
                  <Typography className={classes.newsInfoText} color='inherit'>
                    {timeFrom(news ? news.created_at : 'long time ago')}
                  </Typography>
                  <Typography className={classes.newsInfoText}>
                    {parseStringFrom(news ? news.views : 0)} views
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Link>
        </Button>
        <Divider style={{ marginLeft: '8px' }} />
      </>
    );
  }
}

export default withStyles(roomNewsStyles)(RecentNewsItem);

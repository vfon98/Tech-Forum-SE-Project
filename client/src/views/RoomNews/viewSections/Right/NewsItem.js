import React, { Component } from 'react';
import {
  Button,
  Grid,
  Divider,
  Container,
  Typography,
  Box,
  Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import roomNewsStyles from '../../../../assets/jss/roomNewsStyles';
import { timeFrom, parseStringFrom, parseTextFromHTML } from '../../../../utils/converter';

class NewsItem extends Component {
  render() {
    const { classes, news } = this.props;
    return (
      <Button className={classes.newsItem}>
        <Link
          to={`/news/${news ? news.id : ''}`}
          className={classes.newsItemTitle}
        >
          <Grid container>
            <Grid item sm={4} lg={3} className={classes.imgWrapper}>
              <img
                className={classes.newsImg}
                src={news ? news.thumbnail : ''}
              />
            </Grid>
            <Grid item sm={8} lg={9}>
              <Container>
                <h4 className={classes.newsTitle}>{news ? news.header : ''}</h4>
                <p className={classes.newsBodyText}>
                  {news ? parseTextFromHTML(news.content) : ''}
                </p>
                <Typography className={classes.newsRoomName}>#{news.room.name}</Typography>
                <Box className={classes.newsAvatarWrapper}>
                  <Avatar
                    className={classes.avatarSm}
                    src={news.user ? news.user.avatar : ''}
                    alt={news.user ? news.user.display_name : ''}
                  />
                  <p className={classes.newsAuthorText}>
                    {news.user ? news.user.display_name : 'Loading'}
                  </p>
                  <Typography className={classes.newsInfoText}>
                    {timeFrom(news ? news.created_at : 'long time ago')}
                  </Typography>
                  <Typography className={classes.newsInfoText}>
                    {parseStringFrom(news ? news.views : 0)} views
                  </Typography>
                </Box>
              </Container>
            </Grid>
          </Grid>
        </Link>
      </Button>
    );
  }
}

export default withStyles(roomNewsStyles)(NewsItem);

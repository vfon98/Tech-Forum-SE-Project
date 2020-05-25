import React, { Component } from 'react';
import {
  Card,
  CardMedia,
  Paper,
  Box,
  CardActionArea,
  ButtonBase,
  Typography,
  Hidden,
  // Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { parseDateFrom, parseStringFrom } from '../../../../utils/converter';

import { withStyles } from '@material-ui/styles';
import {
  darkColor,
  textColor,
  orangeColor,
  limitLine,
  dyan,
  textSecondaryColor,
} from '../../../../assets/jss/main';

const bannerItemStyles = {
  wrapper: {
    margin: '5px',
    border: `1px solid ${dyan}`,
    position: 'relative',
  },
  contentWrapper: {
    textAlign: 'left',
    background: 'rgba(0,0,0,0.7)',
    width: '100%',
    padding: '4px 8px',
    position: 'absolute',
    bottom: 0,
  },
  header: {
    fontSize: '1rem',
    fontWeight: '600',
    color: textColor,
    ...limitLine(2),
    '&:hover': {
      color: dyan,
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
    },
  },
  avatarSm: {
    width: '25px',
    height: '25px',
    border: '1px solid lightlbue',
    marginRight: '4px',
  },
  info: {
    fontSize: '0.8rem',
    margin: '2px 0',
    color: textSecondaryColor,
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  userLink: {
    marginRight: '2px',
    fontWeight: '700',
    color: orangeColor,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  bgDark: {
    backgroundColor: darkColor,
    color: textColor,
  },
  imageWrapper: {
    overflow: 'hidden',
  },
  image: {
    objectFit: 'contain',
    transition: 'all 0.3s linear',
    overflow: 'hidden',
    '&:hover': {
      transform: 'scale(1.04)',
    },
  },
};

class BannerItem extends Component {
  render() {
    const { classes } = this.props;
    const { news } = this.props;

    return (
      <ButtonBase component={Link} to={`/news/${news._id}`}>
        <Card
          className={classes.wrapper}
          title={news ? news.header : 'News title'}
        >
          <Paper className={classes.bgDark}>
            <Box className={classes.imageWrapper}>
              <CardMedia
                className={classes.image}
                component='img'
                image={news ? news.thumbnail : 'https://placehold.it/400x200'}
              />
            </Box>
            <CardActionArea className={classes.contentWrapper}>
              <Typography className={classes.header}>
                {news ? news.header : 'Loading'}
              </Typography>
              <Typography className={classes.info}>
                {/* <Avatar src={news.user.avatar} className={classes.avatarSm} /> */}
                <Link to={`/wall/${news.user.id}`} className={classes.userLink}>
                  {news.user.display_name}
                </Link>
                <Hidden smDown={this.props.lastRow}>
                  {' • '}
                  {parseDateFrom(news.created_at) || 'Unknown'}
                </Hidden>
                {' • '}
                {parseStringFrom(news.views)} views
              </Typography>
            </CardActionArea>
          </Paper>
        </Card>
      </ButtonBase>
    );
  }
}

export default withStyles(bannerItemStyles)(BannerItem);

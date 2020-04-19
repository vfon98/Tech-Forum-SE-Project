import React from 'react';
import {
  Grid,
  Typography,
  Divider,
  ButtonBase,
  Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import {
  textSecondaryColor,
  limitLine,
  textColor,
  dyan,
  orangeColor,
} from '../../../../assets/jss/main';
import {
  parseStringFrom,
  parseTextFromHTML,
} from '../../../../utils/converter';
import { VisibilityTwoTone } from '@material-ui/icons';

const useStyles = makeStyles({
  wrapper: {
    margin: '0.5em 0.8em 0.6em',
    textAlign: 'left',
    '&:hover img:first-child': {
      boxShadow: '0 0 3px 4px rgba(0, 140, 186, 0.2)',
    },
  },
  imgWrapper: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      maxWidth: '100%',
    },
  },
  header: {
    fontSize: '0.9rem',
    lineHeight: 1.2,
    fontWeight: '500',
    ...limitLine(2),
    marginBottom: '0.2em',
    '&:hover': {
      color: orangeColor,
    },
  },
  content: {
    color: textSecondaryColor,
    ...limitLine(4),
    fontSize: '0.8rem',
    fontWeight: '500',
    marginLeft: '4px',
    paddingTop: 0,
  },
  actionWrapper: {
    display: 'flex',
    marginTop: '0.2em',
    alignItems: 'center',
    fontSize: '0.8rem',
    fontWeight: 500,
    // color: '#5f5f5f'
    color: textColor,
  },
  actionIcon: {
    marginRight: '3px',
    marginLeft: '-3px',
  },
  avatarSm: {
    width: '22px',
    height: '22px',
    border: '1px solid lightblue',
    marginRight: '4px',
  },
  username: {
    color: dyan,
    fontWeight: '600',
    fontSize: '0.8rem',
  },
});

const TrendingNewsItem = props => {
  const classes = useStyles();

  return (
    <>
      <ButtonBase
        title={props.news.header}
        component={Link}
        to={`/news/${props.news.id}`}
      >
        <Grid container className={classes.wrapper}>
          <Grid item sm={12}>
            <Typography className={classes.header}>
              {props.news.header}
            </Typography>
          </Grid>
          <Grid item sm={5} className={classes.imgWrapper}>
            <img src={props.news.thumbnail} alt='Thumbnail' />
          </Grid>
          <Grid item sm={7}>
            <Typography className={classes.content}>
              {parseTextFromHTML(props.news.content)}
            </Typography>
          </Grid>
          {/* Item info data and views */}
          <Grid item sm={12}>
            <Grid container justify='space-between'>
              <Grid item className={classes.actionWrapper}>
                <Avatar
                  className={classes.avatarSm}
                  src={props.news.user.avatar || ''}
                  alt={props.news.user.display_name}
                />
                <Typography className={classes.username}>
                  {props.news.user.display_name}
                </Typography>
              </Grid>
              <Grid item className={classes.actionWrapper}>
                <VisibilityTwoTone
                  fontSize='small'
                  className={classes.actionIcon}
                />
                {parseStringFrom(props.news.views)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ButtonBase>
      <Divider variant='middle' />
    </>
  );
};

export default TrendingNewsItem;

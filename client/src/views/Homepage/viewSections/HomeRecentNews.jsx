import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import recentNewsStyles from 'assets/jss/recentNewsStyles';
import { Grid, Card, Button, Hidden } from '@material-ui/core';
import { NavLink, Link } from 'react-router-dom';

import img1 from 'assets/img/sidebar/windows.jpg';
import img2 from 'assets/img/sidebar/macos.jpg';
import img3 from 'assets/img/sidebar/ios.jpg';
import img4 from 'assets/img/sidebar/android.jpg';
import RoomList from 'components/RoomList.js/RoomList';
import RecentNews from 'components/RecentNews/RecentNews';

const items = [
  {
    img: img1,
    title: 'Windows',
    link: '/windows',
  },
  {
    img: img2,
    title: 'macOS',
    link: '/macos',
  },
  {
    img: img3,
    title: 'iOS',
    link: '/ios',
  },
  {
    img: img4,
    title: 'Android',
    link: '/android',
  },
];

const SideBar = props => {
  const { classes } = props;
  return (
    <>
      <h3 className={classes.title}>Topic</h3>
      {items.map(item => (
        <CardItem item={item} classes={classes} />
      ))}
    </>
  );
};

const CardItem = props => {
  const { classes } = props;
  return (
    <>
      <Button className={classes.btn}>
        <NavLink
          to={props.item.link}
          style={{ textDecoration: 'none', textTransform: 'none' }}
        >
          <Grid container spacing={3}>
            <Grid item sm={4}>
              <img className={classes.img} src={props.item.img} />
            </Grid>
            <Grid item sm={8}>
              <h4 className={classes.linkText}>{props.item.title}</h4>
            </Grid>
          </Grid>
        </NavLink>
      </Button>
    </>
  );
};

const NewsItem = props => {
  const { classes } = props;
  return (
    <>
      <Button className={classes.newsItem}>
        <NavLink to='#' className={classes.newsItemTitle}>
          <Grid container>
            <Grid item sm={3}>
              <img className={classes.newsImg} src={props.item.img} />
            </Grid>
            <Grid item sm={9}>
              <h4 className={classes.newsTitle}>{props.item.title}</h4>
              <p className={classes.newsBodyText}>{props.item.body}</p>
              <p className={classes.newsAuthorText}>{props.item.author}</p>
            </Grid>
          </Grid>
        </NavLink>
      </Button>
    </>
  );
};

class HomeRecentNews extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.background}>
        <Grid container className={classes.container}>
          <Grid item sm={3} xs={12}>
            <Hidden only='xs'>
              <RoomList />
            </Hidden>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Card className={classes.cardBg}>
              <RecentNews theme='light' isInfinite={false} />
              <Button
                component={Link}
                to='/news'
                className={classes.readMoreBtn}
                variant='contained'
                color='primary'
                size='large'
              >
                Read More News
              </Button>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(recentNewsStyles)(HomeRecentNews);

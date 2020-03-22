import React from 'react';
import { Button, Grid, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

import recentNewsStyles from '../../../assets/jss/recentNewsStyles';
import { withStyles } from '@material-ui/styles';

import windows from 'assets/img/title/windows.jpg';
import macos from 'assets/img/title/macos.jpg';
import ios from 'assets/img/title/ios.jpg';
import android from 'assets/img/title/android.jpg';
import linux from 'assets/img/title/linux.jpg';
import smartphone from 'assets/img/title/smartphone.jpg';
import laptop_desktop from 'assets/img/title/laptop_desktop.jpg';
import programing from 'assets/img/title/programing.jpg';

const rooms = [
  {
    id: '5e5e76ff0df4c97fa160c193',
    title: 'Windows',
    img: windows,
    newPost: 1,
  },
  {
    id: '5e5e770c0df4c97fa160c194',
    title: 'macOS',
    img: macos,
    newPost: 3,
  },
  {
    id: '5e5e77110df4c97fa160c195',
    title: 'Linux',
    img: linux,
    newPost: 5,
  },
  {
    id: '5e5e77170df4c97fa160c196',
    title: 'iOS',
    img: ios,
    newPost: 2,
  },
  {
    id: '5e5e771c0df4c97fa160c197',
    title: 'Android',
    img: android,
    newPost: 1,
  },
  {
    id: '5e5e77250df4c97fa160c198',
    title: 'Smartphone',
    img: smartphone,
    newPost: 1,
  },
  {
    id: '5e5e772d0df4c97fa160c199',
    title: 'Laptop - Desktop',
    img: laptop_desktop,
    newPost: 8,
  },
  {
    id: '5e5e77340df4c97fa160c19a',
    title: 'Programing',
    img: programing,
    newPost: 1,
  },
];

const CardItem = props => {
  const { classes, room } = props;
  return (
    <>
      <Button className={classes.btn} style={{ paddingLeft: 0 }}>
        <Link
          to={`/room/${room.title}`}
          replace
          style={{ textDecoration: 'none', textTransform: 'none' }}
        >
          <Grid container spacing={2}>
            <Grid item sm={4}>
              <img className={classes.img} src={props.room.img} />
            </Grid>
            <Grid item sm={8}>
              <h4 className={classes.linkText}>{props.room.title}</h4>
            </Grid>
          </Grid>
        </Link>
      </Button>
    </>
  );
};

const SideBar = props => {
  const { classes } = props;
  return (
    <Box>
      <h3 className={classes.title}>Our Community</h3>
      {rooms.map(room => (
        <CardItem key={room.id} room={room} classes={classes} />
      ))}
    </Box>
  );
};

export default withStyles(recentNewsStyles)(SideBar);

import React, { Component } from 'react';
import { CardContent, Breadcrumbs, Link, Typography } from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import { textColor } from '../../../../assets/jss/main';

const linkColor = '#f57c00';
const breadcurmbStyles = {
  wrapper: {
    paddingBottom: 0,
  },
  separator: {
    color: textColor,
  },
  link: {
    fontWeight: '500',
    cursor: 'pointer',
    // color: textColor,
    color: linkColor,
  },
  currentLink: {
    fontWeight: '700',
    color: linkColor,
  },
};

class NewsBreadcrumbs extends Component {
  render() {
    const { classes } = this.props;
    const { room } = this.props;

    return (
      <CardContent className={classes.wrapper}>
        <Breadcrumbs separator={<NavigateNext className={classes.separator} />}>
          <Link className={classes.link} component={RouterLink} to='/'>
            Home
          </Link>
          <Link
            className={classes.link}
            component={RouterLink}
            to='/discussion'
          >
            Discussion
          </Link>
          <Link
            className={classes.currentLink}
            component={RouterLink}
            to={`/room/${room.name}/news`}
          >
            [{room && room.name}] News
          </Link>
        </Breadcrumbs>
      </CardContent>
    );
  }
}

export default withStyles(breadcurmbStyles)(NewsBreadcrumbs);

import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  Avatar,
  Box,
  Typography,
  CardActions,
  Divider,
  Grid,
} from '@material-ui/core';

import { withStyles } from '@material-ui/styles';
import { textColor } from 'assets/jss/main';
import { textSecondaryColor } from 'assets/jss/main';
import { RefreshRounded } from '@material-ui/icons';

const itemStyles = {
  wrapper: {
    background: '#27293D',
    color: textColor,
    // borderRadius: '6px',
    width: '100%',
    margin: '1em',
  },
  dataWrapper: {
    textAlign: 'right',
  },
  icon: {
    width: '45px',
    height: '45px',
    background: props =>
      `linear-gradient(45deg, ${props.color[600]} 30%, ${props.color[300]} 90%)`,
  },
  title: {
    color: textSecondaryColor,
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  data: {
    fontSize: '1.6rem',
  },
  divider: {
    background: '#2B3553',
    width: '90%',
    margin: '0 auto',
  },
  detail: {
    padding: '0 8px',
    fontSize: '0.8rem',
    textAlign: 'center',
  },
  detailIcon: {
    fontSize: '1rem',
    marginRight: '4px',
    transform: ' translateY(0.2rem)',
  },
};

class StatisticItem extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container item xs={12} sm={6} lg={3}>
        <Card className={classes.wrapper}>
          <CardHeader
            avatar={<Avatar className={classes.icon}>{this.props.icon}</Avatar>}
            action={
              <Box className={classes.dataWrapper}>
                <Typography className={classes.title}>
                  {this.props.title || 'Lorem ipsum'}
                </Typography>
                <Typography className={classes.data}>
                  {this.props.data || 0}
                </Typography>
              </Box>
            }
          />
          <Divider classes={{ root: classes.divider }} />
          <CardActions>
            <Typography className={classes.detail}>
              <RefreshRounded className={classes.detailIcon} />
              {this.props.description || 'Loading'}
            </Typography>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(itemStyles)(StatisticItem);

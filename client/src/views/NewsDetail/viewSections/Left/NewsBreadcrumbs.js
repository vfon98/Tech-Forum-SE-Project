import React, { Component } from 'react';
import {
  CardContent,
  Breadcrumbs,
  Link,
  Grid,
  IconButton,
  CardActions,
} from '@material-ui/core';
import { NavigateNext, MoreVert } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import { textColor } from '../../../../assets/jss/main';
import { hasModifyPermission } from 'utils/session';
import NewsOption from './NewsOption';

const linkColor = '#f57c00';
const breadcurmbStyles = {
  flexContainer: {
    display: 'flex',
  },
  wrapper: {
    flexGrow: 1,
    // paddingTop: '8px',
    paddingBottom: '0 !important',
  },
  action: {
    padding: 0,
    overflow: 'visible',
    width: '2em',
    marginTop: '8px',
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
  constructor(props) {
    super(props);
    this.state = {
      popoverAnchor: null,
    };
  }

  toggleNewsOption = e => {
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
    const { classes } = this.props;
    const { room, news } = this.props;

    return (
      <Grid className={classes.flexContainer}>
        <CardContent className={classes.wrapper}>
          <Breadcrumbs
            separator={<NavigateNext className={classes.separator} />}
          >
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
        {hasModifyPermission(news.user_id) && (
          <CardActions className={classes.action}>
            <IconButton
              size='small'
              color='inherit'
              onClick={this.toggleNewsOption}
            >
              <MoreVert />
            </IconButton>
            <NewsOption
              popoverAnchor={this.state.popoverAnchor}
              handleClosePopover={this.handleClosePopover}
              newsId={news.id}
              userId={news.user_id}
            />
          </CardActions>
        )}
      </Grid>
    );
  }
}

export default withStyles(breadcurmbStyles)(NewsBreadcrumbs);

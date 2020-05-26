import React, { Component } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import mainSectionStyles from './jss/mainSectionStyles';
import UserPost from './Activity/UserPost';
import Loading from 'components/Loading';

import Setting from './Setting/Setting';
import { Button } from '@material-ui/core';

const CustomizeTabs = withStyles(theme => ({
  root: {
    color: '#fff',
    background: '#313947',
    borderBottom: 'none',
    padding: '0 15% ',
    width: '70%',
    transition: 'cubic-bezier(.17,.67,.87,.48)',
  },
  indicator: {
    backgroundColor: '#292E38',
  },
}))(Tabs);

const CustomTab = withStyles(theme => ({
  root: {
    color: '#fff',
    textTransform: 'none',
    minWidth: '300px',
    borderBottom: 'none',
    transition: 'cubic-bezier(.17,.67,.87,.48)',
    '&:hover': {
      background: '#3a4352',
    },
    '&$selected': {
      color: '#fff',
      background: '#292E38',
      borderBottom: 'none',
    },
    '&:focus': {
      color: '#fff',
    },
  },
  selected: {},
}))(props => <Tab {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

class MainSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: this.props.permission,
      tabsIndex: 0,
      posts: null,
      isLoading: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      posts: nextProps.userPosts,
    });
  }

  handleTabChange = (e, newValue) => {
    this.setState({
      tabsIndex: newValue,
    });
  };
  render() {
    const { classes } = this.props;
    const { posts, isLoading } = this.state;
    return (
      <div className={classes.container}>
        <Divider />
        <Grid container>
          <Grid item sm={3}></Grid>
          <Grid item sm={6}>
            <h3 className={classes.title}>Recent posts</h3>
          </Grid>
          <Grid item sm={3}></Grid>
        </Grid>
        <Grid container>
          <Grid item sm={3}></Grid>
          <Grid item sm={6}>
            {isLoading && !posts ? (
              <Loading />
            ) : (
              <>
                {posts.length ? (
                  posts.map(post => {
                    return <UserPost key={post.id} post={post} />;
                  })
                ) : (
                  <Button variant='outlined' className={classes.noPostsButton}>There are no posts to show!</Button>
                )}
              </>
            )}
          </Grid>
          <Grid item sm={3}></Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(mainSectionStyles)(MainSection);

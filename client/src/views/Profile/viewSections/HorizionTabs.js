import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid, Button } from '@material-ui/core'

import { Edit, SaveAlt, Close } from '@material-ui/icons'
import axios from '../../../axios/instance'
import verticalTabsStyles from '../view components/jss/verticalTabsStyles'
import VerticalTabs from './VerticalTabs'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}


const CustomTab = withStyles({
  root: {
    background: 'transparent',
    borderRadius: 3,
    border: 0,
    color: '#333',
    height: 48,
    padding: '0 30px',
    boxShadow: 'none',
    textTransform: 'none',
  },
  label: {
    textTransform: 'capitalize',
    textAlign: 'left'
  },
})(Tab);


class HorizonTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      data: null,
      status: "view"
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.userInfo
    })
  }

  handleStatus = value => {
    this.setState({
      status: value
    })
  }
  handleUpdate = (data, field) => {
    axios
    .put('/profile', data)
  }
  handleChange = (event, newValue) => {
    this.setValue(newValue);
  };

  setValue = (value) => {
    this.setState({
      value: value
    })
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
          <AppBar position="static" color="default" className={classes.appBar}>
            <Grid container >
              <Grid item sm={8}>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="secondary"
                  textColor="secondary"
                  variant="scrollable"
                  scrollButtons="auto"
                  className={{ root: classes.tabRoot, label: classes.tabLabel }}
                >

                  <CustomTab label="Info" {...a11yProps(0)} />
                  <CustomTab label="Activity" {...a11yProps(1)} />

                </Tabs>
              </Grid>
             
            </Grid>
          </AppBar>
        </Grid>
        <TabPanel value={this.state.value} index={0}>
          
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          Item Two
      </TabPanel>
      </div>
    );
  }
}

export default withStyles(verticalTabsStyles)(HorizonTabs)

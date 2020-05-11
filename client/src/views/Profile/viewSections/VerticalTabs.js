import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core'
import axios from '../../../axios/instance'

import verticalTabsStyles from '../view components/jss/verticalTabsStyles'
import OverViews from './Tabs/OverViews';
import Contact from './Tabs/Contact'
import Security from './Tabs/Security'
function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <>
      {value === index && <Box style={{ paddingTop: '0' }} p={3}>{children}</Box>}
    </>
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


class VerticalTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      data: null
    }
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
          <Grid item sm={2}>
            <AppBar position="static" color="default" className={classes.appBar}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant="scrollable"
                scrollButtons="auto"
                orientation='vertical'
                className={{ root: classes.tabRoot, label: classes.tabLabel }}
              >
                <CustomTab label="Overview" {...a11yProps(0)} />
                <CustomTab label="Contact" {...a11yProps(1)} />
                <CustomTab label="Security" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
          </Grid>
          <Grid item sm={10}>
            <TabPanel value={this.state.value} index={0}>
              <OverViews />
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
              <Contact />
              </TabPanel>
            <TabPanel value={this.state.value} index={2}>
              <Security />
              </TabPanel>
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default withStyles(verticalTabsStyles)(VerticalTabs)

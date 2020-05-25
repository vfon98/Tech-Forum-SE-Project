import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import { container } from '../../../assets/jss/main';
import OverViews from './Tabs/OverViews';
import Security from './Tabs/Security';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'transparent',
    textAlign: 'left!important',
  },
  container: {
    ...container,
  },
  appBar: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
}));
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
    textAlign: 'left',
  },
})(Tab);

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item sm={2}>
          <AppBar position='static' color='default' className={classes.appBar}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor='secondary'
              textColor='secondary'
              variant='scrollable'
              scrollButtons='auto'
              orientation='vertical'
              className={{ root: classes.tabRoot, label: classes.tabLabel }}
            >
              <CustomTab label='Overview' {...a11yProps(0)} />
              <CustomTab label='Security' {...a11yProps(1)} />
            </Tabs>
          </AppBar>
        </Grid>
        <Grid item sm={10}>
          <TabPanel value={value} index={0}>
            <OverViews />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Security />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}

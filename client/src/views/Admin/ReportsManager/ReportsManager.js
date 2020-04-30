import React, { Component } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Box,
  TableBody,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import axios from 'axios/instance';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import { textColor } from 'assets/jss/main';
import usersTableStyles from 'assets/jss/admin/usersTableStyles';
import Layout from '../Layout/Layout';
import { parseLongDateFrom } from 'utils/converter';
import { CloseRounded, VisibilityTwoTone } from '@material-ui/icons';

const StyledCell = withStyles({
  root: {
    background: '#27293D',
    color: textColor,
    borderColor: '#3D3F51',
    // whiteSpace: 'nowrap',
    cursor: 'default',
  },
})(TableCell);

const ReportRow = props => {
  const { report, classes } = props;
  return (
    <TableRow>
      <StyledCell>{props.index + 1}</StyledCell>
      <StyledCell padding='none' className={classes.nameCell}>
        {report.user ? (
          <Link className={classes.nameLink} to={`/profile/${report.user_id}`}>
            {report.user.display_name}
          </Link>
        ) : (
          'Anonymous'
        )}
      </StyledCell>
      <StyledCell
        className={classes.reasonsCell}
        title={report.reasons.join(', ')}
      >
        {report.reasons.join(', ')}
      </StyledCell>
      <StyledCell className={classes.contentCell} title={report.content}>
        <Typography className={classes.content}>{report.content}</Typography>
      </StyledCell>
      <StyledCell padding='none'>{report.type}</StyledCell>
      <StyledCell className={classes.nowrap} padding='none'>
        {parseLongDateFrom(report.created_at)}
      </StyledCell>
      <StyledCell align='center'>
        <Tooltip title='Visit this'>
          <IconButton size='small' component={Link} to=''>
            <VisibilityTwoTone fontSize='small' color='primary' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Dismiss report'>
          <IconButton
            size='small'
            onClick={() => props.handleDelete(report.id)}
          >
            <CloseRounded fontSize='small' color='error' />
          </IconButton>
        </Tooltip>
      </StyledCell>
    </TableRow>
  );
};

class ReportsManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
    };
  }

  componentDidMount() {
    this.fetchReports();
  }

  fetchReports = () => {
    axios
      .get('/reports')
      .then(res => {
        this.setState({
          reports: res.data.reports,
        });
      })
      .catch(err => console.log(err));
  };

  handleDelete = id => {
    axios
      .delete(`/reports/${id}`)
      .then(() => {
        this.fetchReports();
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    const { reports } = this.state;

    return (
      <Layout>
        <Box className={classes.tableWrapper}>
          <Paper className={classes.table}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledCell>#</StyledCell>
                    <StyledCell padding='none'>Reporter</StyledCell>
                    <StyledCell>Reasons</StyledCell>
                    <StyledCell>Content</StyledCell>
                    <StyledCell padding='none'>Type</StyledCell>
                    <StyledCell padding='none'>Time</StyledCell>
                    <StyledCell align='center'>Actions</StyledCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.map((report, index) => (
                    <ReportRow
                      key={report.id}
                      index={index}
                      classes={classes}
                      report={report}
                      handleDelete={this.handleDelete}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Layout>
    );
  }
}

export default withStyles(usersTableStyles)(ReportsManager);

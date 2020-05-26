import React, { Component } from 'react';
import {
  Tooltip,
  Grid,
  Box,
  IconButton,
  InputBase,
  Divider,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import axios from 'axios/instance';

import SearchResult from './SearchResult';

const SearchWrapper = withStyles({
  root: {
    overflow: 'auto',
    maxHeight: '400px',
  },
})(Box);

const bgColor = 'rgba(255,255,255,0.9)';
const StyledTooltip = withStyles({
  tooltip: {
    backgroundColor: bgColor,
    color: 'rgba(0, 0, 0, 0.87)',
    // marginTop: '-10px',
    // maxHeight: '400px',
  },
  arrow: {
    color: bgColor,
  },
})(Tooltip);

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      keyword: '',
    };
  }

  handleSearch = e => {
    const keyword = e.target.value;
    this.setState({ keyword });
    axios
      .post('/news/search', { keyword })
      .then(res => {
        this.setState({ results: res.data.news });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { results } = this.state;
    return (
      <StyledTooltip
        open={this.props.isOpen}
        onClose={this.props.handleClose}
        disableHoverListener
        disableFocusListener
        disableTouchListener
        arrow
        interactive
        placement='bottom'
        title={
          <Grid>
            <Grid>
              <Box>
                <IconButton size='small'>
                  <Search />
                </IconButton>
                <InputBase
                  onChange={this.handleSearch}
                  value={this.state.keyword}
                  placeholder='Search...'
                  autoFocus={true}
                />
              </Box>
              <Divider />
            </Grid>
            <Grid>
              <SearchWrapper>
                {results.map(result => (
                  <SearchResult key={result.id} result={result} />
                ))}
              </SearchWrapper>
            </Grid>
          </Grid>
        }
      >
        {this.props.children}
      </StyledTooltip>
    );
  }
}

export default SearchBox;

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Button, Grid, TextField } from '@material-ui/core'

import { withStyles } from '@material-ui/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Search from '@material-ui/icons/Search'

import navbarStyles from 'assets/jss/navbarStyles.jsx'

class NavBar extends Component {
	render() {
		const { classes } = this.props;
		return (
			<>
				<AppBar position='relative'>
					<Toolbar className={classes.appBar}>
						<Grid container justify='space-between'>
							<Grid
								item
								sm={3}

							>
								{this.props.brand ? this.props.brand : "BRAND"}
								<span className={classes.brandHighlight}>	{this.props.brandHighlight ? this.props.brandHighlight : ""}</span>
							</Grid>
							<Grid container sm={6} justify="center" >
								<Button className={classes.btn}>
									<NavLink className={classes.link} to='/windows'>Home</NavLink>

								</Button>
								<Button className={classes.btn}>
									<NavLink className={classes.link} to='/windows'>News</NavLink>
								</Button>
								<Button className={classes.btn}>
									<NavLink className={classes.link} to='/windows'>Discussion</NavLink>
								</Button>
								<Button className={classes.btn}>
									<NavLink className={classes.link} to='/windows'>Contact</NavLink>
								</Button>
							</Grid>
							<Grid container sm={3} justify='flex-end'>
								<input type="text" name="searchBox" className={classes.searchBox} placeholder='Search'/>
								<Button ><Search className={classes.accountBtn}/></Button>
								<Button>
									<AccountCircle className={classes.accountBtn} />
								</Button>
							</Grid>
						</Grid>

					</Toolbar>
				</AppBar>
			</>
		)
	}
}

export default withStyles(navbarStyles)(NavBar)

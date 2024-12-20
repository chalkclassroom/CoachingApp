import React, { Component } from 'react';
import { withRouter } from "react-router";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeIcon from '@material-ui/icons/Home';

const MenuItems = [
    {
        title: 'Reports',
        url: '/Reports',
    },
]

const Styles = {
    navItems: {
        background: 'rgb(234, 234, 234)',
        border: '1px',
        borderColor: 'gray',
        height: '50px',
        display: 'flex',
        /* justify-content: center; */
        alignItems: 'center',
        fontSize: '1.2rem',
        paddingLeft: '1rem',
    },


    navMenu: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, auto)',
        gridColumnGap: '50px',
        listStyle: 'none',
        textAlign: 'center',
        width: '70vw',
        justifyContent: 'start'
    },

    navLinks: is_current => ({
        color: 'Black',
        textDecoration: is_current ? 'underline' : 'none',
        padding: '0.5rem 5px',
        cursor: 'default',
        fontWeight: is_current ? 'bold' : 'normal',
        fontStyle: 'oblique',
        'white-space': 'nowrap',
    })
}

function checkCurrent(item) {
    if ( item.url === location.pathname )
        return true;
    return false;
}

function handleClick(url) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');

}

/*
<nav style={Styles.navItems}>
  {this.props.pageHistory.map((item, index) => {
      return (<>

              {index == this.props.pageHistory.length - 1 ? <a style={{padding: '0.5rem 5px', fontWeight: 'bold'}}>{item.title}</a> : <a style={Styles.navLinks(checkCurrent(item))} onClick = {() => {this.props.changePage(item.url);}}>{item.title} > </a>}
              </>
      )
  })}
    <ul style={Styles.navMenu}>
        {MenuItems.map((item, index) => {
            return (
                <li key={index}>
                    <a style={Styles.navLinks(checkCurrent(item))} onClick = {() => this.props.history.push(item.url)}>
                    {item.title}
                    </a>
                </li>
            )
        })}
        <li>

        </li>

    </ul>
*/

class Navbar extends Component {
    render() {
        return (
            <nav style={Styles.navItems}>
                <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>

                  {this.props.pageHistory.map((item, index) => {
                      return ( <div>
                        {index == this.props.pageHistory.length - 1 ? <Typography style={{display: 'flex', alignItems: 'center'}} color="textPrimary">{index === 0 ? <HomeIcon style={{marginRight: '5px', marginTop: '-3px'}} /> : null}{item.title}</Typography> : <Link style={{display: 'flex', alignItems: 'center'}} color="inherit" onClick={() => {this.props.changePage(item.url)}}>{index === 0 ? <HomeIcon style={{marginRight: '5px', marginTop: '-3px'}} /> : null}{item.title} </Link>}
                        </div>)
                      })}
                </Breadcrumbs>

            </nav>
        );
    }
}


export default withRouter(Navbar);

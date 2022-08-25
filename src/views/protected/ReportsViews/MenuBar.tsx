import React, { Component } from 'react';
import { withRouter } from "react-router";

const MenuItems = [
    {
        title: 'Reports',
        url: '/Reports',
    },
    {
        title: 'Reports List',
        url: '/ReportsList',
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
        padding: '0.5rem 1rem',
        cursor: 'default',
        fontWeight: is_current ? 'bold' : 'normal'
    })
}

function checkCurrent(item) {
    if ( item.url === location.pathname )
        return true;
    return false;
}

class Navbar extends Component {
    render() {
        return (
            <nav style={Styles.navItems}>
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
                </ul>
            </nav>
        );
    }
}
 
export default withRouter(Navbar);

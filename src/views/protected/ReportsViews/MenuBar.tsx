import React, { Component } from 'react';

const MenuItems = [
    {
        title: 'Reports',
        url: '/Reports',
        cName: 'nav-links'
    },
    {
        title: 'Reports List',
        url: '/',
        cName: 'nav-links'
    },
]

const navItems = {
    background: 'rgb(234, 234, 234)',
    border: '1px',
    borderColor: 'gray',
    height: '50px',
    display: 'flex',
    /* justify-content: center; */
    alignItems: 'center',
    fontSize: '1.2rem',
}


const navMenu = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, auto)',
    gridColumnGap: '50px',
    listStyle: 'none',
    textAlign: 'center',
    width: '70vw',
    justifyContent: 'start'
}

const navLinks = {
    color: 'Black',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    cursor: 'default'
}

class Navbar extends Component {
    render() { 
        return (
            <nav style={navItems}>
                <ul style={navMenu}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a style={navLinks} href={item.url}>
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
 
export default Navbar;
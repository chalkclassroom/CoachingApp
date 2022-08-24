import { Typography } from "@material-ui/core";
import React from "react";
import styled from 'styled-components'

const SidebarParent = styled.div`
  background: white;
  width: 1000px;
  height: fit-content;
`;

const listStyle = {
    listStyle: 'none',
    paddingTop: '1.5em',
    fontSize: '1.2em',
}

const aStyle = {
    textDecoration: 'none', 
    color: 'black',
    cursor: 'default',
}

const MenuItems = [
    {
        title: 'View Report Images',
        url: '/Reports',
    },
    {
        title: 'View Report Descriptions',
        url: '/',
    },
]


function Sidebar() {
    return (
        <>
            <SidebarParent>
                <ul style={{    padding: '0 0 0 .4em',
                                margin: '0'}}>
                    <li style={listStyle}/>
                    {MenuItems.map((item, index) => {
                        return (
                            <li style={listStyle} key={index}>
                                <a style={aStyle} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>           
            </SidebarParent>
        </>
    );
}

export default Sidebar;
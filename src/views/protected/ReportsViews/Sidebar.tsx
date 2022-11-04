import { withRouter } from "react-router";
import React, { Component } from "react";
import styled from 'styled-components'
import PrintIcon from '@material-ui/icons/Print';

const SidebarParent = styled.div`
  background: white;
  white-space: nowrap;
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

]

const BackItems = [
    {
        title: 'Back to Reports',
        url: '/Reports',
    },
]

const BackList = [
    "/TeacherProfile",
    "/CoachProfile",
    "/SiteProfile",
    "/ProgramProfile",
    "/TeacherResults",
    "/CoachResults",
    "/SiteResults",
    "/ProgramResults"
]

function checkBack() {
    for ( let i = 0; i < BackList.length; i++) {
        if (location.pathname === BackList[i]) {
            return BackItems;
        }
    }
    return MenuItems;
}

function checkPrint(currentPage) {
    for ( let i = 4; i < BackList.length; i++) {
        if (location.pathname === BackList[i] || ("/" + currentPage) === BackList[i] ) {
            return (
                <li style={listStyle}>
                        {/* <img style={{height: '1.5em', width: '1.5em'}} src="../../../src/assets/icons/PrintIcon.png"/> */}
                        <PrintIcon style={{height: '1.5em', width: '1.5em', verticalAlign: 'bottom'}}/>
                        <a style={aStyle} href="javascript:window.print();">&ensp;Print</a>
                </li>
            );
        }
    }
    return (<li style={listStyle}/>);
}


class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    render() {
    return (
        <>
            <SidebarParent>
                <ul style={{    padding: '0 0 0 .8em', margin: '0'}}>
                    {checkPrint(this.props.currPage)}
                    {checkBack().map((item, index) => {
                        return (
                            <li style={listStyle} key={index}>
                                <a style={aStyle} onClick = {() => this.props.history.push(item.url)}>
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
}

export default withRouter(Sidebar);

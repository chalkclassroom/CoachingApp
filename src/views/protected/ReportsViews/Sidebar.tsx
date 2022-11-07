import { withRouter } from "react-router";
import React, { Component } from "react";
import styled from 'styled-components'
import PrintIcon from '@material-ui/icons/Print';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

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
        title: 'Back to Reports Dashboard',
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
        if (location.pathname === BackList[i] || ("/" + currentPage) === BackList[i] && location.pathname !== "/Reports") {
            return (
              <>
              {/*
                <li style={listStyle}>
                        <PrintIcon style={{height: '1.5em', width: '1.5em', verticalAlign: 'bottom'}}/>
                        <a style={aStyle} href="javascript:window.print();">&ensp;Print</a>
                </li>
              */}
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<PrintIcon />}
                  onClick = {() => window.print()}
                  style={{'white-space': 'initial', 'line-height': '20px', textAlign: 'left', justifyContent: 'flex-start', marginBottom: '15px', padding: '11px 15px'}}
                >
                        {/* <img style={{height: '1.5em', width: '1.5em'}} src="../../../src/assets/icons/PrintIcon.png"/> */}
                        Print
                </Button>
              </>
            );
        }
    }
    //return (<li style={listStyle}/>);
    return <></>
}


class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    handleBackButton = (url) => {
      this.props.history.push(url);

      // If there's a callback function, run it
      if(this.props.callback){
          this.props.callback();
      }
    }

    render() {
    return (
        <>
            <SidebarParent>
                <div style={{padding: '1em 0 0 .8em', margin: '0', display: 'flex', flexDirection: 'column'}}>
                    {checkPrint(this.props.currPage)}
                    {checkBack().map((item, index) => {
                        return (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<ArrowBackIosIcon />}
                              onClick = {() => this.handleBackButton(item.url)}
                              style={{'white-space': 'initial', 'line-height': '20px', textAlign: 'left'}}
                            >
                              {item.title}
                            </Button>
                          </>
                        )
                    })}
                </div>
            </SidebarParent>
        </>
    );
    }
}

export default withRouter(Sidebar);

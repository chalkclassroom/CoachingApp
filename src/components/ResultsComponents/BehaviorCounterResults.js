import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../components/Firebase/FirebaseContext";
import Grid from "@material-ui/core/Grid";
import { Pie } from "react-chartjs-2";

const styles = ({

});

class BehaviorCounterResults extends React.Component {
  constructor(props){
    super(props);
  }

  handlePushFire = entry => {

  };

  CustomUI = (props) => {
    if (!this.props.percentage) {
      return (
        <div className="behavior">
          <div className='disapprovals' style={{display: 'inline-block', marginTop:"15%", marginRight:'17%'}}>
            <div style={{width: '23vw', height: '8vh', fontSize: '1.75em', color: '#e17055', textAlign:'center'}}>
              TOTAL BEHAVIOR DISAPPROVALS
            </div>
            <div style={{width: '23vw', height: '10vh', fontSize: '4em', color: '#e17055', textAlign:'center'}}>
              {this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount}
            </div>
            <div style={{width: '23vw', height: '6vh', fontSize: '1.25em', backgroundColor:'#E55529', color:"#ffffff", fontWeight:'bold'}}>
              {this.props.disapprovalBehaviorCount} DISAPPROVAL
            </div>
            <div style={{width: '23vw', height: '6vh', fontSize: '1.25em', backgroundColor: '#E99C2E', color:"#ffffff", fontWeight:'bold'}}>
              {this.props.redirectionsBehaviorCount} REDIRECTION
            </div>
          </div>
          <div className='approvals' style={{display: 'inline-block'}}>
            <div style={{width: '23vw', height: '8vh', fontSize: '1.75em', color: '#009365', display:'inline-block', textAlign:'center'}}>
              TOTAL BEHAVIOR APPROVALS
            </div>
            <div style={{width: '23vw', height: '10vh', fontSize: '4em', color: '#009365', textAlign:'center'}}>
              {this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount}
            </div>
            <div style={{width: '23vw', height: '6vh', fontSize: '1.25em', backgroundColor: '#FFD300', color:"#ffffff", fontWeight:'bold'}}>
              {this.props.nonspecificBehaviorCount} NON SPECIFIC
            </div>
            <div style={{width: '23vw', height: '6vh', fontSize: '1.25em', backgroundColor: "#009365", color:"#ffffff", fontWeight:'bold'}}>
              {this.props.specificBehaviorCount} SPECIFIC
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Grid>
          <Grid item>
            <Pie
              data={{
                labels: [
                  'Non Specific',
                  'Specific',
                  'Disapproval',
                  'Redirect'
                ],
                datasets: [{
                  data: [
                    this.props.nonspecificBehaviorCount,
                    this.props.specificBehaviorCount,
                    this.props.disapprovalBehaviorCount,
                    this.props.redirectionsBehaviorCount
                  ],
                  backgroundColor: [
                    "#FFD300",
                    "#009365",
                    "#E55529",
                    "#E99C2E"
                  ],
                  hoverBackgroundColor: [
                    "#FFD300",
                    "#009365",
                    "#E55529",
                    "#E99C2E"
                  ]
                }]
              }}
            />
          </Grid>
          <Grid item>
            <div className="behavior" style={{marginRight:"10%", marginLeft:"5%"}}>
              <div className='disapprovals' style={{display: 'inline-block', marginRight:"10%", marginLeft:'5%'}}>
                <div style={{width: '20vw', height: '6vh', fontSize: '1.25em', color: "#E55529", textAlign:'center'}} >
                  BEHAVIOR DISAPPROVALS
                </div>
                <div style={{width: '20vw', height: '7vh', fontSize: '2em', color: "#E55529", textAlign:'center'}}>
                  {this.props.disapprovalBehaviorCount+this.props.redirectionsBehaviorCount}
                  ({
                    (((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount)/
                    ((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount) +
                    (this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount))) * 100).toFixed()
                  }%)
                </div>
                <div style={{width: '20vw', height: '4vh', fontSize: '1em', backgroundColor: "#E55529", color:"#ffffff", fontWeight:'bold'}}>
                  {this.props.disapprovalBehaviorCount} DISAPPROVALS
                  ({
                    ((this.props.disapprovalBehaviorCount/
                    ((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount) +
                    (this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount))) * 100).toFixed()
                  }%)
                </div>
                <div style={{width: '20vw', height: '4vh', fontSize: '1em', backgroundColor: "#E99C2E", color:"#ffffff", fontWeight:'bold'}}>
                  {this.props.redirectionsBehaviorCount} REDIRECTIONS
                  ({
                    ((this.props.redirectionsBehaviorCount/
                    ((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount) +
                    (this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount))) * 100).toFixed()
                  }%)
                </div>
              </div>
              <div className='approvals' style={{display: 'inline-block'}}>
                <div style={{width: '20vw', height: '6vh', fontSize: '1.25em', color:  '#009365', display:'inline-block', textAlign:'center'}}>
                  BEHAVIOR APPROVALS
                </div>
                <div style={{width: '20vw', height: '7vh', fontSize: '2em', color: '#009365', textAlign:'center'}}>
                  {this.props.specificBehaviorCount+this.props.nonspecificBehaviorCount}
                  ({
                    (((this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount)/
                    ((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount) +
                    (this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount))) * 100).toFixed()
                  }%)
                </div>
                <div style={{width: '20vw', height: '4vh', fontSize: '1em', backgroundColor: '#FFD300', color:"#ffffff", fontWeight:'bold'}}>
                  {this.props.nonspecificBehaviorCount} NON SPECIFIC
                  ({
                    ((this.props.nonspecificBehaviorCount/
                    ((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount) +
                    (this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount))) * 100).toFixed()
                  }%)
                </div>
                <div style={{width: '20vw', height: '4vh', fontSize: '1em', backgroundColor: '#009365', color:"#ffffff", fontWeight:'bold'}}>
                  {this.props.specificBehaviorCount} SPECIFIC
                  ({
                    ((this.props.specificBehaviorCount/
                    ((this.props.disapprovalBehaviorCount + this.props.redirectionsBehaviorCount) +
                    (this.props.nonspecificBehaviorCount + this.props.specificBehaviorCount))) * 100).toFixed()
                  }%)
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      )
    }
  };


  render() {
    return (
      <>
        {this.CustomUI(this.props)}
      </>
    );
  }
}

BehaviorCounterResults.propTypes = {

};
BehaviorCounterResults.contextType = FirebaseContext;
export default withStyles(styles)(BehaviorCounterResults);

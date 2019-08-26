//props: array of information for data driven coaching questions
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = {
    expansionPanel: {
        overflow: "hidden"
      },
      expansionPanelTitle: {
        variant: "subtitle2",
        fontWeight: "bold",
      },
      expansionPanelText: {
        variant: "body2"
      },
      addButton: {
        fill: "#094492"
      },
};

class DataQuestions extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                {this.props.questions.map((item, index) => (
                    <ExpansionPanel
                        key={index}
                        className={classes.expansionPanel}
                        expanded={this.props.openPanel===item.name}
                        onChange={this.props.handlePanelChange.bind(this, item.name)}
                    >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography
                                className={classes.expansionPanelTitle}
                                style={{textDecoration: this.props.addedToPrep.includes(item.name) ? "underline" : null}}
                            >
                                {item.title}
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container direction="row">
                                <Grid item xs={11}>
                                    <Typography className={classes.expansionPanelText}>
                                        {item.text}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button onClick={this.props.handleAddToPlan.bind(this, item.name)}>
                                        <AddCircleIcon className={classes.addButton}/>
                                    </Button>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(DataQuestions);
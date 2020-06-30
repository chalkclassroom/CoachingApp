// props: questions array of objects with name, title, and text for data driven coaching questions
import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles: object = {
  expansionPanel: {
    overflow: "hidden"
  },
  expansionPanelTitle: {
    variant: "subtitle2",
    fontWeight: "bold"
  },
  expansionPanelText: {
    variant: "body2"
  }
};

interface Style {
  expansionPanel: string,
  expansionPanelTitle: string,
  expansionPanelText: string,
}

interface Props {
  classes: Style,
  questions: Array<{name: string, title: string, text: Array<string>}>,
  openPanel: string,
  handlePanelChange(panel: string): void,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  handleAddToPlan(panelTitle: string, index: number, question: string, sessionId: string, teacherId: string, magic8: string): void,
  sessionId: string,
  teacherId: string,
  magic8: string,
  color: string
}

/**
 * formatting for expansion panel of data-driven coaching questions
 * @class DataQuestions
 */
class DataQuestions extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    questions: PropTypes.arrayOf(PropTypes.exact({
      name: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.array})).isRequired,
    openPanel: PropTypes.string,
    handlePanelChange: PropTypes.func.isRequired,
    addedToPlan: PropTypes.array.isRequired,
    handleAddToPlan: PropTypes.func.isRequired,
    sessionId: PropTypes.string.isRequired,
    teacherId: PropTypes.string.isRequired,
    magic8: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render():React.ReactNode {
    const { classes } = this.props;
    return (
      <div>
        {this.props.questions.map((item, index) => (
          <ExpansionPanel
            key={index}
            className={classes.expansionPanel}
            expanded={this.props.openPanel === item.name}
            onChange={this.props.handlePanelChange.bind(this, item.name)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                className={classes.expansionPanelTitle}
                style={{
                  /* textDecoration: this.props.addedToPlan.includes({panel: item.name, number: index})
                    ? "underline"
                    : null, */
                  fontFamily: "Arimo"
                }}
              >
                {item.title}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container direction="column">
                {item.text.map((question, index) => (
                  <Grid container direction="row" key={index}>
                    <Grid item xs={10}>
                      <div className={classes.expansionPanelText}>
                        <ul style={{fontFamily: "Arimo"}}>
                          {question}
                        </ul>
                      </div>
                    </Grid>
                    <Grid item xs={1}>
                      <Button
                        onClick={this.props.handleAddToPlan.bind(this, item.name, index, question, this.props.sessionId, this.props.teacherId, this.props.magic8)}
                      >
                        <AddCircleIcon style={{fill: this.props.color}} />
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(DataQuestions);

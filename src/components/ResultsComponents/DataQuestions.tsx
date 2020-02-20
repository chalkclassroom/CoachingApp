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
  addedToPrep: Array<string>,
  handleAddToPlan(panel: string): void,
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
    addedToPrep: PropTypes.array.isRequired,
    handleAddToPlan: PropTypes.func.isRequired
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
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
                  textDecoration: this.props.addedToPrep.includes(item.name)
                    ? "underline"
                    : null,
                  fontFamily: "Arimo"
                }}
              >
                {item.title}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container direction="column">
                {item.text.map((questions, index) => (
                  <Grid container direction="row" key={index}>
                    <Grid item xs={10}>
                      <div className={classes.expansionPanelText}>
                        <ul style={{fontFamily: "Arimo"}}>
                          {questions}
                        </ul>
                      </div>
                    </Grid>
                    <Grid item xs={1}>
                      <Button
                        onClick={this.props.handleAddToPlan.bind(this, item.name)}
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

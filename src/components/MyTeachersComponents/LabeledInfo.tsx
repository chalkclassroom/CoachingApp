import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

interface Props {
  label: string,
  field: string,
  classes: Style
}

interface Style {
  container: string,
  labelStyle: string,
  fieldStyle: string,
  notesContainer: string
}

const styles: object = {
  container: {
    flexGrow: 1,
    marginRight: "0em"
  },
  labelStyle: {
    fontSize: "0.7em",
    marginBottom: "0.6em",
    marginTop: "0em"
  },
  fieldStyle: {
    marginBottom: "0.6em",
    marginTop: "0em"
  },
  notesContainer: {
    overflowY: "scroll",
    maxHeight: "4.5em",
    borderBottom: "1px solid #C7C7C7"
  }
};

/**
 * @param {Props} props 
 * @return {ReactElement}
 */
function LabeledInfo(props: Props): React.ReactElement {
  const { label, field, classes } = props;
  return (
    <div className={classes.container}>
      <p className={classes.labelStyle}>{label}:</p>
      {label === "Notes" ? (
        <div className={classes.notesContainer}>
          <p className={classes.fieldStyle}>
            {field.split("\n").map((item, key) => (
              <React.Fragment key={key}>
                {item}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      ) : (
        <p className={classes.fieldStyle}>
          {field.split("\n").map((item, key) => (
            <React.Fragment key={key}>
              {item}
              <br />
            </React.Fragment>
          ))}
        </p>
      )}
    </div>
  );
}

LabeledInfo.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LabeledInfo);

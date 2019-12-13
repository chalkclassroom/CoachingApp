import React, { Fragment } from "react";
import PropTypes from "prop-types";

/**
 * 
 * @param {Props} props 
 * @return {ReactElement}
 */
function LabeledInfo(props) {
  const styles = {
    container: {
      // border: '2px solid #FD8328',
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

  const { container, labelStyle, fieldStyle, notesContainer } = styles;
  const { label, field } = props;

  return (
    <div style={container}>
      <p style={labelStyle}>{label}:</p>
      {label === "Notes" ? (
        <div style={notesContainer}>
          <p style={fieldStyle}>
            {field.split("\n").map((item, key) => (
              <Fragment key={key}>
                {item}
                <br />
              </Fragment>
            ))}
          </p>
        </div>
      ) : (
        <p style={fieldStyle}>
          {field.split("\n").map((item, key) => (
            <Fragment key={key}>
              {item}
              <br />
            </Fragment>
          ))}
        </p>
      )}
    </div>
  );
}

LabeledInfo.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired
};

export default LabeledInfo;

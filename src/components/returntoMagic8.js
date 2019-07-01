import { Button } from '@material-ui/core';
import PropTypes from "prop-types"
import { React } from 'react';

function button (props) {
    const { classes } = props;
    return (
<Button
                            style={{
                                backgroundColor: "#2196F3",
                                opacity: this.state.allowed ? 1 : 0.5,
                                marginLeft: "75%",
                                transform: "scale(1.1)",
                                display: "flex",
                                marginBottom: "5px",
                                color: "white",
                                marginTop: "4vh"
                            }}
                            //onClick pending
                        >Return to Magic 8</Button>
    )

                        }

button.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (button)
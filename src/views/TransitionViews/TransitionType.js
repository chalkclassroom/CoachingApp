import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NavigationIcon from "@material-ui/icons/List";
import PropTypes from "prop-types";

import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2
    }
});

class SimpleMenu extends React.Component {

    state = {
        type: "",
        labelWidth: 0
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <form className={classes.root} autoComplete="off">
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <InputLabel
                            ref={ref => {
                                this.InputLabelRef = ref;
                            }}
                            htmlFor="outlined-transitiontype-simple"
                        >
                            Transition Type
                        </InputLabel>
                        <Select
                            value={this.state.type}
                            onChange={this.handleChange}
                            input={
                                <OutlinedInput
                                    labelWidth={this.state.labelWidth}
                                    name="type"
                                    id="outlined-transitiontype-simple"
                                />
                            }
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Wait Time</MenuItem>
                            <MenuItem value={2}>Inside Classroom</MenuItem>
                            <MenuItem value={3}>Outside Classroom</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            </div>
        );
    }
}

SimpleMenu.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleMenu);

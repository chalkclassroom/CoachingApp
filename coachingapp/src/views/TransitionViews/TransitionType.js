import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NavigationIcon from '@material-ui/icons/List';
import PropTypes from "prop-types";

class SimpleMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const {classes} = this.props;
        const { anchorEl } = this.state;

        return (
            <div>
                <Button variant="extendedFab" aria-label="Delete"
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        color={"secondary"}
                        aria-haspopup="true"
                        onClick={this.handleClick}>
                    <NavigationIcon/>
                    Transition Type
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>Lull</MenuItem>
                    <MenuItem onClick={this.handleClose}>Within ClassRoom</MenuItem>
                    <MenuItem onClick={this.handleClose}>External Classroom</MenuItem>
                </Menu>
            </div>
        );
    }
}

SimpleMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default SimpleMenu;
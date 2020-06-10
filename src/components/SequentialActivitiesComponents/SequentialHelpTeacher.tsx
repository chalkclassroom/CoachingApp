import * as React from 'react';
import * as PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';

const styles: object = {
    example: {
        backgroundColor: "#f3f3f3",
        fontFamily: "Arimo",
        verticalAlign: 'top',
        fontSize: '0.9em',
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
        width: '25%'
    }
};

interface Props {
    classes: {
        example: string,
    }
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
function SequentialHelpTeacher(props: Props): React.ReactElement {
    const {classes} = props;
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding="checkbox" className={classes.example}>
                        <strong>
                            Helping children do sequential activities with manipulatives
                            or toys
                        </strong>
                    </TableCell>
                    <TableCell padding="checkbox" className={classes.example}>
                        <strong>Demonstrating the steps to an activity or game</strong>
                    </TableCell>
                    <TableCell padding="checkbox" className={classes.example}>
                        <strong>
                            Supporting children as they act out a dramatic play scenario
                            or book
                        </strong>
                    </TableCell>
                    <TableCell padding="checkbox" className={classes.example}>
                        <strong>
                            Supporting children&apos;s drawing of an image or writing a message
                        </strong>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell padding="checkbox" className={classes.example}>
                        Asking children if they want to put blocks in order from shortest
                        to tallest
                    </TableCell>
                    <TableCell padding="checkbox" className={classes.example}>
                        Modeling the steps for playing a dice game
                    </TableCell>
                    <TableCell padding="checkbox" className={classes.example}>
                        Inviting children to act out a book with puppets
                    </TableCell>
                    <TableCell padding="checkbox" className={classes.example}>
                        Asking children to talk about their drawing and/or discussing
                        details they could add
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell padding="checkbox" className={classes.example}>
                        Showing children a new puzzle
                    </TableCell>
                    <TableCell padding="checkbox" className={classes.example}>
                        Demonstrating how to sort objects into groups by color, shape,
                        size
                    </TableCell>
                    <TableCell padding="checkbox" className={classes.example}>
                        Joining children&apos;s pretend play as a character to help them act
                        out a predictable scenario (doctor&apos;s office, restaurant, etc.)
                    </TableCell>
                    <TableCell padding="checkbox" className={classes.example}>
                        Inviting children to create a message based on their developmental
                        level (scribbles, letter-like forms, or letters representing
                        beginning sounds)
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

SequentialHelpTeacher.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SequentialHelpTeacher);
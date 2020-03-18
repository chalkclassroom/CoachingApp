import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';

const styles: object = {
  basicSubtitle: {
    backgroundColor: "#1155cc",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: '50%',
    fontFamily: 'Arimo'
  },
  example: {
    backgroundColor: "#f3f3f3",
    color: 'black',
    padding: "1%",
    width: '50%',
    fontFamily: 'Arimo',
    fontSize: '0.9em',
    paddingBottom: '0.5em',
    paddingTop: '0.5em',
    verticalAlign: 'top'
  }
};

interface Props {
  classes: {
    basicSubtitle: string,
    example: string
  }
}

/**
 * 
 * @param {Props} props 
 * @return {ReactElement}
 */
function LOIHelpCardBasic(props: Props): React.ReactElement {
  const { classes } = props;
  return (
    <div>
      <Table padding="checkbox">
        <TableBody>
          <TableRow>
            <TableCell className={classes.basicSubtitle}>
              Ask Low-Level Questions
            </TableCell>
            <TableCell className={classes.basicSubtitle}>
              Teach Specific Skills
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              <strong>
                Teacher asks questions with predetermined answers, with the goal
                of having children learn or recite the correct response.
              </strong>
            </TableCell>
            <TableCell className={classes.example}>
              <strong>
                Teacher gives information about specific, concrete skills
              </strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              <b>What</b> sound does &apos;g&apos; make?
            </TableCell>
            <TableCell className={classes.example}>
              A triangle has 3 sides.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              <b>Show me</b> the number 2.
            </TableCell>
            <TableCell className={classes.example}>
              Run rhymes with fun.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              <b>Do</b> we have more girls or boys here today?
            </TableCell>
            <TableCell className={classes.example}>
              A tree gets water and food from its roots.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

LOIHelpCardBasic.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LOIHelpCardBasic);

import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';

const styles: object = {
  definitionText1: {
    backgroundColor: "#f3f3f3",
    width: "50%",
    fontFamily: "Arimo"
  },
  definitionText2: {
    backgroundColor: "#f3f3f3",
    width: "50%",
    fontFamily: "Arimo"
  },
};

interface Props {
  classes: {
    definitionText1: string,
    definitionText2: string,
  }
}

/**
 * @param {Props} props 
 * @return {ReactElement}
 */
function SequentialHelpDefinitions(props: Props): React.ReactElement {
  const { classes } = props;
  return(
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className={classes.definitionText1}>
            <Typography variant="subtitle2" style={{fontFamily: "Arimo"}}>
              <strong>
                Sequential:
              </strong>
              <br />
              Child follows a predetermined sequence of steps that build
              on each other when doing an activity or using materials.
              <br />
              <br />
              <strong>
                Examples:
              </strong>
              <ul>
                <li>
                  Using manipulatives in a sequenced manner (counting, 
                  sorting, making shapes, etc.)
                </li>
                <li>
                  Building a recognizable structure with blocks (house, zoo)
                </li>
                <li>
                  Acting out a pretend play scenario with a predictable plot
                  and role speech (i.e., clear indication that children are
                  acting as specific characters)
                </li>
              </ul>
            </Typography>
          </TableCell>
          <TableCell className={classes.definitionText2}>
            <Typography variant="subtitle2" style={{fontFamily: "Arimo"}}>
              <strong>
                Non-Sequential:
              </strong>
              <br />
              Child does not follow a predetermined set of steps when doing an
              activity or using materials. It is not clear to the observer that the
              child is working towards a goal involving steps that build on each
              other.
              <br />
              <br />
              <strong>
                Examples:
              </strong>
              <ul>
                <li>
                  Exploring manipulatives in an open-ended manner (scooping and
                  dumping cubes)
                </li>
                <li>
                  Playing with blocks without building something specific
                </li>
                <li>
                  Doing pretend actions that are not part of a predictable plot
                  (i.e., moving pots around on the stove)
                </li>
                <li>
                  Repeatedly shoveling and pouring sand
                </li>
              </ul>
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

SequentialHelpDefinitions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SequentialHelpDefinitions);
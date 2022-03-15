import * as React from 'react';
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import * as PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";
import { Tooltip, Collapse, Card, Divider, Fade } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import LiteracyTypeCard from "../LiteracyComponents/LiteracyTypeCard";
import LiteracyObservationOptions from "../LiteracyComponents/LiteracyObservationOptions";
import * as Constants from '../../constants/Constants';
import LiteracyResultsTrainingBadge from "./LiteracyResultsTrainingBadge";
import TrainingVideo from "./TrainingVideo";

/**
 * specifies styling for modal
 * @return {CSSProperties}
 */
function getModalStyle(): React.CSSProperties {
  return {
    position: "fixed",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  } as React.CSSProperties;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: '#ffffff'
  },
  paper: {
    position: "absolute",
    height: '60vh',
    width: "90%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  },
});

interface Props {
  type: string,
  foundational: boolean,
  writing: boolean,
  reading: boolean,
  language: boolean
}

/**
 * Modal to confirm view results
 * @function LiteracyModal
 * @param {Props} props
 * @return {ReactElement}
 */
function LiteracyResultsTrainingModal(props: Props): React.ReactElement {
  const { type, foundational, writing, reading, language } = props;
  const [literacyType, setLiteracyType] = useState(Constants.LiteracyTypes.NONE);
  const classes = useStyles();
  return (
        <div style={getModalStyle()} className={classes.paper}>
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="flex-start"
            className={classes.root}
          >
            <Grid item style={{width: '100%'}}>
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="flex-end"
                style={{width: '100%'}}
              >
                <Grid item xs={1}>
                  <Fade in={literacyType!==Constants.LiteracyTypes.NONE}>
                    <Grid
                      container
                      alignItems="center"
                      direction="row"
                      justify="flex-end"
                    >
                      <IconButton style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', padding: 10 }}>
                        <Tooltip title={"Back"} placement={"right"}>
                          <ChevronLeftIcon onClick={(): void => setLiteracyType(Constants.LiteracyTypes.NONE)} />
                        </Tooltip>
                      </IconButton>
                    </Grid>
                  </Fade>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h4" align="center" style={{fontFamily: 'Arimo'}}>
                    Literacy Instruction Results Training
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Grid
                    container
                    alignItems="center"
                    direction="row"
                    justify="flex-end"
                  >
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container wrap={'nowrap'} direction={'row'} alignItems={'center'} spacing={3} style={{paddingTop: '1em', height: '100%'}}>
              <Grid item direction="column" justify="space-between" alignItems="center" xs={4} spacing={3}>
               <LiteracyResultsTrainingBadge title={'Foundational Skills'} />
               <LiteracyResultsTrainingBadge title={'Writing'}/>
               <LiteracyResultsTrainingBadge title={'Book Reading'}/>
               <LiteracyResultsTrainingBadge title={'Language Environment'}/>
              </Grid>
              <Grid item direction={'row'} justifyContent={'center'} xs={8}>
                 <TrainingVideo videoUrl={'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Results%20AC%20(CC).mp4?alt=media&token=3c96f321-af7c-4b33-9fd2-d25c565048c0'}/>
              </Grid>
            </Grid>
          </Grid>
        </div>
  );
}

LiteracyResultsTrainingModal.propTypes = {
  foundational: PropTypes.bool.isRequired,
  writing: PropTypes.bool.isRequired,
  reading: PropTypes.bool.isRequired,
  language: PropTypes.bool.isRequired
}

export default LiteracyResultsTrainingModal;
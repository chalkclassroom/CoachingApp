import * as React from 'react';
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import * as PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";
import { Tooltip, List, ListItem, ListItemText, ListItemIcon, Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import * as Constants from '../../constants/Constants';

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
    width: "50%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  },
});

interface Props {
  handleAccept(): void,
  handleClose(): void,
  open: boolean,
  handleLiteracyActivitySetting(activitySetting: string): Promise<void>,
  checklistType: string
}

/**
 * Modal to confirm view results
 * @function ActivitySettingModal
 * @param {Props} props
 * @return {ReactElement}
 */
function ActivitySettingModal(props: Props): React.ReactElement {
  const { handleAccept, handleClose, open, handleLiteracyActivitySetting, checklistType } = props;
  const [activitySetting, setActivitySetting] = useState(0);
  const classes = useStyles();
  type activitySettingsKey = 'FoundationalChild' | 'FoundationalTeacher' | 'WritingChild' | 'WritingTeacher' | 'ReadingTeacher' | 'LanguageTeacher'
  
  return (
    <div>
      <Modal open={open}>
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
                <Grid item xs={1} />
                <Grid item xs={10}>
                  <Typography variant='h5' align='center' style={{fontFamily: 'Arimo'}}>
                    Activity Setting
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Grid
                    container
                    alignItems="center"
                    direction="row"
                    justify="flex-end"
                  >
                    <IconButton style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', padding: 10 }}>
                      <Tooltip title={"Close"} placement={"right"}>
                        <CloseIcon onClick={handleClose} />
                      </Tooltip>
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{width: '100%', paddingTop: '0.5em'}}>
              <Typography style={{fontFamily: 'Arimo'}}>
                Select {checklistType === 'ReadingTeacher' ? 'or create' : null} a label describing the type of {checklistType === 'ReadingTeacher' ? 'text read during this observation' : 'activity that was happening for most of this observation'}:
              </Typography>
            </Grid>
            <Grid item>
              <List>
                {Constants.LiteracyActivitySettings[checklistType as activitySettingsKey].slice(1).map((value, index) => {
                  return(
                    <ListItem
                      key={index}
                      onClick={(): void => {setActivitySetting(index + 1)}}
                      style={{height: '5vh'}}
                    >
                      <ListItemIcon>
                        <Checkbox
                          checked={activitySetting===(index+1)}
                        />
                      </ListItemIcon>
                      <ListItemText disableTypography style={{fontFamily: 'Arimo'}}>
                        {value}
                      </ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
            <Grid item style={{paddingTop: '2em'}}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Button
                  onClick={(): void => {
                    handleLiteracyActivitySetting(Constants.LiteracyActivitySettings[checklistType as activitySettingsKey][activitySetting]).then(() => {
                      handleAccept();
                    })
                  }}
                  disabled={activitySetting===0}
                  variant="contained"
                  color="primary"
                  style={{fontFamily: 'Arimo'}}
                >
                  COMPLETE
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}

ActivitySettingModal.propTypes = {
  handleAccept: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleLiteracyActivitySetting: PropTypes.func.isRequired
}

export default ActivitySettingModal;
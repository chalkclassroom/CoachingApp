import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { Card, Collapse } from "@material-ui/core";
import * as Constants from '../../constants/Constants';
import LockImage from "../../assets/images/LockImage.png";
import CheckmarkImage from "../../assets/images/CheckmarkImage.png";
import {MuiThemeProvider} from '@material-ui/core/styles';

interface Props {
  type: number,
  title: string,
  descriptionText: string | JSX.Element,
  literacyType: number,
  setLiteracyType: React.Dispatch<React.SetStateAction<LiteracyTypes>>,
  activity: string,
  unlocked: boolean
}

enum LiteracyTypes {
  NONE = 0,
  FOUNDATIONAL = 1,
  WRITING = 2,
  READING = 3,
  LANGUAGE = 4
}

/**
 * Collapsible Card and Info Text for Literacy Types
 * @function LiteracyTypeCard
 * @param {Props} props
 * @return {ReactElement}
 */
function LiteracyTypeCard(props: Props): React.ReactElement {
  const { type, title, descriptionText, literacyType, setLiteracyType, activity, unlocked } = props;
  return (
    <Collapse in={literacyType===LiteracyTypes.NONE || literacyType === type} style={{width: '100%'}}>
      <Grid item style={{paddingBottom: '1em'}}>
        <Grid container direction="row" justify="space-around" alignItems="center">
          <Grid item xs={3}>
            <MuiThemeProvider theme={Constants.TransparentTheme}>
              <Badge
                invisible={
                  ((activity==='Observe' || activity==='Results') && unlocked)
                  || (activity==='Training' && !unlocked)
                }
                color="primary"
                badgeContent={<img alt="Locked" src={activity === 'Training' ? CheckmarkImage : LockImage} height='150%' />}
                style={{width: '100%'}}
              >
            <Card
              onClick={(): void => {
                if (unlocked || activity === 'Training') {
                  literacyType === type ? setLiteracyType(LiteracyTypes.NONE) : setLiteracyType(type)
                }
              }}
              elevation={(unlocked || activity === 'Training') ? 8 : 0}
              style={{
                // color: (unlocked || activity === 'Training') ? Constants.Colors.LI : Constants.Colors.NotPresent,
                color: Constants.Colors.LI,
                height: '7em',
                borderColor: Constants.Colors.LI,
                // borderColor: (unlocked || activity === 'Training') ? Constants.Colors.LI : Constants.Colors.NotPresent,
                borderWidth: '1px',
                borderStyle: 'solid',
                width: '100%'
              }}
            >
              <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
                <Typography variant="h5" align="center" style={{fontFamily: 'Arimo', fontWeight: 'bold', padding: '0.5em'}}>
                  {title}
                </Typography>
              </Grid>
            </Card>
            </Badge>
            </MuiThemeProvider>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="subtitle1" style={{fontFamily: 'Arimo', paddingLeft: '0.5em', paddingRight: '0.5em'}}>
              {descriptionText}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Collapse>
  );
}

LiteracyTypeCard.propTypes = {
  type: PropTypes.number.isRequired,
  literacyType: PropTypes.number.isRequired,
  setLiteracyType: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  descriptionText: PropTypes.string.isRequired
}

export default LiteracyTypeCard;
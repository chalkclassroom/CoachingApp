import React, { FunctionComponent } from 'react';
import CheckmarkImage from "../../assets/images/CheckmarkImage.png";
import LockImage from "../../assets/images/LockImage.png";
import {Card} from "@material-ui/core";
import * as Constants from "../../constants/Constants";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

interface OwnProps {
  title: string,
  setLiteracyType?: () => void
}

type Props = OwnProps;

const LiteracyResultsTrainingBadge: FunctionComponent<Props> = (props) => {
const {title, setLiteracyType = () => null} = props
  return (
    <Grid style={{paddingBottom: '1em'}}>
    <Badge
      color="primary"
      // badgeContent={<img alt="Locked" src={activity === 'Training' ? CheckmarkImage : LockImage} height='150%' />}
      style={{width: '100%'}}
    >
      <Card
        // onClick={(): void => {
        //   if (unlocked || activity === 'Training') {
        //     literacyType === type ? setLiteracyType(Constants.LiteracyTypes.NONE) : setLiteracyType(type)
        //   }
        // }}
        elevation={8}
        style={{
          color: Constants.Colors.LI,
          height: '7em',
          borderColor: Constants.Colors.LI,
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
    </Grid>
  );
};

export default LiteracyResultsTrainingBadge;

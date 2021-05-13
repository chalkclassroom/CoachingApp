import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Card, Collapse } from "@material-ui/core";
import * as Constants from '../../constants/Constants';

interface Props {
  type: number,
  title: string,
  descriptionText: string | JSX.Element,
  literacyType: number,
  setLiteracyType: React.Dispatch<React.SetStateAction<LiteracyTypes>>
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
  const { type, title, descriptionText, literacyType, setLiteracyType } = props;
  return (
    <Collapse in={literacyType===LiteracyTypes.NONE || literacyType === type} style={{width: '100%'}}>
      <Grid item style={{paddingBottom: '1em'}}>
        <Grid container direction="row" justify="space-around" alignItems="center">
          <Grid item xs={3}>
            <Card
              onClick={(): void => {literacyType === type ? setLiteracyType(LiteracyTypes.NONE) : setLiteracyType(type)}}
              elevation={4}
              style={{
                color: Constants.Colors.LI,
                height: '7em',
                borderColor: Constants.Colors.LI,
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
            >
              <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
                <Typography variant="h5" align="center" style={{fontFamily: 'Arimo', fontWeight: 'bold', padding: '0.5em'}}>
                  {title}
                </Typography>
              </Grid>
            </Card>
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
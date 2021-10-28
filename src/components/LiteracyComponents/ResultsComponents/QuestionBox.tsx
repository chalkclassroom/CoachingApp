import * as React from 'react';

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { MuiThemeProvider } from '@material-ui/core/styles'

import * as Constants from '../../../constants/Constants'

interface Props {
  categoryClick(category: number)
  index: number,
  categoryView: number
  value: object,
  literacyType: Constants.LiteracyTypes
}

// eslint-disable-next-line require-jsdoc
function QuestionBox (props: Props) {
  const { categoryClick, index, value, categoryView } = props;

  return (
    <Grid item key={index}>
    <MuiThemeProvider
        theme={Constants.ListeningTheme}
    >
        <Button
            onClick={(): void => categoryClick(index + 1)}
            variant="contained"
            style={{
                width: '11vw',
                height: '9em',
                backgroundColor: categoryView === index + 1 ? Constants .Colors.LI : '#f5f5f5',
                textTransform: 'none',
            }}
        >
            <Typography
                style={{ color: categoryView === index + 1 ? 'white' : 'black' }}
            >
                {value}
            </Typography>
        </Button>
    </MuiThemeProvider>
</Grid>
  );
}

export default QuestionBox;
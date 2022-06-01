import React, { FunctionComponent } from 'react'
import Typography from '@material-ui/core/Typography/Typography'

interface OwnProps {
  graphTitle: string
}

type Props = OwnProps

const GraphHeader: FunctionComponent<Props> = props => {
  return (
    <Typography
      align="center"
      variant="h5"
      style={{ fontFamily: 'Arimo', paddingBottom: '0.5em' }}
    >
      {props.graphTitle}
    </Typography>
  )
}

export default GraphHeader

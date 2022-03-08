import * as React from "react";

type Props ={
  bold?: boolean,
  duration?: number
}

export default function SuggestedDuration(props: Props) {
  const {bold = true, duration = 30 } = props
  return (
    <p style={{fontWeight: bold ? 900 : 500}}>Suggested observation length: {duration} minute{duration > 1 ? 's': ''} or more</p>
  )
  
}
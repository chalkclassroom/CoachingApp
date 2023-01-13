import * as React from 'react'

/*
 * These are for the tone averages that show beneath Classroom Climate's Trends chart
 */
class ClimateToneTrends extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render(){
    return(
      <div style={{width: '86%', display: 'flex', position: 'relative', justifyContent: 'flex-start'}}>
        <div style={{position: 'absolute', left: '-80px'}}>
          <h4>Teacher Tone</h4>
        </div>
        <div style={{width: 'calc(100% - 67px)', display: 'flex', flexDirection: 'row', transform: 'translateX(42px)'}}>
          {this.props.toneAverageTrend.map(
            (value, index) => {
              var align = 'flex-start';

              var middleItemTransform = value > 0 ? 'translateX(-4px)' : 'translateX(-13px)'

              var newValue = value > 0 ? value : "N/A";

              var content = <h4 style={{fontWeight: 400, transform: middleItemTransform}}>{newValue}</h4>;

              // The numbers in the middle are slightlyyy off center
              if(index !== 0 && index !== (this.props.toneAverageTrend.length - 1))
              {
                content = <h4 style={{fontWeight: 400, transform: middleItemTransform}}>{newValue}</h4>;
              }

              /*
               * We want to check if we're on the second to last one. If we are we want to show the last value in the same div
               *
               * Ex: |0       |1      |2      3|
               */
              if(index === (this.props.toneAverageTrend.length - 2) )
              {
              content = <><h4 style={{fontWeight: 400, transform: middleItemTransform}}>{newValue}</h4><h4 style={{fontWeight: 400, transform: this.props.toneAverageTrend[index + 1] > 0 ? 'translateX(0px)' : "translateX(12px)"  }}>{this.props.toneAverageTrend[index + 1] > 0 ? this.props.toneAverageTrend[index + 1] : "N/A"}</h4></>
                align = 'space-between';
              }

              // Skip if we're at the last one.
              if(index === (this.props.toneAverageTrend.length - 1) )
              {
                return;
              }

              return (
                <div style={{flex: '1', alignItems: 'center', }}>
                  <div className={"item"} style={{display: "flex", justifyContent: align, }}>
                    {content}
                  </div>
                </div>
              )
          })}
        </div>
      </div>
    )
  }
}

export default ClimateToneTrends;

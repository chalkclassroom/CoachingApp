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
              var content = <h4 style={{fontWeight: 400}}>{value}</h4>;

              // The numbers in the middle are slightlyyy off center
              if(index !== 0 && index !== (this.props.toneAverageTrend.length - 1))
              {
                content = <h4 style={{fontWeight: 400, transform: 'translateX(-4px)'}}>{value}</h4>;
              }

              /*
               * We want to check if we're on the second to last one. If we are we want to show the last value in the same div
               *
               * Ex: |0       |1      |2      3|
               */
              if(index === (this.props.toneAverageTrend.length - 2) )
              {
                content = <><h4 style={{fontWeight: 400, transform: 'translateX(-4px)'}}>{value}</h4><h4 style={{fontWeight: 400}}>{this.props.toneAverageTrend[index + 1]}</h4></>
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

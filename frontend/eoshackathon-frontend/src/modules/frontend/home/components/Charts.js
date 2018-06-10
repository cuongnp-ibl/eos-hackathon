import React, { Component } from 'react'
import { Pie } from 'react-chartjs'

const chartData = [
  {
    value: 14000000,
    color: '#F7464A',
    highlight: '#FF5A5E',
    label: 'Lending'
  },
  {
    value: 4000000,
    color: '#46BFBD',
    highlight: '#5AD3D1',
    label: 'Available Fund'
  }
]

const chartOptions = {
  // Boolean - Whether we should show a stroke on each segment
  segmentShowStroke: true,

  // String - The colour of each segment stroke
  segmentStrokeColor: '#fff',

  // Number - The width of each segment stroke
  segmentStrokeWidth: 2,

  // Number - The percentage of the chart that we cut out of the middle
  percentageInnerCutout: 0, // This is 0 for Pie charts

  // Number - Amount of animation steps
  animationSteps: 100,

  // String - Animation easing effect
  animationEasing: 'easeOutBounce',

  // Boolean - Whether we animate the rotation of the Doughnut
  animateRotate: true,

  // Boolean - Whether we animate scaling the Doughnut from the centre
  animateScale: false,
  // String - A legend template
  legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>'
}

class Charts extends Component {
  componentDidMount () {
    const { getTokenStatus } = this.props

    getTokenStatus()
  }

  render () {
    const { tokenStatus } = this.props
    chartData[0].value = tokenStatus.currentLending
    chartData[1].value = tokenStatus.availabe

    return (
      <div className='row'>
        <div className='inf-charts col-md-12'>
          <div
            style={{
              width: 350,
              height: 350,
              backgroundColor: '#00788a',
              opacity: '0.9',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              position: 'absolute',
              top: 40,
              right: 200,
              flexDirection: 'column'
            }}
          >
            <div style={{}}>
              <h4 style={{ color: 'white' }}>WE ARE HAVING</h4>
              <p style={{ color: 'white' }}>Currently in lending: <strong>{Intl.NumberFormat({ style: 'currency', currency: 'USD' }).format(tokenStatus.currentLending)}</strong>USD</p>
              <p style={{ color: 'white' }}>Foundation available fund: <strong>{Intl.NumberFormat({ style: 'currency', currency: 'USD' }).format(tokenStatus.availabe)}</strong>USD</p>
            </div>
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    )
  }
}

export default Charts

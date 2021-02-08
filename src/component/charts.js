import React, { Component } from 'react'
import StateChart from './charts/state'
import CourseChart from './charts/course'

class Charts extends Component {
    render() {
        return (
            <div className="chart_modal" >
                <div className="data_modals">
                    <StateChart handleChartClick={this.props.handleChartClick} />
                </div>
                <div className="data_modals">
                    <CourseChart handleChartClick={this.props.handleChartClick}/>
                </div>
            </div>
        )
    }
}


export default Charts
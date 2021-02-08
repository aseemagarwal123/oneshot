import React, { Component } from 'react'
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios'


class CourseChart extends Component {
    state = {
        state: [],
        count: []
    }
    componentDidMount() {
        axios.get("https://blue-sapling.herokuapp.com/api/v1/college/collegebycourse").then(async (res) => {
            let data = []
            console.log(res)
            await Promise.all(res.data.response.result.colleges.map(val => {

                data.push([val._id, val.count])
            }))
            this.setState({
                count: data
            })
        })
    }
    render() {
        const options = Highcharts.Options = {
            title: {
                text: 'State wise chart',
                style: { color: "white" }
            },
            series: [{
                name: "count",
                type: 'pie',
                data: this.state.count,
                // dataLabels: false
            }],
            chart: {
                backgroundColor: "white",
                style: { color: "black" }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        color: 'black'
                    },
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (data) {
                                console.log(data.point.name)
                                this.props.handleChartClick({course:data.point.name})
                            }.bind(this)
                        }
                    }
                }
            },
        }
        return (
            <React.Fragment>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />

            </React.Fragment>
        )
    }
}


export default CourseChart
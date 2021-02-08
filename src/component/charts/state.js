import React, { Component } from 'react'
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios'


class StateChart extends Component {
    state = {
        state : [],
        count : []
    }
    componentDidMount () {
        axios.get("https://blue-sapling.herokuapp.com/api/v1/college/collegebystate").then(async(res)=>{
            let data = []
            console.log(res)
            await Promise.all(res.data.response.result.colleges.map(val=>{

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
                name:"count",
                type: 'pie',
                data: this.state.count,
                // dataLabels : false
                
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
                                this.props.handleChartClick({state:data.point.name})
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


export default StateChart
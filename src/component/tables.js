import React, { Component } from 'react'
import CollegeTable from './tables/college'
import { FilterFilled, RightOutlined } from '@ant-design/icons';
import { Select, Radio } from 'antd';
import { state, branchs } from '../helper/constants'
import CollegeModal from './collegeModal'
const { Option } = Select;


class Table extends Component {
    state = {
        // state : "",
        // course : "",
        college:false
    }
    componentDidUpdate(prevProps) {
        if(this.props != prevProps) {
            this.setState({
                state : this.props.state,
                branch : this.props.course
            })
        }
    }
    handleBranchs = (data) => {
        this.setState({
            branch : data
        })
    }
    handleState = (data) => {
        this.setState({
            state : data
        })
    }

    handleCollege = (data) => {
        this.setState({
            college : data
        })
    }
    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <div className="table_filter" >
                    <div className="filters">
                        <Select
                            placeholder="Branches"
                            // defaultValue={""}
                            value={this.state.branch}
                            onChange={this.handleBranchs}
                            className="filter_layout"
                        >
                            {branchs.map((value, index) =>
                                <Option key={value}>{value}</Option>
                            )}
                        </Select>
                    </div>
                    <div className="filters">
                        <Select
                            placeholder="State"
                            // defaultValue={[]}
                            value = {this.state.state}
                            onChange={this.handleState}
                            className="filter_layout"
                        >
                            {state.map((value, index) =>
                                <Option key={value}>{value}</Option>
                            )}
                        </Select>
                    </div>
                </div>
                <div style={{ width: "100%", overflowX: "scroll" }}>
                    <CollegeTable state={this.state.state} branch={this.state.branch} handleCollege={this.handleCollege} />
                </div>
                {this.state.college && <CollegeModal handleCollege={this.handleCollege}  college={this.state.college} />}
            </React.Fragment>
        )
    }
}

export default Table
import React, { Component } from 'react'
import { Tag , Button} from 'antd'
import { branchs } from '../helper/constants'
import StudentTable from './tables/student'
import { CloseOutlined } from '@ant-design/icons';
import axios from 'axios'
class CollegeModal extends Component {
    state = {
        similarCollege : []
    }
    componentDidMount () {
        axios.get('https://blue-sapling.herokuapp.com/api/v1/college/getsimilarcolleges/'+ this.props.college._id).then((res)=>{
            this.setState({
                similarCollege : res.data.response.result.colleges
            })
        })
    }
    render() {
        return (
            <React.Fragment>
                <div className="modal_background" >
                    <div className="modal_layout" >
                        <Button onClick={()=>this.props.handleCollege(false)} style={{position:"sticky", top:"0", right:"0", float:"right"}} type="primary" >  <CloseOutlined/>  </Button>
                        <div className="modal_cover" >
                            <div className="modal_college_name">
                                {this.props.college.name}
                            </div>
                        </div>
                        <br />
                        <div className="charts_layout" >
                            <div className="college_data">
                            <div className="data_modals " >
                                <h3>Number of students : {this.props.college.number_of_students}</h3>
                                <h3>Location : {this.props.college.city}, &nbsp; {this.props.college.state}, &nbsp; {this.props.college.country}</h3>
                                
                                <h3>Year Founded : {this.props.college.year_founded}</h3>
                   
                                <h3>Branches Available </h3>
                                {this.props.college.courses.map((val, index) =>
                                    <Tag style={{ margin: "5px" }} color={"green"} key={index} >{val.replaceAll("_"," ")}</Tag>
                                )}

                            </div>
                            <div className="data_modals" >
                                <h3>Similar Colleges </h3>
                                <br/>
                                {this.state.similarCollege.map((val,index)=>
                                    <Tag onClick={()=>this.props.handleCollege(val)} key={index} color={"magenta"} style={{margin:"5px", cursor:"pointer"}} > {val.name} </Tag>
                                )}
                            </div>
                            </div>
                            <div className="data_modals" >
                                <StudentTable collegeID={this.props.college._id}/>
                            </div>
                        </div>



                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default CollegeModal
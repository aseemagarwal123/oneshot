import React, { Component } from 'react'
import './App.css';
import 'antd/dist/antd.css';
import NavBar from './component/NavBar'
import Charts from './component/charts'
import Table from './component/tables'
class App extends Component {
  state = {
  }
  handleChartClick = (data) => {
    if(data.course) {
      this.setState({
        course : data.course
      })
    }
    else {
      this.setState({
        state : data.state
      })
    }
    
  }
  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <NavBar></NavBar>

        <div className="charts_layout">
          <div style={{width:"100%"}}>
            <div className="data_modals" >
              <Table state={this.state.state}  course={this.state.course} />
            </div>
          </div>
          <Charts handleChartClick={this.handleChartClick} ></Charts>
        </div>
      </React.Fragment>
    )
  }
}

export default App;

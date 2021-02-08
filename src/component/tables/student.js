import React, { Component } from 'react'
import { Table, Tag, Space , Input, Button} from 'antd';
import axios from 'axios'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

class StudentTable extends Component {
    state = {
        data: [],
        searchText: '',
        searchedColumn: ''
    }
    componentDidMount() {
        axios.get("https://blue-sapling.herokuapp.com/api/v1/college/getstudentlist/"+this.props.collegeID).then((res) => {
            this.setState({
                data: res.data.response.result.student
            })
        })
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  this.setState({
                    searchText: selectedKeys[0],
                    searchedColumn: dataIndex,
                  });
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select(), 100);
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    
      handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };
    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name'),
                render: text => <a>{text}</a>,
            },
            {
                title: 'Batch',
                dataIndex: 'batch_year',
                key: 'batch_year',
            },
            {
                title: 'Skills',
                dataIndex: 'skills',
                render: skill => (
                    <>
                        {skill.map((tag,index) => {
        
                            return (
                                <React.Fragment>
                                    <Tag color={"green"} key={tag}>
                                        {tag.toUpperCase().replaceAll("_"," ")}
                                    </Tag>
                                    
                                </React.Fragment>
                            );
                        })}
                    </>
                ),
            },
        ]
        return (
            <Table columns={columns} dataSource={this.state.data} />
        )
    }
}


export default StudentTable
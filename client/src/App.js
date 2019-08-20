import React, { useState, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Input, Table, Button } from 'antd';
import { Typography } from 'antd';
import axios from 'axios'

const { Title } = Typography;

const { Search } = Input;

function App() {

  const [list, setList] = useState([]);

  const getData = () => {
    axios.get("http://localhost:3001/photos")
      .then(res => {
        console.log(res);
        setList(res.data)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getData();
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => <img style={{width:"50px"}} src={record.url} alt="url"></img>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record) =>
        <>
          <Button onClick={() => handleDelete(record.id)}>Delete</Button>
        </>,
    },
  ];

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/photos/' + id)
      .then(response => {
        const data = list.filter(
          list => list.id !== id
        )
        setList(data);
      })
      .catch(error => console.log(error))
  }

  const handleDestroyAll = () => {
    axios.post('http://localhost:3001/photos/destroy_all')
      .then(response => {
        console.log(response);
        setList(response.data)
      })
      .catch(error => console.log(error))
  }

  const handleSearch = (value) => {
    axios.post('http://localhost:3001/photos/find', {params: {key:{value}}})
      .then(response => {
        console.log(response);
        // setList(response.data)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <Title>NASA Api Example</Title>
      <Search
        placeholder="input search text"
        onSearch={value => {handleSearch(value)}}
        style={{ width: 1000 }}
      />
      <Button type="danger" onClick={handleDestroyAll}>Destroy all data</Button>
      <Table dataSource={list} columns={columns} />
    </div>
  );
}

export default App;

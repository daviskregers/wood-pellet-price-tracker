import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import axios from 'axios';
import {Table} from 'react-materialize';
import moment from 'moment'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      aggregations: [],
      prices: [],
    };
  }

  componentDidMount() {

    axios.get( `/api/prices`)
      .then(res => {
        const prices = res.data.data;

        this.setState({
          prices: prices
        });

      })

      axios.get('/api/chart').then( res => {
        
        const aggregations = res.data.data;
        this.setState({
          aggregations: aggregations
        });

      })

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          <h1>Wood pellet price tracker</h1>
          <p>
            uses <a href="https://www.ss.com/lv/production-work/firewood/granules/" target="_blank" rel="noopener noreferrer">SS.com</a> adverts to track price changes.
          </p>
        </header>

        <h3>Average price over time</h3>

        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>

            <LineChart
              data={this.state.aggregations}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date"
                domain = {['auto', 'auto']}
                name = 'Time'
                tickFormatter={ (timestring => moment(timestring * 1000) ) }
                type = 'number'
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="average" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <br />
        <br />

        <h3>Current listings</h3>

        <Table striped={true} bordered={true} hoverable={true}>
          <thead>
            <tr>
              <th data-field="date">date</th>
              <th data-field="price">price</th>
              <th data-field="title">title</th>
              <th data-field="url">url</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.prices).map((k, i) => {
              let data = this.state.prices[k];
              return (
                <tr key={i}>
                  <td>{data.date}</td>
                  <td>{data.price}</td>
                  <td>{data.title}</td>
                  <td><a target="_blank" rel="noopener noreferrer" href={data.url}>View</a></td>
                </tr>
              );
            })}
          </tbody>
        </Table>

      </div>
    );
  }
}

export default App;

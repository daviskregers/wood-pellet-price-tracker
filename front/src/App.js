import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import axios from 'axios';
import {Table} from 'react-materialize';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      aggregations: [],
      prices: [],
    };
  }

  componentDidMount() {

    axios.get(`http://localhost:4000/api/prices`)
      .then(res => {
        const aggregations = res.data.data.aggregations;
        const prices = res.data.data.prices;

        this.setState({
          aggregations: aggregations,
          prices: prices
        });

        console.log(aggregations)

      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Wood pellet price tracker</h1>
          <p>
            uses <a href="https://www.ss.com/lv/production-work/firewood/granules/" target="_blank">SS.com</a> adverts to track price changes.
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
              <XAxis dataKey="date" />
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

        <Table>
          <thead>
            <tr>
              <th>date</th>
              <th>price</th>
              <th>title</th>
              <th>url</th>
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
                  <td><a target="_blank" href={data.url}>View</a></td>
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

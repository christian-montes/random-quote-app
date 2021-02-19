import React, { Component } from "react";
import ReactDOM from "react-dom";
// eslint-disable-next-line no-unused-vars
import _ from "lodash"
import { Row, Button } from 'react-bootstrap';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// Creating the Redux Store
const FETCH = 'FETCH';

const fetchQuote = (data) => {
  return {
    type: FETCH,
    data
  }
}

const quoteReducer = (state = '', action) => {
  switch (action.type) {
    case FETCH:
      return action.data
    
    default:
      return state
  }
}

const store = createStore(quoteReducer);

// Creating React Component


class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      error: null,
      quoteData: ''
    };
    this.newQuote = this.newQuote.bind(this);
    this.tweetQuote = this.tweetQuote.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  // Calling the random quote generator API every click
  fetchData() {
    this.setState({...this.state, isFetching: true});
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({quoteData: result, isFetching: false});
          console.log(result);
        })
      .catch(e => {
        console.log(e);
        this.setState({...this.state, isFetching: false})
      });

    // eslint-disable-next-line react/prop-types
    this.props.sendNewData(this.state.data);
    this.setState({
      quoteData: ''
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  newQuote() {
    console.log('new quote')
  }

  tweetQuote() {
    console.log('tweet quote')
  }

  render() {
    return (
      <div>
        <Row>
          <h2>Welcome to the Random Quote Machine</h2>
        </Row>
        <span>{this.state.quoteData['author']}</span>
        <Row>
          <Button>Tweet Quote</Button>
          <Button variant='secondary' onClick={this.fetchData}>Get New Quote</Button>
        </Row>
      </div>
    )
  }
}

// creating functions for the Provider component
const mapStateToProps = (state) => {
  return {quotes: state}
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendNewData: (quote) => {
      dispatch(fetchQuote(quote));
    } 
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Quote);

class AppWrapper extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    )
  }
}

const containerElem = document.createElement('div');
containerElem.setAttribute('id', 'root');
document.body.appendChild(containerElem);

ReactDOM.render(<AppWrapper />, document.getElementById("root"));
import React, { Component } from "react";
import ReactDOM from "react-dom";
// eslint-disable-next-line no-unused-vars
import _ from "lodash"
import { Row, Col, Jumbotron } from 'react-bootstrap';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
// import './app.scss';

// Creating the Redux Store
const FETCH = 'FETCH';

const fetchQuote = (quote) => {
  return {
    type: FETCH,
    quote: quote
  }
}

const quoteReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH:
      return action.quote
    
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
      APIData: ''
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
          this.setState({APIData: result, isFetching: false});
          // eslint-disable-next-line react/prop-types
          this.props.sendNewData(this.state.APIData);
          console.log(result);
        })
      .catch(e => {
        console.log(e);
        this.setState({...this.state, isFetching: false})
      });


    this.setState({
      APIData: ''
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
      <div className='container-fluid'>
        <Row>
          <h2>Welcome to the Random Quote Machine</h2>
        </Row>
        <Jumbotron fluid>
          <p className='lead'>
            {/*eslint-disable-next-line react/prop-types*/}
            {this.props.quotes['author']}
          </p>
          {/*eslint-disable-next-line react/prop-types*/}
          {this.props.quotes['content']}
        </Jumbotron>
        <Row>
          <Col>
            <button className='btn btn-primary btn-block col-md-6'>Tweet Quote</button>
          </Col>
          <Col>
            <button className='btn btn-danger col-md-6' onClick={this.fetchData}>Get New Quote</button>
          </Col>
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
      dispatch(fetchQuote(quote))
    } 
  }
};

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
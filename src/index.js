import React, { Component } from "react";
import ReactDOM from "react-dom";
// eslint-disable-next-line no-unused-vars
import _ from "lodash"
import { Row, Col, Jumbotron } from 'react-bootstrap';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.scss';

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

const store = createStore(quoteReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Creating React Component


class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      error: null,
      APIData: '',
      link: ''
    };
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

  tweetQuote() {
    const encodedText = encodeURI(this.props.quotes['content']);
    const tweetLink = `//www.twitter.com/intent/tweet?text=${encodedText}`
    this.setState({...this.state, link: tweetLink})
    console.log('Tweeted');
  }

  render() {

    const quoteStyle = {
      'fontSize': '2.5rem'
    }

    const authorStyle = {
      'fontSize': '1.5rem'
    }
    console.log(this.state.link)

    return (
      <div id= 'quote-box' className='container-fluid mx-auto col-md-8 col-xs-12'>
        <Row className='d-flex col-md-8 col-xs-12 justify-content-start mx-auto'>
          <h2>Welcome to the Random Quote Machine</h2>
        </Row>
        <Jumbotron className='mx-auto col-md-8 col-xs-12' fluid>
          <span id='text' style={quoteStyle}>
            &quot;{this.props.quotes['content']}&quot;
          </span>
          <br />
          <span id='author' style={authorStyle} className='float-right px-2 font-italic'>
            {/*eslint-disable-next-line react/prop-types*/}
            -{this.props.quotes['author']}
          </span>
        </Jumbotron>
        <Row className='mx-auto col-md-8 col-xs-12'>
          <Col>
            {/*eslint-disable-next-line react/jsx-no-target-blank*/}
            <a
              id='tweet-quote'
              className='btn btn-primary btn-block' 
              onClick={this.tweetQuote}
              href={this.state.link} 
              target='_blank' ><FontAwesomeIcon icon={faTwitter}/> Tweet Quote
            </a>
          </Col>
          <Col>
            <button 
              id='new-quote'
              className='btn btn-danger btn-block' 
              onClick={this.fetchData}>Get New Quote</button>
          </Col>
        </Row>
      </div>
    )
  }
}


Quote.propTypes = {
  sendNewData: PropTypes.func.isRequired,
  quotes: PropTypes.object.isRequired
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
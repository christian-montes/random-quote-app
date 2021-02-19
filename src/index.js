import React from "react";
import ReactDOM from "react-dom";
// eslint-disable-next-line no-unused-vars
import _ from "lodash"

class Welcome extends React.Component {
  render() {
    return <h1>Hello World from React boilerplate</h1>;
  }
}

const containerElem = document.createElement('div');
containerElem.setAttribute('id', 'root');
document.body.appendChild(containerElem);

ReactDOM.render(<Welcome />, document.getElementById("root"));
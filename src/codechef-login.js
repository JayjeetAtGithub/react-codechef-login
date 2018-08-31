import React, { Component } from "react";
import PropTypes from "prop-types";
import { toQueryString, getParams } from "./utils";
import "./styles.css";

const AUTHORIZATION_URL = "https://api.codechef.com/oauth/authorize?";
const TOKEN_URL = "https://api.codechef.com/oauth/token";

const loginButton = {
  display: "inline-block",
  background: "rgb(218, 216, 216)",
  color: "rgb(58, 38, 38)",
  width: 200,
  paddingTop: 10,
  paddingBottom: 10,
  borderRadius: 2,
  border: "1px solid transparent",
  fontSize: 16,
  height: 50
};

export default class CodechefLogin extends Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func.isRequired,
    clientId: PropTypes.string.isRequired,
    clientSecret: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    state: PropTypes.string.isRequired,
    className: PropTypes.string,
    redirectUri: PropTypes.string.isRequired,
    responseType: PropTypes.string
  };

  static defaultProps = {
    buttonText: "Login With Codechef",
    className: "loginButton",
    responseType: "code"
  };

  componentDidMount() {
    if (window.location.search.includes("code")) {
      this.getAccessToken(getParams("code").trim()).then(response => {
        this.props.onSuccess(response);
      });
    } else if (window.location.search.includes("error")) {
      this.props.onFailure(new Error(getParams("error-description")));
    }
  }

  getAccessToken(authorizationCode) {
    return fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: authorizationCode,
        client_id: this.props.clientId,
        client_secret: this.props.clientSecret,
        redirect_uri: this.props.redirectUri
      })
    })
      .then(response => response.json())
      .catch(err => this.onFailure(new Error(err)));
  }

  onButtonClick() {
    const { clientId, state, redirectUri } = this.props;
    const queryString = toQueryString({
      response_type: this.props.responseType,
      client_id: clientId,
      redirect_uri: redirectUri,
      state: state
    });
    window.location.href = AUTHORIZATION_URL + queryString;
  }

  render() {
    return (
      <button className={this.props.className} style={loginButton} onClick={this.onButtonClick}>
        {this.props.buttonText}
      </button>
    );
  }
}




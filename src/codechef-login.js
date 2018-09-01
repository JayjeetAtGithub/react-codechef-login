import React, { Component } from "react";
import PropTypes from "prop-types";
import { toQueryString, getParams } from "./utils";
import styles from "./styles.css";

const AUTHORIZATION_URL = "https://api.codechef.com/oauth/authorize?";
const TOKEN_URL = "https://api.codechef.com/oauth/token";

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
      .catch(err => this.props.onFailure(new Error(err)));
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
    let buttonStyle;
    if (this.props.className) {
      buttonStyle = this.props.className;
    } else {
      buttonStyle = styles.loginButton;
    }

    return (
      <button className={buttonStyle} onClick={this.onButtonClick}>
        {this.props.buttonText}
      </button>
    );
  }
}

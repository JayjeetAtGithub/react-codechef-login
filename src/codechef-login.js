/**
 * Copyright (c) 2018 Jayjeet Chakraborty.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 *
 * @description A React Package to integrate Codechef OAuth2.0 Login with React apps
 * @author Jayjeet Chakraborty <jc.github@rediffmail.com>
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { toQueryString, getParams } from "./utils";
import styles from "./styles.css";
import { AUTHORIZATION_URL, TOKEN_URL } from "./urls";

/**
 *
 * @description Represents a class based component - CodechefLogin
 * @class
 *
 */
export default class CodechefLogin extends Component {
  /**
   *
   * @description Initializes the CodechefLogin component
   * @constructor
   *
   */
  constructor(props) {
    super(props);
  }

  /**
   *
   * @description Defines the type of props required to be passed through the component
   * @static
   * @memberof CodechefLogin
   *
   */
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

  /**
   *
   * @description Defines default values for props not specified through the component
   * @static
   * @memberof CodechefLogin
   *
   */
  static defaultProps = {
    buttonText: "Login With Codechef",
    responseType: "code"
  };

  /**
   *
   * @description Called after the react component is rendered completely
   * @function componentDidMount
   *
   */
  componentDidMount() {
    if (window.location.search.includes("code")) {
      this.getAccessToken(getParams("code").trim()).then(response => {
        this.props.onSuccess(response);
      });
    } else if (window.location.search.includes("error")) {
      this.props.onFailure(new Error(getParams("error")));
    }
  }

  /**
   *
   * @description Get the access token from the authorization code
   * @async
   * @function getAccessToken
   * @param {string} authorizationCode
   *
   */
  getAccessToken = authorizationCode => {
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
      .catch(err => this.props.onFailure(err));
  };

  /**
   *
   * @description Responds to button click event
   * @function onButtonClick
   *
   */
  onButtonClick = () => {
    const { clientId, state, redirectUri } = this.props;
    const queryString = toQueryString({
      response_type: this.props.responseType,
      client_id: clientId,
      redirect_uri: redirectUri,
      state: state
    });
    window.location.href = AUTHORIZATION_URL + queryString;
  };

  /**
   *
   * @description Renders the component in the browser
   * @function render
   *
   */
  render() {
    let buttonStyle = this.props.className
      ? this.props.className
      : styles.loginButton;

    return (
      <button className={buttonStyle} onClick={this.onButtonClick}>
        {this.props.buttonText}
      </button>
    );
  }
}



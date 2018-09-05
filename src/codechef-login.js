/**
 * @license
 * Copyright (c) 2018 Jayjeet Chakraborty.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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



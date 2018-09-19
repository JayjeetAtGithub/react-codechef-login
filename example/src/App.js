/**
 * Copyright (c) 2018 Jayjeet Chakraborty.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from "react";
import CodechefLogin from "react-codechef-login";
import "./App.css";

const responseCodechef = response => {
  console.log(response);
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <CodechefLogin
          clientId="your-client-id"
          clientSecret="your-client-secret"
          redirectUri="redirect-uri"
          state="state-string"
          onSuccess={responseCodechef}
          onFailure={responseCodechef}
        />
      </div>
    );
  }
}

export default App;

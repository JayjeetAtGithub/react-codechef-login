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


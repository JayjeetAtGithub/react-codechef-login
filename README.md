# React Codechef Login

> A Codechef OAuth Sign-in / Log-in Component for React

[![NPM](https://img.shields.io/npm/v/react-codechef-login.svg)](https://www.npmjs.com/package/react-codechef-login) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-codechef-login
```

## Usage

```jsx
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
          clientId="abcd5hdy8hdb63bd"
          clientSecret="2gd5dhfbd7sn8ff"
          redirectUri="http://localhost:3000"
          state="xyzabc"
          className="my-fav-class"
          buttonText="Login Now"
          onSuccess={responseCodechef}
          onFailure={responseCodechef}
        />
      </div>
    );
  }
}

export default App;
```

### Props

#### `clientId`

`{string}` _required_

Client ID for Codechef OAuth application

#### `clientSecret`

`{string}` _required_ 

Client Secret for Codechef OAuth application

#### `redirectUri`

`{string}` _required_

Registered redirect URI for Codechef OAuth application

#### `state`

`{string}` _required_

State parameter for your application

#### `buttonText`

`{string}` 

Text to display on the button

#### `className`

`{string}` 

CSS class for login button

#### `onSuccess`

`{function}` _required_

Callback for successful login

#### `onFailure`

`{function}` _required_

Callback for errors raised during login




## License

MIT © [JayjeetAtGithub](https://github.com/JayjeetAtGithub)

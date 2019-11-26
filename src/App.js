import React, { Component } from "react";
import "./App.css";
import FacebookLoginButton from "./components/FacebookLoginButton";

class App extends Component {
    state = {
        username: null
    };

    onFacebookLogin = (loginStatus, resultObject) => {
        if (loginStatus === true) {
            this.setState({
                username: resultObject,
                loginStatus: true
            });
        } else {
            alert("Facebook login error");
        }
    };

    render = () => {
        const test = this.state;
        console.log(this.state);

        if (this.state.loginStatus === true) {
            console.log(this.state);
            return (
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">React Social Media Login</h1>
                    </header>

                    <div className="App-intro">
                        {!test.username && (
                            <div>
                                <p>Click on one of any button below to login</p>
                                <FacebookLoginButton
                                    onLogin={this.onFacebookLogin}
                                >
                                    <button>Facebook</button>
                                </FacebookLoginButton>
                            </div>
                        )}
                        {<p>Welcome back, </p>}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">React Social Media Login</h1>
                    </header>

                    <div className="App-intro">
                        {!test.username && (
                            <div>
                                <p>Click on one of any button below to login</p>
                                <FacebookLoginButton
                                    onLogin={this.onFacebookLogin}
                                >
                                    <button>Facebook</button>
                                </FacebookLoginButton>
                            </div>
                        )}
                        {<p>Welcome back, </p>}
                    </div>
                </div>
            );
        }
    };
}

export default App;

import React, { Component } from "react";
import "./App.css";
import FacebookLoginButton from "./components/FacebookLoginButton";

class App extends Component {
    state = {
        username: null,
        loginStatus: false
    };

    onFacebookLogin = (loginStatus, resultObject) => {
        if (loginStatus === true) {
            console.log(resultObject);
            this.setState({
                username: resultObject.name,
                businesses: resultObject.businesses,
                loginStatus: true
            });
        } else {
            alert("Facebook login error");
        }
    };

    render = () => {
        if (this.state.loginStatus === true) {
            console.log(this.state.businesses.data);
            const listItems = this.state.businesses.data.map(d => (
                <li key={d.name}>{d.name}</li>
            ));
            const listAdAccounts = this.state.businesses.data[0].owned_ad_accounts.data.map(
                e => <li key={e.name}>{e.name}</li>
            );
            const listCampaigns = this.state.businesses.data[0].owned_ad_accounts.data[0].campaigns.data.map(
                e => <li key={e.name}>{e.name}</li>
            );

            const allCampaignLinks = this.state.businesses.data[0].owned_ad_accounts.data[0].campaigns.data[0].ads.data.map(
                e => (
                    <li key={e.id}>
                        {e.adcreatives.data[0].instagram_permalink_url}
                    </li>
                )
            );
            console.log(
                this.state.businesses.data[0].owned_ad_accounts.data[0]
                    .campaigns.data[0].ads.data
            );
            return (
                <div className="App">
                    <p>Welcome back, {this.state.username}</p>
                    <p>{listItems}</p>
                    <p>{listAdAccounts}</p>
                    <p>{listCampaigns}</p>
                    <p>{allCampaignLinks}</p>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">React Social Media Login</h1>
                    </header>

                    <div className="App-intro">
                        <div>
                            <p>Click on one of any button below to login</p>
                            <FacebookLoginButton
                                onLogin={this.onFacebookLogin}
                            ></FacebookLoginButton>
                        </div>
                    </div>
                </div>
            );
        }
    };
}

export default App;

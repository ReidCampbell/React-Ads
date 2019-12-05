import React, { Component } from "react";

export default class FacebookLogin extends Component {
    componentDidMount() {
        document.addEventListener(
            "FBObjectReady",
            this.initializeFacebookLogin
        );
    }

    componentWillUnmount() {
        document.removeEventListener(
            "FBObjectReady",
            this.initializeFacebookLogin
        );
    }

    /**
     * Init FB object and check Facebook Login status
     */
    initializeFacebookLogin = () => {
        this.FB = window.FB;
        this.checkLoginStatus();
    };

    /**
     * Check login status
     */
    checkLoginStatus = () => {
        this.FB.getLoginStatus(this.facebookLoginHandler);
    };

    /**
     * Check login status and call login api is user is not logged in
     */
    facebookLogin = () => {
        if (!this.FB) return;

        this.FB.getLoginStatus(response => {
            if (response.status === "connected") {
                this.facebookLoginHandler(response);
            } else {
                this.FB.login(this.facebookLoginHandler, {
                    scope: "ads_management"
                });
            }
        });
    };

    facebookLoginHandler = response => {
        if (response.status === "connected") {
            this.FB.api(
                "/me",
                "GET",
                {
                    fields:
                        "businesses{owned_ad_accounts{name,campaigns{name,ads{name,adcreatives{instagram_permalink_url,effective_object_story_id}}}},name},name"
                },
                response => {
                    let result = {
                        ...response,
                        user: response.name,
                        businesses: response.businesses
                    };
                    this.props.onLogin(true, result);
                }
            );
        } else {
            this.props.onLogin(false);
        }
    };

    render() {
        return (
            <>
                <button onClick={this.facebookLogin}>login</button>
            </>
        );
    }
}

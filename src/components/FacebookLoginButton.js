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

    getBusinesses = () => {
        const businesses = [];

        this.FB.api("/me", "GET", { fields: "businesses" }, function(response) {
            // Insert your code here
            response.businesses.data.forEach(business => {
                businesses.push(business.name);
            });
        });
        return businesses;
    };

    getAdAccounts = () => {
        const adAccounts = [];
        this.FB.api(
            "/154403932593174",
            "GET",
            { fields: "owned_ad_accounts{name}" },
            function(response) {
                // Insert your code here
                response.owned_ad_accounts.data.forEach(adAccount => {
                    adAccounts.push(adAccount);
                });
            }
        );
        return adAccounts;
    };

    getCampaigns = () => {
        const campaigns = [];

        this.FB.api(
            "act_728737454299043",
            "GET",
            {
                fields:
                    "campaigns{adsets{ads{adcreatives{instagram_permalink_url,effective_object_story_id},name},name},name}"
            },
            function(response) {
                // Insert your code here
                response.campaigns.data.forEach(campaign => {
                    campaigns.push(campaign);
                });
            }
        );
        return campaigns;
    };

    /**
     * Handle login response
     */
    facebookLoginHandler = response => {
        if (response.status === "connected") {
            this.FB.api("/me/accounts", userData => {
                let result = {
                    ...response,
                    user: userData
                };
                this.props.onLogin(true, result);
                this.getCampaigns();
                this.getBusinesses();
                this.getAdAccounts();
            });
        } else {
            this.props.onLogin(false);
        }
    };

    render() {
        let { children } = this.props;
        return <div onClick={this.facebookLogin}>{children}</div>;
    }
}

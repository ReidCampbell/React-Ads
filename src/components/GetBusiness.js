import React, { Component } from 'react'

export default class GetBusiness extends Component {
  
    const businesses = [];
  
    this.FB.api("/me", "GET", { fields: "businesses" }, function(response) {
        // Insert your code here
        response.businesses.data.forEach(business => {
            businesses.push(business);
        });
    });
    console.log(businesses);
  
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

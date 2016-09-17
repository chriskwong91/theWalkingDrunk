import React from 'react';
import {browserHistory} from 'react-router';

let signup = () => {
  /* ENABLES FACEBOOK SDK */
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1059720117468553',
      xfbml      : true,
      version    : 'v2.7'
      });
    };
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  var facebookLogin = () => {
    document.location.href='/auth/facebook';
    // browserHistory.push('/auth/facebook');
    // fetch('/auth/facebook')
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(value => {
    //     console.log('value in signup.jsx is: ', value);

    //   })
    //   .catch(err => {
    //     console.error(`API error: ${err}`);
    //   });

  };
  return (
    <div className='signup valign-wrapper'>
      <div className="welcome thin center-align">
        <p className="p-welcome">Welcome to YelpCrawl</p>
        <button onClick={facebookLogin} className='btn fb-button'>Sign in with FaceBook</button>
        <div className="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="false"></div>
      </div>
    </div>
  );
};

export default signup;


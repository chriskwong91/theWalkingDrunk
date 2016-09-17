import React from 'react';

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
  };
  // <div class="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="false"></div>
  return (
    <div>
      <div className='signup'>
        <div className="welcome">
          <p className="span-welcome center-align">foodCrawl</p>
        </div>
      </div>
      <div className="fb-button-div">
        <button onClick={facebookLogin} className='btn fb-button center'>Sign in with FaceBook</button>
      </div>
    </div>
  );
};

export default signup;


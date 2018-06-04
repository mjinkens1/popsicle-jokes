import React from 'react';
import './App.css';
const axios = require('axios');

// Facebook SDK ========================================================================================================================================
window.fbAsyncInit = function() {
  window.FB.init({
    appId            : '203534870262491',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v3.0'
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

// Declare helper functions ==============================================================================================================================

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function urlToClipboard() {
  var copyText = document.createElement('textarea');
  copyText.value = 'http://popsicle-jokes.com/';
  document.body.appendChild(copyText);
  copyText.select();
  document.execCommand("copy");
  document.body.removeChild(copyText);
};

// Declare React components ===============================================================================================================================

class Header extends React.Component {
  render() {
    return (
      <div className='site-name'>POPSICLE-JOKES</div>
    );
  };
};

class Controls extends React.Component {
  render() {
    return (
    <div className='controls'>
      <div className='controls-item'>
        <div className='tooltip-text'>SHOW<br/>PUNCHLINE</div>
        <a href='' className="fas fa-fw fa-play" onClick={this.props.handleClick}></a>
      </div>
      <div className='controls-item'>
        <div className='tooltip-text'>NEW JOKE</div>
        <a href='' className="fas fa-fw fa-step-forward" onClick={this.props.handleClick}></a>
      </div>
      <div className='controls-item'>
        <div className='tooltip-text'>RESET</div>
        <a href='' className="fas fa-fw fa-undo-alt" onClick={this.props.handleClick}></a>
      </div>

    </div>
    );
  };
};

class Popsicle extends React.Component {
  render() {
    return (
      <div className='wrapper'>
        <div className='stick'>
          <Controls handleClick={this.props.handleClick} />
          <h2 className='joke'>{this.props.joke}</h2>
          <h2 className='punchline'>{this.props.punchline}</h2>
        </div>
        <div className={'popsicle ' + this.props.hidden}>
        </div>
      </div>
    );
  };
};

class Social extends React.Component {
  render() {
    return (
      <div className='social'>
        <div className='social-item'>
          <a href='' className="fab fa-fw fa-facebook-f" onClick={this.props.handleClick}></a>
          <div className='tooltip-text'>SHARE<br/>ON<br/>FACEBOOK</div>
        </div>
        <div className='social-item'>
          <a href={'https://twitter.com/intent/tweet?&text=' + encodeURIComponent('http://popsicle-jokes.com/')}
             className="fab fa-fw fa-twitter" onClick={this.props.handleClick}></a>
          <div className='tooltip-text'>SHARE<br/>ON<br/>TWITTER</div>
        </div>
        <div className='social-item'>
          <a href='' className="fas fa-fw fa-link" onClick={this.props.handleClick}></a>
           {this.props.linkToolTip}
        </div>
      </div>
    );
  };
};

class App extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      hidden: '',
      jokeArr: [],
      index: 0,
      joke: '',
      punchline: '',
      linkToolTip: <div className='tooltip-text'>&nbsp;SHARE<br/>&nbsp;LINK</div>
    };
    this.handleClick = this.handleClick.bind(this);
    this.componentDidMount.bind(this);
  };

  componentDidMount() {
    var currentComponent = this;
    axios.get('/data', {
      params: {}
     })
     .then(function (response) {
       var index = getRandomInt(response.data.length);
       currentComponent.setState({index: index});
       currentComponent.setState({jokeArr: response.data});
       currentComponent.setState({joke: currentComponent.state.jokeArr[index].content.joke});
     })
     .catch(function (error) {
       console.log(error);
     });
  }

  async handleClick(event) {
    event.preventDefault();
    if(event.target.className.split(' ').indexOf('fa-play') !== -1) {
      // keep punchline hidden until first reveal so it doesn't show during image loading
      if(this.state.punchline === '')
        this.setState({punchline: this.state.jokeArr[this.state.index].content.punchline});
      // hide popsicle to reveal punchline
      this.setState({hidden: 'hidden'});
    }
    else if (event.target.className.split(' ').indexOf('fa-step-forward') !== -1) {
      //unhide popsicle
      this.setState({hidden: ''});
      // get random joke
      var index = getRandomInt(this.state.jokeArr.length);
      // make sure new index is different than current index
      while(index == this.state.index) {
        index = getRandomInt(this.state.jokeArr.length);
      };

      await this.setState({index: index});
      this.setState({joke: this.state.jokeArr[this.state.index].content.joke});
      this.setState({punchline: this.state.jokeArr[this.state.index].content.punchline});
    }
    else if (event.target.className.split(' ').indexOf('fa-undo-alt') !== -1) {
      // unhide popsicle without changing joke
      this.setState({hidden: ''});
    }
    else if (event.target.className.split(' ').indexOf('fa-facebook-f') !== -1) {
        // facebook share dialog
        window.FB.ui({
        method: 'share',
        display: 'popup',
        href: 'http://popsicle-jokes.com/',
      }, function(response){});
    }
    else if (event.target.className.split(' ').indexOf('fa-link') !== -1) {
      // copy site url to clipboard
      urlToClipboard();
      //  change tooltip to indicate link copied to clipboard
      this.setState({linkToolTip: <div className='tooltip-text'>&nbsp;LINK<br/>&nbsp;COPIED TO<br/>&nbsp;CLIPBOARD</div>});
      setTimeout(() => {
        // return tooltip to default state
        this.setState({linkToolTip: <div className='tooltip-text'>&nbsp;SHARE<br/>&nbsp;LINK</div>});
      }, 1500);
    };
  };
  render() {
    return (
      <div className='app'>
        <Popsicle
          hidden={this.state.hidden}
          joke={this.state.joke}
          punchline={this.state.punchline}
          handleClick={this.handleClick}
          />
        <Social
          linkToolTip={this.state.linkToolTip}
          handleClick={this.handleClick}
          />
      </div>
    );
  };
};

export default App;

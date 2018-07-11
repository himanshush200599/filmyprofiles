import React , { Component } from 'react';
import './auth.css';
var firebase = require('firebase');

var config = {

apiKey: "AIzaSyBUUaByENtH-QWL3w1AIW1rcjXeQo4_aXE",

authDomain: "filmy-profiles.firebaseapp.com",

databaseURL: "https://filmy-profiles.firebaseio.com",

projectId: "filmy-profiles",

storageBucket: "filmy-profiles.appspot.com",

messagingSenderId: "82052180042"

};

firebase.initializeApp(config);

 class Auth extends Component {
   login(event){

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then(user => {
      var lout = document.getElementById('logout');

      //Write a welcome message for user
      lout.classList.remove('hide');
    });

    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err: err});
    });
  }

  signup(){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
    .then(user => {
      var err = "Welcome "+ user.email;
      firebase.database().ref('users/'+user.uid).set({
        email: user.email
      });
      console.log(user);
      this.setState({err: err});
    });
    promise
    .catch(e => {
      var err = e.message;
      console.log(err);
      this.setState(({err: err}));
    });
  }

  logout(){
    firebase.auth().signOut();
    var lout = document.getElementById('logout');

    //Write a thanks message for user
    lout.classList.add('hide');
  }

  google(){
    console.log("I am in google method");

    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = firebase.auth().signInWithPopup(provider);

    promise.then( result => {
      var user = result.user;
      console.log(result);
      firebase.database().ref('users/'+user.uid).set({
        email: user.email,
        name: user.displayName
      });

    });
    promise.catch(e => {
      var msg = e.message;
      console.log(msg);
    });

  }
  facebook(){
    console.log("I am in facebook method");

    var provider = new firebase.auth.FacebookAuthProvider();
    var promise = firebase.auth().signInWithPopup(provider);

    promise.then( result => {
      var user = result.user;
      console.log(result);
      firebase.database().ref('users/'+user.uid).set({
        email: user.email,
        name: user.displayName
      });

    });
    promise.catch(e => {
      var msg = e.message;
      console.log(msg);
    });

  }

  constructor(props){
    super(props);

    this.state = {
      err: ''
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
    this.facebook = this.facebook.bind(this);
  }
   render(){
     return(
       <div>
         <nav className="navbar navbar-expand-lg navbar-light bg-light">

    <a className="navbar-brand" href="#"><img src='./images/logo.PNG' className="img-responsive" /></a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <form className="form-inline my-2 my-lg-0 ml-auto" >
        <input className="form-control mr-sm-2" ref='email' id='email' type="email" placeholder="username" aria-label="Search" />
      <input className="form-control mr-sm-2" ref = 'password' id='pass'  type="password" placeholder="password" aria-label="Search" />


      <button className="btn btn-primary my-2 my-sm-0" id='login' type="submit" onClick={this.login}>LogIn</button>
        <button className="btn btn-primary my-2 my-sm-0 hide" id='logout' type="submit"  onClick={this.logout}>LogOut</button>
      </form>
    </div>
  </nav>
  <div className='row'>
    <div className='col-md-8 col-lg-8 col-sm-12'>
      <div>
      <img src='./images/image_main.png' className="imgMain" />
      </div>
  </div>






     <div className ='col-md-8 col-lg-4 col-sm-12'>
       <div id='box'>
       <div>
        <h2>JOIN US</h2>
        </div>
        <div>
          <button onClick={this.facebook} id="google" className="facebook btn btn-primary">Facebook</button>

        </div>

        <div>
         <button onClick={this.google} id="google" className="google btn btn-primary ">Google</button>

   </div>
   <div className='or1'>
    <span className='or'>OR </span>
   </div>
   <div className='form'>
       <form>
     <div className="form-group">

       <input type="email" ref='email' className="form-control"  aria-describedby="emailHelp" placeholder="username"/>

     </div>
     <div className="form-group">

       <input type="password" ref='password' className="form-control" id="passw" placeholder="Password"/>
     </div>
     <div className="form-group">

       <input type="number" ref='mobile' className="form-control" id="number" placeholder="Mobile No"/>
     </div>
     <button type="submit" id='submit' className="btn btn-primary" onClick={this.signup}>Submit</button>
   </form>
   </div>

     </div>

   </div>
  </div>
  <footer className='footer'>
    <div className='row'>


    <div className='col-md-8' >
     <img src='./images/bottom.PNG' className='img-responsive' />
    </div>
    <div className='col-md-4 condt'>
     <span id='faq'>FAQs</span>
     <span id='about'>About us</span>
     <span id='contact'>contact us</span>
     <span>Terms</span>
    </div>
      </div>
  </footer>
       </div>
     );
 }
 }
export default Auth;

import React , { Component } from 'react';
import './auth.css';
var firebase  = require("firebase");


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
   render(){
     return(
       <div>
         <nav className="navbar navbar-expand-lg navbar-light">

    <a className="navbar-brand" href="#"><img src='./images/logo.PNG' className="img-responsive" id='upperLogo' alt='logo' /></a>
    <button className="navbar-toggler d-none d-sm-none " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse d-none d-sm-none d-md-block" id="navbarSupportedContent">
      <div className="form-inline my-2 my-lg-0 ml-auto" >
        <input className="form-control mx-sm-2 mr-sm-2" ref='email' id='email' type="email" placeholder="username" aria-label="Search" />
      <input className="form-control mr-sm-2" ref = 'password' id='pass'  type="password" placeholder="password" aria-label="Search" />
</div>
      <div className='navBtn'>
      <button className="btn btn-primary my-2 my-sm-0" id='login' type="submit" onClick={this.login}>LogIn</button>
        <button className="btn btn-primary my-2 my-sm-0 hide" id='logout' type="submit"  onClick={this.logout}>LogOut</button>
      </div>

    </div>
  </nav>


  <div className='row'>
    <div className='col-md-12 col-lg-8 col-sm-12 col-xs-12 d-none d-sm-none d-md-block'>
      <div className="relativeImg">
      <img src='./images/image_main.png' className="imgMain img-responsive mr-auto" alt='road-scene' />
      <p className='absolute-text'><strong>LOREM IPSUM TEXT <br />GOES HERE....</strong></p>
      <p className='text2'><strong>This is sub tagline</strong> </p>
        <div className="ml-0 mr-0 row align-items-end user1">
        <div className="col grid1">
    <strong>  USER 1</strong>
        </div>
        <div className="col grid2">
          <strong> USER 2  </strong>
        </div>
        <div className="col grid3">
          <strong> USER 3  </strong>
        </div>
      </div>
      </div>
      <div>
        <div className="card-deck">
          <div className="card">
            <img className="card-img-top" src="./images/p1.png" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">here some text</p>

            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src="./images/p2.png" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">here some text </p>

            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src="./images/p3.png" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">here some text</p>

            </div>
          </div>
        </div>



      </div>

</div>




     <div className ='col-md-12 col-xl-4 col-lg-4 col-sm-12 col-xs-12 d-none d-sm-none d-md-block'>
       <div id='head'>
         <h3 id="number"><strong>Number of Users</strong></h3>
         <p className='pnumber'><strong>172,286</strong> <span id="many"> and many more .....</span></p>
       </div>
       <div id='box'>
       <div>
        <h2 id='join'><strong>JOIN US</strong></h2>
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


       <div>
     <div className="form-group">

       <input type="email" ref='email' className="form-control"  aria-describedby="emailHelp" placeholder="Username"/>

     </div>
     <div className="form-group">

       <input type="password" ref='password' className="form-control" id="passw" placeholder="Password"/>
     </div>
     <div className="form-group">

       <input type="number" ref='mobile' className="form-control" id="number" placeholder="Mobile No"/>
     </div>
     <button type="submit" id='submit' className="btn btn-primary" onClick={this.signup}>Submit</button>
   </div>
   </div>

     </div>
<div className='offer'>
  <p id='special'><strong>SPECIAL OFFER</strong></p>
</div>
   </div>
  </div>
<div id='mobileBox' className='d-block d-sm-none'>
  <div className='form'>


      <div>
        <div>
          <h3 id="ipsum">Lorem Ipsum Dolor Sit <br /> Amit Si</h3>
        </div>
    <div className="form-group">

      <input className="form-control mx-sm-2 mr-sm-2" ref='email' id='email' type="email" placeholder="Username" aria-label="Search" />


    </div>
    <div className="form-group">

    <input className="form-control mr-sm-2" ref = 'password' id='pass'  type="password" placeholder="Password" aria-label="Search" />
    </div>
<div>
    <button className="btn btn-primary btn-lg" id='login' type="submit" onClick={this.login}><strong>Login</strong></button>
      <button className="btn btn-primary btn-lg hide" id='logout' type="submit"  onClick={this.logout}><strong>LogOut</strong></button>
  </div>
</div>

  </div>
  <div>
   <p id='dont'>Don't Have an Account?<a href="#" id='slink' className='text-primary'> Sign Up Here</a></p>
  </div>
  <div className='or1'>
   <span className='or'>OR </span>
  </div>
  <div>
    <button onClick={this.facebook} id="google" className="facebook btn btn-primary">Facebook</button>

  </div>

  <div>
   <button onClick={this.google} id="google" className="google btn btn-primary ">Google</button>

</div>
</div>
  <footer  className="page-footer my-theme-bg-blue center-on-small-only nopadding ">
    <div className='row'>


    <div className='col-2 col-lg-4' >
     <img src='./images/bottom.PNG' className='img-responsive mr-0 ml-0 pull-left condtn showb' alt='bottom logo' />
     <img src='./images/logo_phone.png' className=' hideb display-xs-inline' id ='fimage' alt='bottom logo' />
    </div>
    <div className='col-10 col-lg-8 condt'>
      <div id="foot">
     <span id='faq'>FAQs</span>
     <span id='about'>About Us</span>
     <span id='contact'>Contact Us</span>
     <span id='terms'>Terms</span>
     </div>
    </div>
      </div>
  </footer>
       </div>
     );
   }
 }
export default Auth;

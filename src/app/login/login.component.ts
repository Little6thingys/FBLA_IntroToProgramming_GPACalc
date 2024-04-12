import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Replace these with your actual client ID and redirect URI
  CLIENT_ID = '363481054949-rdjqegcv16p0d37jhcthqnf82b7s5gho.apps.googleusercontent.com';
  REDIRECT_URI = 'http://localhost:4200/gpa-auto';

  loginWithImplicitGrant() {
    let authUrl = 'https://accounts.google.com/o/oauth2/v2/auth' +
      '?response_type=token' +
      '&client_id=' + encodeURIComponent(this.CLIENT_ID) +
      '&redirect_uri=' + encodeURIComponent(this.REDIRECT_URI) +
      '&scope=' + encodeURIComponent('https://www.googleapis.com/auth/classroom.coursework.students');

    window.location.href = authUrl;
  }
}


// Below code is for backend server
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {

// }

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   // Replace these with your actual client ID and redirect URI
//   CLIENT_ID = '363481054949-6plarohgt0sibqtnq0l8ub8ejvnp5g43.apps.googleusercontent.com';
//   REDIRECT_URI = 'https://localhost:4200/gpa-auto';

//   login() {
//     let authUrl = 'https://accounts.google.com/o/oauth2/v2/auth' +
//       '?response_type=token' +
//       '&client_id=' + encodeURIComponent(this.CLIENT_ID) +
//       '&redirect_uri=' + encodeURIComponent(this.REDIRECT_URI) +
//       '&scope=' + encodeURIComponent('https://www.googleapis.com/auth/userinfo.profile');

//     window.location.href = authUrl;
//   }
// }
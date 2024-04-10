import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gpa-auto',
  standalone: true,
  imports: [],
  templateUrl: './gpa-auto.component.html',
  styleUrl: './gpa-auto.component.css'
})
export class GpaAutoComponent {
  accessToken: string = '';

  ngOnInit() {
    const fragment = window.location.hash.substring(1);
    const params = new URLSearchParams(fragment);
    this.accessToken = params.get('access_token') || 'no access token found';
    console.log(this.accessToken);
  }
}

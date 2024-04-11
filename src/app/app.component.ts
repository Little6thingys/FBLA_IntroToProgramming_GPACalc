import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GpaCalcComponent } from './gpa-calc/gpa-calc.component';
import { GradingScaleComponent } from './gpa-calc/grading-scale/grading-scale.component';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//import { GoogleApiService } from './google-api.service';
import { NgModule } from "@angular/core";
import { NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    GpaCalcComponent,
    GradingScaleComponent,
    CommonModule,
    RouterModule,
    NgOptimizedImage
  ],
  templateUrl: './app.component.html',
//   template: `<main>
    
  
//   <section class="content">
//     <app-gpa-calc></app-gpa-calc>
//   </section>
// </main>`,
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements AfterViewInit {
  @ViewChild('tawkContainer') tawkContainer!: ElementRef;

  ngAfterViewInit(): void {
    const s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.type = 'text/javascript';
    s1.async=true;
    s1.src='https://embed.tawk.to/661315dca0c6737bd12949a5/1hqt8qprg';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    this.tawkContainer.nativeElement.appendChild(s1);
  }
  title = 'GPA_CALC';

 // constructor(private readonly google: GoogleApiService) {}

  // showGradingScale: boolean = false;

  // toggleGradingScale(){
  //   this.showGradingScale = !this.showGradingScale;
  // }

  // receiveOpenGS($event: boolean) {
  //   this.showGradingScale = $event;
  // }

  // receiveCloseGS($event: boolean) {
  //   this.showGradingScale = $event;
  // }


}




/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
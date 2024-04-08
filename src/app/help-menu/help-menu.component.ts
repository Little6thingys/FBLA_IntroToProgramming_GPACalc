import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-help-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './help-menu.component.html',
  styleUrl: './help-menu.component.css'
})
export class HelpMenuComponent {
  faq_1: boolean = false;
  faq0: boolean = false;
  faq1: boolean = false;
  faq2: boolean = false;
  faq3: boolean = false;
  faq4: boolean = false;
  faq5: boolean = false;
  faq6: boolean = false;
  faq7: boolean = false;
  faq8: boolean = false;
  faq9: boolean = false;

  searchKeyword: string = '';

  searchFAQ(key: string) {
    this.faq_1 = false;
    this.faq0 = false;
    this.faq1 = false;
    this.faq2 = false;
    this.faq3 = false;
    this.faq4 = false;
    this.faq5 = false;
    this.faq6 = false;
    this.faq7 = false;
    this.faq8 = false;
    this.faq9 = false;
    if (
      'How do I use this GPA Calculator'
        .toLowerCase()
        .indexOf(key.toLowerCase()) !== -1
    ) {
      this.faq_1 = true;
    }
    if (
      'How does the GPA Report work'
        .toLowerCase()
        .indexOf(key.toLowerCase()) !== -1
    ) {
      this.faq0 = true;
    }
    if (
      'How do I calculate my High School Semester GPA'
        .toLowerCase()
        .indexOf(key.toLowerCase()) !== -1
    ) {
      this.faq1 = true;
    }
    if (
      'What affect do AP and Honors courses have on my GPA'
        .toLowerCase()
        .indexOf(key.toLowerCase()) !== -1
    ) {
      this.faq2 = true;
    }
    if (
      'How can I calculate my total GPA (using cumulative GPA)'
        .toLowerCase()
        .indexOf(key.toLowerCase()) !== -1
    ) {
      this.faq3 = true;
    }
    if (
      'Should I take a lot of AP and Honors courses'
        .toLowerCase()
        .indexOf(key.toLowerCase()) !== -1
    ) {
      this.faq4 = true;
    }
    if (
      'Is it more important to take more AP and Honors classes or is it more important to have better grades in less challenging classes'
        .toLowerCase()
        .indexOf(key.toLowerCase()) !== -1
    ) {
      this.faq5 = true;
    }
    if (
      'What is considered a good GPA'
        .toLowerCase()
        .indexOf(key.toLowerCase()) !== -1
    ) {
      this.faq6 = true;
    }
    if (
      'What is the highest high school GPA possible'
        .toLowerCase()
        .indexOf(key.toLowerCase()) !== -1
    ) {
      this.faq7 = true;
    }
    if (
      'Is high school GPA important for college'
        .toLowerCase()
        .indexOf(key.toLowerCase()) !== -1
    ) {
      this.faq8 = true;
    }
    if (
      ' If I have a low GPA, does that mean I cannot go to a good college anymore'
        .toLowerCase()
        .indexOf(key.toLowerCase()) !== -1
    ) {
      this.faq9 = true;
    }
  }
}

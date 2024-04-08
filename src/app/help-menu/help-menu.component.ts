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
  showFAQ: boolean = false;
  showQ_1: boolean = false;
  showQ0: boolean = false;
  showQ1: boolean = false;
  showQ2: boolean = false;
  showQ3: boolean = false;
  showQ4: boolean = false;
  showQ5: boolean = false;
  showQ6: boolean = false;
  showQ7: boolean = false;
  showQ8: boolean = false;
  showQ9: boolean = false;

  faq_1: boolean = true;
  faq0: boolean = true;
  faq1: boolean = true;
  faq2: boolean = true;
  faq3: boolean = true;
  faq4: boolean = true;
  faq5: boolean = true;
  faq6: boolean = true;
  faq7: boolean = true;
  faq8: boolean = true;
  faq9: boolean = true;

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
    
    if (key == "") {
        this.faq_1 = true;
        this.faq0 = true;
        this.faq1 = true;
        this.faq2 = true;
        this.faq3 = true;
        this.faq4 = true;
        this.faq5 = true;
        this.faq6 = true;
        this.faq7 = true;
        this.faq8 = true;
        this.faq9 = true;
    }
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

  changeFAQ()
  {
    this.showFAQ = ! this.showFAQ;
  }

  changeQ_1()
  {
    this.showQ_1 = ! this.showQ_1;
  }

  changeQ0()
  {
    this.showQ0 = ! this.showQ0;
  }

  changeQ1()
  {
    this.showQ1 = ! this.showQ1;
  }

  changeQ2()
  {
    this.showQ2 = ! this.showQ2;
  }

  changeQ3()
  {
    this.showQ3 = ! this.showQ3;
  }

  changeQ4()
  {
    this.showQ4 = ! this.showQ4;
  }

  changeQ5()
  {
    this.showQ5 = ! this.showQ5;
  }

  changeQ6()
  {
    this.showQ6 = ! this.showQ6;
  }

  changeQ7()
  {
    this.showQ7 = ! this.showQ7;
  }
  changeQ8()
  {
    this.showQ8 = ! this.showQ8;
  }

  changeQ9()
  {
    this.showQ9 = ! this.showQ9;
  }
}

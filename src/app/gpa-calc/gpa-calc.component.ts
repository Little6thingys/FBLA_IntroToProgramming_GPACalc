/* This component defines the variables and functions used for this GPA calculator */
import { scales } from '../scales';
import { BrowserModule, SafeResourceUrl } from '@angular/platform-browser';
import { AfterViewInit, Input, NgModule, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit, EventEmitter, Output, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { GradingScaleComponent } from './grading-scale/grading-scale.component';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// @NgModule({
//   imports: [
//     BrowserModule,
//     // import HttpClientModule after BrowserModule.
//     HttpClientModule,
//   ]
// })

export class AppModule {}

@Component({
  selector: 'app-gpa-calc',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule,
    ReactiveFormsModule,
    GradingScaleComponent,
    RouterModule,
  ],
  templateUrl: './gpa-calc.component.html',
  styleUrl: './gpa-calc.component.css'
})


export class GpaCalcComponent implements AfterViewInit {
  // @ViewChild('tawkContainer') tawkContainer!: ElementRef;

  ngAfterViewInit(): void {
    // const s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    // s1.type = 'text/javascript';
    // s1.async=true;
    // s1.src='https://embed.tawk.to/661315dca0c6737bd12949a5/1hqt8qprg';
    // s1.charset='UTF-8';
    // s1.setAttribute('crossorigin','*');
    // this.tawkContainer.nativeElement.appendChild(s1);
  }

  // @Input() gradingScaleVisible: boolean = false;

  @Output() buttonEvent = new EventEmitter<boolean>();

  constructor(private router: Router){}

  // variables in this class

  // array that holds the information for the course information
  gradeTable: any[] = [];

  // variables for editing the grading scale
  editIndex: number | null = null;
  editedItem: any = {};
  
  /* scale table object used for html display */
  scales = [...scales];

  /* boolean variables for the conditions to show or hide FAQ sections */
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
  
  // boolean variable to show/hide grading scale
  showGradingScale: boolean = false;

  /* flag to show if the file name or file extension is valid */
  validFileName: boolean = true;
  validFileExtension: boolean = true;

  /* the cumulativeGPA*/
  cumulativeGPA: number = 0;
  cumulativeCredit: string ="0"; 

  /* the grade formats used for this GPA calculator */
  gradeFormat: string = "LETTERS";
  /* the semester title from the user input*/ 
  semesterTitle: string= "";

   /* the semester title from the user input*/
   searchKeyword: string = '';

  /* variables for every course name, grade, percentage grade, credit, and course type from the user input */
  
  /* the file name and file extension to generate GPA report from the user input */
  saveFileName: string = "fileName";
  saveFileExtension: string = '';

  /* checkbox values for the options to be included in the GPA report from the user input checkboxes */
  checkedCumGPA: boolean = false;
  checkWeightedGPA: boolean = false;
  checkUnweightedGPA: boolean = false;
  checkTotalGPA: boolean = false;
  checkDetailGPA: boolean = false;

  /* flags to indicate the credit is valid, it's integer >=0 */
  validFirstCredit: boolean =  true;
  validSecondCredit: boolean =  true;
  validThirdCredit: boolean =  true;
  validFourthCredit: boolean =  true;
  validFifthCredit: boolean =  true;
  validSixthCredit: boolean =  true;
  validSeventhCredit: boolean =  true;
  validEighthCredit: boolean =  true;

  /* flags to indicate the percentage grade is valie, it's a number >=0*/
  validFirstPercentage: boolean =  true;
  validSecondPercentage: boolean =  true;
  validThirdPercentage: boolean =  true;
  validFourthPercentage: boolean =  true;
  validFifthPercentage: boolean =  true;
  validSixthPercentage: boolean =  true;
  validSeventhPercentage: boolean =  true;
  validEighthPercentage: boolean =  true;

  // functions in this class


  @HostListener('window:beforeunload')
  onBeforeUnload() {
    // Perform cleanup or show a confirmation dialog here
    // For example:
    // $event.returnValue = true; // Prompt the user with a confirmation dialog

    this.backupScaleTable();
    this.backupGradeTable();
  }

   // unused (navigates to login page)
   navigateToAnotherURL() {
    this.router.navigate(['/google-classroom/login']);
  }

  // recieves command to close the grading scale
  receiveCloseGS($event: boolean) {
    this.showGradingScale = $event;
  }

  // adds a row to the course information table
   addRow() {
      this.gradeTable.push({}); // Add an empty row
      this.gradeTable[this.gradeTable.length - 1].courseName = "";
      this.gradeTable[this.gradeTable.length - 1].grade = 1;
      this.gradeTable[this.gradeTable.length - 1].gradePercent = 93;
      this.gradeTable[this.gradeTable.length - 1].credit = 0;
      this.gradeTable[this.gradeTable.length - 1].type = "regular";
      this.gradeTable[this.gradeTable.length - 1].validPercentage = true;
      this.gradeTable[this.gradeTable.length - 1].validCredit = true;
   }
 
   // removes a row from the course information table
   removeRow(index: number) {
     this.gradeTable.splice(index, 1); // Remove row at the specified index
   }
 
   // saves information about selected row of the grading scale table
   editItem(index: number) {
     this.editIndex = index;
     this.editedItem = { ...this.scales[index] };
   }
 
   // saves the edits made to a row in the grading scale table
   saveChanges(index: number) {
     if (this.editIndex !== null) {
       this.scales[index] = { ...this.editedItem };
       this.editIndex = null;
     }
   }

  /*validate file name for GPA report */
  validateFileName()
  {
    this.validFileName = true;
    if(this.saveFileName.length == 0)
    {
      //do input validation here, if there is empty string, report error on the GUI
      this.validFileName = false;
    }
  }

    /*validate credit is a positve integer for GPA report */
    validateCredit(row: any) {
      row.validCredit = true;
      if (row.credit.length == 0) {
        //do input validation here, if there is empty string, report error on the GUI
        row.validCredit = false;
      } else {
        let number = Number(row.credit);
        let isInteger = Number.isInteger(number);
        if (!isInteger || number < 0) {
          // if this is not a positive integer
          row.validCredit = false;
        }
      }
    }
  
    /*validate percentage grade is valid, it's a number >=0 */
    validatePerentage(row: any) {
      row.validPercentage = true;
      if (row.gradePercent.length == 0) {
        //do input validation here, if there is empty string, report error on the GUI
        row.validPercentage = false;
      } else {
        let number = Number(row.gradePercent);
        let isInteger = Number.isInteger(number);
        if (!isInteger || number < 0) {
          // if this is not a positive number
          row.validPercentage = false;
        }
      }
    }

  
  /* save the generated GPA report to file*/
  onSaveFile()
  {
    let fileName = this.saveFileName + '.' + this.saveFileExtension;
    let fileContent = this.constructReport();
    const file = new Blob([fileContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    link.click();
    link.remove(); 
  }


  /* construct the content string of grade table */
  constructGradeTable() {
    var resultStr = '';
    for (var i = 0; i < this.gradeTable.length; i++) {
      resultStr += this.gradeTable[i].courseName;
      resultStr += ',';
      resultStr += this.gradeTable[i].grade;
      resultStr += ',';
      resultStr += this.gradeTable[i].gradePercent;
      resultStr += ',';
      resultStr += this.gradeTable[i].credit;
      resultStr += ',';
      resultStr += this.gradeTable[i].type;
      resultStr += ';';
    }
    return resultStr;
  }

  /* 
   To implement dynamic backup: backup data table gradeTable anytime the data is changed from the GUI. 
   steps: 
   1. encrypt table context.
   2. we only backup the lastest input of gpa calculator. when backup, save as file name "gradeTableBackup1.txt",  "gradeTableBackup2.txt" and  "gradeTableBackup3.txt"
   3. removed all older backup files.
 */
  backupGradeTable() {
    let fileName = 'gradeTableBackup1.txt';
    let fileContent = this.constructGradeTable();
    const file = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(file);
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  /* string to hold the selected file content */
  fileContent: string = '';

  /* read the selected file content into string fileContent */
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e) => {
      this.fileContent = reader.result as string;
    };

    reader.readAsText(file);
  }

  restoreGradeTableFromBackupFile() {
    if (this.fileContent) {
      this.gradeTable.splice(0, this.gradeTable.length);
      //load this.gradeTable with fileContent string
      let rowArray = this.fileContent.split(';');
      for (var i = 0; i < rowArray.length; i++) {
        // fill rowArray[i];
        let array = rowArray[i].split(',');
        if (array.length == 5) {
          this.gradeTable.push({});
          this.gradeTable[i].courseName = array[0];
          this.gradeTable[i].grade = array[1];
          this.gradeTable[i].gradePercent = array[2];
          this.gradeTable[i].credit = array[3];
          this.gradeTable[i].type = array[4];
        } else {
          console.log('backupdata is corrupted, no grade table is restored');
        }
      }
    }
  }

  /* construct the content string of grade table */
  constructScaleTable() {
    var resultStr = '';
    for (var i = 0; i < this.scales.length; i++) {
      resultStr += this.scales[i].id;
      resultStr += ',';
      resultStr += this.scales[i].letterGrade;
      resultStr += ',';
      resultStr += this.scales[i].percentGrade;
      resultStr += ',';
      resultStr += this.scales[i].percentGradeHi;
      resultStr += ',';
      resultStr += this.scales[i].regular;
      resultStr += ',';
      resultStr += this.scales[i].honors;
      resultStr += ',';
      resultStr += this.scales[i].ap;
      resultStr += ';';
    }
    return resultStr;
  }

  backupScaleTable() {
    let fileName = 'scaleTableBackup1.txt';
    let fileContent = this.constructScaleTable();
    const file = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(file);
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  /* string to hold the selected file content */
  scaleFileContent: string = '';

  /* read the selected file content into string scaleFileContent */
  onScaleFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e) => {
      this.scaleFileContent = reader.result as string;
    };

    reader.readAsText(file);
  }

  restoreScaleTableFromBackupFile() {
    if (this.scaleFileContent) {
      this.scales.splice(0, this.scales.length);
      //load this.scales with scaleFileContent string
      let rowArray = this.scaleFileContent.split(';');
      for (var i = 0; i < rowArray.length; i++) {
        // fill rowArray[i];
        let array = rowArray[i].split(',');
        if (array.length == 7) {
          this.scales.push({
            id: parseInt(array[0]),
            letterGrade: array[1],
            percentGrade: parseInt(array[2]),
            percentGradeHi: parseInt(array[3]),
            regular: parseInt(array[4]),
            honors: parseInt(array[5]),
            ap: parseInt(array[6]),
          });
        } else {
          console.log('backupdata is corrupted, no grade table is restored');
        }
      }
    }
  }

/*
  async function encryptAES(text: string, key: string) {
    const encodedText = new TextEncoder().encode(text);
    const encodedKey = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key));
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encryptedData = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, encodedKey, encodedText);
    return { encryptedData, iv };
  }
  
  async function decryptAES(encryptedData: string, key: string, iv:) {
    const encodedKey = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key));
    const decryptedData = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, encodedKey, encryptedData);
    return new TextDecoder().decode(decryptedData);
  }
*/

  
  /*sends you to the google sign-in page*/
  // onSignIn(){
  //   link.href = 
  // }


/* serach scale table for the letter grade by id number */  
searchScalesById(id: number)
{
  var result = "";
  for (let i = 0; i < this.scales.length; i++) {
    if(this.scales[i].id == id)
    {
      result = this.scales[i].letterGrade;
      console.log ("found!" + i);
    }
  }
  if(result.length ==0)
  {
    console.log("not found!");
  }
  return result;
}

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



 /* handle button change event, set variable from true to false, or from false to true*/
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

  toggleGradingScale(){
    this.showGradingScale = !this.showGradingScale;
  }

  
  /* construct the content string for the GPA report */
  constructReport()
  {
    // cumulative GPA
    var cumString = "";
    if(this.checkedCumGPA)
    {
      cumString = "Your Cumulative GPA is " + this.cumulativeGPA + ".\n" ;
    }

    // weighted GPA
    var weightedString = "";
    if(this.checkWeightedGPA)
    {
      weightedString = "Your Weighted GPA is " + this.calculateAllGPAWeighted() + ".\n";
    }

    // unweighted GPA
    var unweightedString = "";
    if(this.checkUnweightedGPA)
    {
      unweightedString =  "Your unweighted GPA is " + this.calculateAllGPAUnWeighted() +   ".\n";
    }

    // total GPA
    var totalString = "";
    if(this.checkTotalGPA)
    {
      totalString = "Your total GPA is " + this.calculateTotalGPAUnWeighted()+ ".\n\r";
    }

    // GPA details of each course
    var detailString = "";
    if(this.checkDetailGPA)
    {
      detailString = "Below is the table showing the details:\n------------------------------------------------\n" +
      "\n| Course Name  | Grade | Credits | Course Type |\n";
      for(var i = 0; i < this.gradeTable.length; i++)
      {
        if(this.gradeFormat=='LETTERS')
        {
          detailString += "| " + this.gradeTable[i].courseName + " | " + this.searchScalesById(this.gradeTable[i].grade).toString() + " | " + this.gradeTable[i].credit.toString() + " | " + this.gradeTable[i].type + " | " + "\n";
        }
        else if(this.gradeFormat=='PERCENTAGE')
        {
          detailString += "| " + this.gradeTable[i].courseName + " | " + this.gradeTable[i].gradePercent+ " | " + this.gradeTable[i].credit.toString() + " | " + this.gradeTable[i].type + " | " + "\n";
        }
      }
      detailString += "------------------------------------------------\n";
    }

    var result = 
      "This is the automatically generated GPA report for semester \"" + this.semesterTitle + "\"\n" +
      cumString + weightedString + unweightedString + totalString + detailString;  
    return result;
  }
  


  /* calculate the unweighted GPA by the letter grade*/
  findGradeScoreUnWeighted(grade: number){
    var currentScale = this.scales[Math.round(grade)];
    return currentScale.regular;
  }

    /* calculate the unweighted GPA by the percentage grade*/
  findGradeScoreByPercentageUnweighted(grade: string){
    var result = 0;
    for(var i=0;i<this.scales.length;i++)
    {
      if(parseInt(grade)>=this.scales[i].percentGrade)
      {
         result = this.scales[i].regular;
         break;
      }
    }
    return result;
  }

  /* calculate the unweighted GPA for a single course by the letter grade*/
  calculateSingleGPAUnWeighted(grd: number, credit: string){
    var score = this.findGradeScoreUnWeighted(grd);
    var singleGPA = score * parseInt(credit);
    return singleGPA;
  }

  /* calculate the unweighted GPA for a single course by the percentage grade*/
  calculateSingleGPAUnWeightedPercentage(grd: string, credit: string){
    var score = this.findGradeScoreByPercentageUnweighted(grd);
    var singleGPA = score * parseInt(credit);
    return singleGPA;
  }

/* calculate the unweighted GPA for total courses by the letter grade*/  
calculateTotalGPA(){
  var currentGPA = 0;
  var totalGPA = 0;
  for(var i = 0; i < this.gradeTable.length; i++)
  {
    currentGPA = this.calculateSingleGPAUnWeighted(this.gradeTable[i].grade, this.gradeTable[i].credit);
    totalGPA += currentGPA;
  }

  return totalGPA;
}

/* calculate the unweighted GPA for total courses by the percentage grade*/
calculateTotalGPAPercentage(){
  var currentGPA = 0;
  var totalGPA = 0;
  for(var i = 0; i < this.gradeTable.length; i++)
  {
    currentGPA = this.calculateSingleGPAUnWeightedPercentage(this.gradeTable[i].gradePercent, this.gradeTable[i].credit);
    totalGPA += currentGPA;
  }

  return totalGPA;
}

/*calculate the unweighted GPA for all the courses
  This function is called in HTML*/
calculateAllGPAUnWeighted(){
var totalCredits = 0;
 for(var i = 0; i < this.gradeTable.length; i++)
 {
    totalCredits += parseInt(this.gradeTable[i].credit);
 }
 console.log(totalCredits);

  var answer = 0;
  if(totalCredits > 0 && !Number.isNaN(totalCredits))
  {
    if(this.gradeFormat=='LETTERS')
    {
      answer = this.calculateTotalGPA() / totalCredits;
    }
    else if(this.gradeFormat=='PERCENTAGE')
    {
      answer = this.calculateTotalGPAPercentage() / totalCredits;
    }
  }
  return Math.round(answer*100)/100;
}

/*calculate the unweighted GPA for all the courses, including cumulative GPA.
  This function is called in HTML*/
calculateTotalGPAUnWeighted(){
  var allGrades = this.cumulativeGPA*parseInt(this.cumulativeCredit);

  var totalCredits = parseInt(this.cumulativeCredit);
  for(var i=0; i < this.gradeTable.length; i++)
  {
    totalCredits += parseInt(this.gradeTable[i].credit);
  }

  var answer = 0;
  if(totalCredits > 0)
  {
    if(this.gradeFormat=='LETTERS')
    {
      allGrades += this.calculateTotalGPA();
    }
    else if(this.gradeFormat=='PERCENTAGE')
    {
      allGrades += this.calculateTotalGPAPercentage();
    }
    answer = allGrades / totalCredits;
  }
  return Math.round(answer*100)/100;
}

/* calculate the weighted GPA by the percentage grade*/
findGradeScoreByPercentageWeighted(grade: string, type: string){
  var result = 0;
  for(var i=0;i<this.scales.length;i++)
  {
    if(parseInt(grade)>=this.scales[i].percentGrade)
    {
      switch(type) {
        case "regular":
          result = this.scales[i].regular;
          break;
        case "honors":
          result = this.scales[i].honors;
          break;
        case "ap":
          result = this.scales[i].ap;
          break;
        default:
          result = this.scales[i].regular;
          break;
      }
      break;
    }
  }
  return result;
}

/* calculate the weighted GPA by the grade and course type*/
findGradeScoreWeighted(grade: number, type: string){
  var currentScale = this.scales[Math.round(grade)];
  var gradeNumber = 0;
  switch (type) {
    case "regular":
      gradeNumber = currentScale.regular;
      break;
    case "honors":
      gradeNumber = currentScale.honors;
      break;
    case "ap":
      gradeNumber = currentScale.ap;
      break;
    default:
      gradeNumber = currentScale.regular;
      break;
    }
  return gradeNumber;
}

/* calculate the weighted GPA for a single course by the grade*/
calculateSingleGPAWeighted(grd: number, type: string, credit: string)
{
  var score =0;
  score = this.findGradeScoreWeighted(grd, type);
  var singleGPA = score * parseInt(credit);
  return singleGPA;
}

/* calculate the weighted GPA for a single course by the percentage grade and course type and credit*/
calculateSingleGPAWeightedPercent(grd: string, type: string, credit: string)
{
  var score =0;
  score = this.findGradeScoreByPercentageWeighted(grd, type);
  var singleGPA = score * parseInt(credit);
  return singleGPA;
}

/* calculate the weighted GPAfor all the courses
  This function is called in html*/
calculateAllGPAWeighted(){
  var currentGPA = 0;
  var totalGPA = 0;

  if(this.gradeFormat=='LETTERS')
  {
    for(var i = 0; i < this.gradeTable.length; i++)
    {
      currentGPA = this.calculateSingleGPAWeighted(this.gradeTable[i].grade, this.gradeTable[i].type, this.gradeTable[i].credit);
      totalGPA += currentGPA;
    }
  }
  else if(this.gradeFormat=='PERCENTAGE')
  {
    for(var i = 0; i < this.gradeTable.length; i++)
    {
      currentGPA = this.calculateSingleGPAWeightedPercent(this.gradeTable[i].gradePercent, this.gradeTable[i].type, this.gradeTable[i].credit);
      totalGPA += currentGPA;
    }

  }

  var totalCredits = 0;
  for(var i = 0; i < this.gradeTable.length; i++)
  {
    totalCredits += parseInt(this.gradeTable[i].credit);
  }

  var answer = 0;
  if(totalCredits > 0)
  {
    answer = totalGPA / totalCredits;
  }
  return Math.round(answer*100)/100;
  }
  
  

  // This is the end of function definitions.


}

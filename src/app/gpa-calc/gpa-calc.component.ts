/* This component defines the variables and functions used for this GPA calculator */
import { scales } from '../scales';
import { BrowserModule, SafeResourceUrl } from '@angular/platform-browser';
import { AfterViewInit, Input, NgModule, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { GradingScaleComponent } from './grading-scale/grading-scale.component';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
  ]
})
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

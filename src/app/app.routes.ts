import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { GpaCalcComponent } from "./gpa-calc/gpa-calc.component";
import { LoginComponent } from "./login/login.component";

export const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/gpa-calc', pathMatch: 'full' },
    { path: 'gpa-calc', component: GpaCalcComponent},
    { path: 'google-classroom/login', component: LoginComponent},
];
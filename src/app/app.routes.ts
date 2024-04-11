import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { GpaCalcComponent } from "./gpa-calc/gpa-calc.component";
import { LoginComponent } from "./login/login.component";
import { HelpMenuComponent } from "./help-menu/help-menu.component";
import { GpaAutoComponent } from "./gpa-auto/gpa-auto.component";
import { LoginErrorComponent } from "./login-error/login-error.component";

export const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/gpa-calc', pathMatch: 'full' },
    { path: 'gpa-calc', component: GpaCalcComponent},
    { path: 'gpa-auto/login', component: LoginComponent},
    { path: 'help', component: HelpMenuComponent},
    { path: 'gpa-auto', component: GpaAutoComponent },
    { path: 'gpa-auto/login-error', component: LoginErrorComponent },
];
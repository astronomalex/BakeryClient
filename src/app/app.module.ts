import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SettingsComponent} from './settings/settings.component';
import {MainpageComponent} from './mainpage/mainpage.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {AddBunsComponent} from './settings/add-buns/add-buns.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {EditCategoryComponent} from './settings/edit-category/edit-category.component';


@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    MainpageComponent,
    AddBunsComponent,
    EditCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-Ru'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SettingsComponent} from "./settings/settings.component";
import {MainpageComponent} from "./mainpage/mainpage.component";

const routes: Routes = [
  {path: '', component: SettingsComponent},
  {path: 'main', component: MainpageComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { RouterModule, Routes } from '@angular/router';
import { DefaultViewComponent } from './components/default-view/default-view.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
   { path: '', component: DefaultViewComponent },
   { path: 'add-person', component: AddPersonComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule {}
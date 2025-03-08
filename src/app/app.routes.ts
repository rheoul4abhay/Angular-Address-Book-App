import { Routes } from '@angular/router';
import { DefaultViewComponent } from './components/default-view/default-view.component';
import { AddPersonComponent } from './components/add-person/add-person.component';

export const routes: Routes = [
    {
        path:"",
        component:DefaultViewComponent
    },
    {
        path:"addPerson",
        component:AddPersonComponent
    }
];

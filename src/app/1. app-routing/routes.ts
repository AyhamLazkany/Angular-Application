import { Routes } from "@angular/router";

import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { MenuComponent } from '../menu/menu.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';

export const routes : Routes = [
    {path: 'Home', component: HomeComponent },
    {path: 'Menu', component: MenuComponent},
    {path: 'ContactUs', component: ContactComponent},
    {path: 'About', component: AboutComponent},
    {path: 'Menu/Dishdetail/:id', component: DishdetailComponent},
    {path: '', redirectTo: '/Home', pathMatch: 'full'}
];
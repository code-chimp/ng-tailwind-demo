import { Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { ContactDetailComponent } from './pages/contacts/contact-detail/contact-detail.component';
import { ContactFormComponent } from './pages/contacts/contact-form/contact-form.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { FourOhFourComponent } from './pages/four-oh-four/four-oh-four.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contacts',
    children: [
      {
        path: 'new',
        component: ContactFormComponent,
      },
      {
        path: ':id/edit',
        component: ContactFormComponent,
      },
      {
        path: ':id',
        component: ContactDetailComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: ContactsComponent,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: '**',
    component: FourOhFourComponent,
  },
];

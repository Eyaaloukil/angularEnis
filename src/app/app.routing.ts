import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { PublicationsComponent } from './pages/publications/publications.component';
import { UsersComponent } from './pages/users/users.component';
import { PublicationFormComponent } from './pages/publication-form/publication-form.component';
import { PublicationEditComponent } from './pages/publication-edit/publication-edit.component';
import { ConfirmPubComponent } from './pages/confirm-pub/confirm-pub.component';
import { OutilsComponent } from './pages/outils/outils.component';
import { ConfirmOutilComponent } from './pages/confirm-outil/confirm-outil.component';
import { OutilsFormComponent } from './pages/outils-form/outils-form.component';
import { EditOutilComponent } from './pages/edit-outil/edit-outil.component';
import { EvenementsComponent } from './pages/evenements/evenements.component';
import { EvenementsFormComponent } from './pages/evenements-form/evenements-form.component';
import { EditEvenementComponent } from './pages/edit-evenement/edit-evenement.component';
import { ConfirmEvenementComponent } from './pages/confirm-evenement/confirm-evenement.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      },
      {
        path: 'publications',
        component:PublicationsComponent,
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      },
      {
        path: 'outils',
        component:OutilsComponent,
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      },
      {
        path: 'addPublication',
        component:PublicationFormComponent,
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      },
      {
        path: 'editPublication/:id',
        component:PublicationEditComponent,
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      },
      {
        path: 'confirmPublication',
        component:ConfirmPubComponent,
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      },   {
        path: 'addOutil',
        component:OutilsFormComponent,
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      },

      {
        path: 'user/:id',
        component:UserDetailsComponent,
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      },
      {
        path: 'confirmOutil',
        component:ConfirmOutilComponent,
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      },
      /////////////////
      {
        path: 'evenements',
        component:EvenementsComponent,
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      },
      {
        path: 'addEvenement',
        component:EvenementsFormComponent,
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      },
      {
        path: 'editEvenement/:id',
        component:EditEvenementComponent,
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      },
      {
        path: 'confirmEvenement',
        component:ConfirmEvenementComponent,
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      },
/////////////
      {
        path: 'users',
        component:UsersComponent,
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  }, {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { MemberServiceService } from 'src/services/member-service.service';
import { UsersComponent } from './pages/users/users.component';
import { PublicationsComponent } from './pages/publications/publications.component';
import { PublicationFormComponent } from './pages/publication-form/publication-form.component';
import { PublicationEditComponent } from './pages/publication-edit/publication-edit.component';
import { ConfirmPubComponent } from './pages/confirm-pub/confirm-pub.component';
import { OutilsComponent } from './pages/outils/outils.component';
import { OutilsFormComponent } from './pages/outils-form/outils-form.component';
import { ConfirmOutilComponent } from './pages/confirm-outil/confirm-outil.component';
import { EditOutilComponent } from './pages/edit-outil/edit-outil.component';
import { EvenementsComponent } from './pages/evenements/evenements.component';
import { EvenementsFormComponent } from './pages/evenements-form/evenements-form.component';
import { EditEvenementComponent } from './pages/edit-evenement/edit-evenement.component';
import { ConfirmEvenementComponent } from './pages/confirm-evenement/confirm-evenement.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserDetailsComponent } from './pages/user-details/user-details.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    UsersComponent,
    PublicationsComponent,
    PublicationFormComponent,
    PublicationEditComponent,
    ConfirmPubComponent,
    OutilsComponent,
    OutilsFormComponent,
    ConfirmOutilComponent,
    EditOutilComponent,
    EvenementsComponent,
    EvenementsFormComponent,
    EditEvenementComponent,
    ConfirmEvenementComponent,
    UserDetailsComponent,

  ],
  providers: [MemberServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// --- angular material
import { MaterialModule } from '../shared/material/material.module';

// --- credit card module
import { CreditCardDirectivesModule } from 'angular-cc-library';

// --- pipes
import { NoImagePipe } from '../shared/_pipes/no-image.pipe';

// --- directives
import { OnlyNumberDirective } from '../shared/_directives/only-number.directive';

// --- skeleton loader
import { SkeletonComponent } from '../shared/skeleton/skeleton.component';

// --- components [pages]
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';

// --- dialogs
import { EditAddressDialogComponent } from '../shared/dialogs/edit-address-dialog/edit-address-dialog.component';
import { CreateAddressDialogComponent } from '../shared/dialogs/create-address-dialog/create-address-dialog.component';

//-- Modules
import { ChartsModule } from 'ng2-charts';
import { TableModule } from 'ngx-easy-table';
import { CreateUserDialogComponent } from '../shared/dialogs/create-user-dialog/create-user-dialog.component';
import { ProdDetailComponent } from './prod-detail/prod-detail.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { NoticePrivacyComponent } from './notice-privacy/notice-privacy.component';
import { UsComponent } from './us/us.component';


@NgModule({
  declarations: [
    NoImagePipe,
    HomeComponent,
    UsersComponent,
    SettingsComponent,
    SkeletonComponent,
    OnlyNumberDirective,
    EditAddressDialogComponent,
    // CreateAddressDialogComponent,
    CreateUserDialogComponent,
    ProdDetailComponent,
    CartComponent,
    ProductsComponent,
    ContactComponent,
    TermsConditionsComponent,
    NoticePrivacyComponent,
    UsComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ChartsModule,
    TableModule,
    ReactiveFormsModule,
    SharedModule,
    // pagesRoutingModule
    //CreditCardDirectivesModule

  ],
  exports: [
    HomeComponent,
    UsersComponent,
    SettingsComponent,
    SkeletonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    EditAddressDialogComponent,
    // CreateAddressDialogComponent,
    CreateUserDialogComponent,
  ]
})
export class PagesModule { }
//
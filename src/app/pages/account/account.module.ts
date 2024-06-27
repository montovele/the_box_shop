import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// --- routing module
import { AccountRoutingModule } from "./account-routing.module";

// --- components
import { DetailsComponent } from "./pages/details/details.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { MenuNavigationComponent } from "./components/menu-navigation/menu-navigation.component";
import { AccountComponent } from "./account.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddressComponent } from "./pages/address/address.component";
import { CreateAddressDialogComponent } from "src/app/shared/dialogs/create-address-dialog/create-address-dialog.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { DecisionComponent } from "src/app/shared/dialogs/decision/decision.component";
import { SharedModule } from "src/app/shared/shared.module";
import { QuotesComponent } from "./pages/quotes/quotes.component";
import { QuoteDetailDialogComponent } from "./pages/quotes/components/quote-detail-dialog/quote-detail-dialog.component";
import { OrderDetailComponent } from "../../shared/dialogs/order-detail/order-detail.component";
import { OrderDetailDialogComponent } from "./pages/orders/components/order-detail-dialog/order-detail-dialog.component";

@NgModule({
  declarations: [
    AccountComponent,
    DetailsComponent,
    OrdersComponent,
    MenuNavigationComponent,
    AddressComponent,
    CreateAddressDialogComponent,
    DecisionComponent,
    QuotesComponent,
    QuoteDetailDialogComponent,
    OrderDetailDialogComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    CommonModule,
    RouterModule,
    MaterialModule,
    SharedModule,
  ],
  entryComponents: [CreateAddressDialogComponent, DecisionComponent],
})
export class AccountModule {}

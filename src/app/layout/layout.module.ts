import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// --- routing
import { RouterModule } from "@angular/router";

// --- angular material
import { MaterialModule } from "../shared/material/material.module";

// --- components
import { MainContentComponent } from "../layout/main-content/main-content.component";
import { MenuNavigationComponent } from "./menu-navigation/menu-navigation.component";
import { FooterComponent } from "./footer/footer.component";
import { LayoutRoutingModule } from "./layout-routing.module";
import { PagesModule } from "../pages/pages.module";
import { AccountModule } from "../pages/account/account.module";
import { OrderDetailModule } from "../pages/order-detail/order-detail.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [MainContentComponent, MenuNavigationComponent, FooterComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MaterialModule,
    LayoutRoutingModule,
    PagesModule,
    AccountModule,
    OrderDetailModule,
    SharedModule
  ],
  exports: [MainContentComponent, MenuNavigationComponent, FooterComponent,],
})
export class LayoutModule {}

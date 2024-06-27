import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { PagesModule } from "../app/pages/pages.module";
import { LayoutModule } from "../app/layout/layout.module";
import { CreateUserDialogComponent } from "./shared/dialogs/create-user-dialog/create-user-dialog.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InterceptorService } from "./shared/_services/interceptor.service";
import { AccountModule } from "./pages/account/account.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, LayoutModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

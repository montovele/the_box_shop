import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyAddressComponent } from "./components/my-address/my-address.component";
import { AlertDialogComponent } from "./dialogs/alert-dialog/alert-dialog.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrderDetailComponent } from "./dialogs/order-detail/order-detail.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { SliceCarouselComponent } from "./components/slice-carousel/slice-carousel.component";
import { SwiperModule } from "swiper/angular";
import { ImageGalleryComponent } from "./components/image-gallery/image-gallery.component";
import { SelectComponent } from "./components/select/select.component";
import { SearchAutocompleteProductComponent } from "./components/search-autocomplete-product/search-autocomplete-product.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { SearchComponent } from "./components/search/search.component";
import { ClickOutDirective } from "./_directives/click-out.directive";

@NgModule({
  declarations: [
    MyAddressComponent,
    AlertDialogComponent,
    PaginationComponent,
    OrderDetailComponent,
    LoadingSpinnerComponent,
    SliceCarouselComponent,
    ImageGalleryComponent,
    SelectComponent,
    SearchAutocompleteProductComponent,
    SearchComponent,
    ClickOutDirective
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SwiperModule, MatAutocompleteModule],
  exports: [
    PaginationComponent,
    MyAddressComponent,
    LoadingSpinnerComponent,
    SliceCarouselComponent,
    ImageGalleryComponent,
    SelectComponent,
    SearchAutocompleteProductComponent,
    SearchComponent,
    ClickOutDirective
  ],
})
export class SharedModule {}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(product: any): string { // its any cuz it can be diferent models
    if (product.proD_ImageURL) {
      return product.proD_ImageURL
    } else if ( product.image_url) {
      return product.image_url
    } else {
      return 'assets/img/no-image.png';
    }
  }

}

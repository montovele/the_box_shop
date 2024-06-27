import { Component, HostListener, Input, OnInit } from '@angular/core';
import { SwiperComponent } from "swiper/angular";
// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  views = 4

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.validateViews()
  }

  thumbsSwiper: any;
  @Input() images = [];

  constructor() { }

  ngOnInit(): void {
    this.validateViews()
  }

  validateViews(){
    if( window.innerWidth < 900){
      this.views = 3
      return
    }
    this.views = 4;
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SwiperCore, { Autoplay, Pagination, Navigation, EffectFade } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation,EffectFade]);

@Component({
  selector: 'app-slice-carousel',
  templateUrl: './slice-carousel.component.html',
  styleUrls: ['./slice-carousel.component.css']
})
export class SliceCarouselComponent implements OnInit {

  @Input() banner_slides

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToLink(url){
    if(url){
      window.open(`${url}`, "_blank")
    }
  }

}

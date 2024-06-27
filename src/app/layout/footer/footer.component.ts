import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/_api/product.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  current_year = new Date().getFullYear();

  constructor(public product_service:ProductService, public router:Router) { }

  ngOnInit() {
  }

  selectCategory(type: string) {
    localStorage.removeItem("scroll");
    window.scroll(0, 0);
    this.product_service.resetQueryParams({ "Tipo de producto": type, page: 1 });
  }

  getRoute(route , params = {}){
    window.scroll(0, 0);
    this.router.navigate([route],{queryParams:{
      ...params
    }})
  }

}

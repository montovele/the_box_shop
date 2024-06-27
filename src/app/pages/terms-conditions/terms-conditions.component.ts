import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { HasElementRef } from '@angular/material/core/common-behaviors/color';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {
  @ViewChild('returns') returns: ElementRef;

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    let params = this.route.snapshot.queryParams;
    console.log(params)
    if(params.section == "return"){
      setTimeout(() => {
        this.scrollReturns()
      }, 10);
    }
  }

  scrollReturns() {
    this.returns.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}

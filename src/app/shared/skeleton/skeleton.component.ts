import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  template: `
    <div [ngStyle]="setSkeletonStyles()" class="skeleton"></div>
  `,
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent implements OnInit {

  @Input() width: string;
  @Input() widthP: string;
  @Input() heightP: string;
  @Input() height: string;
  @Input() circle: boolean;

  constructor() { }

  ngOnInit() {
  }

  setSkeletonStyles() {
    const styles = {
      'width.px'       : this.width   ? this.width   : '',
      'width.%'        : this.widthP  ? this.widthP  : '',
      'height.%'       : this.heightP ? this.heightP : '',
      'height.px'      : this.height  ? this.height  : '',
      'border-radius'  : this.circle  ? '50%'        : ''
    }

    return styles;
  }

}

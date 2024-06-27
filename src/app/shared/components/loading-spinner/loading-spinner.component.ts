import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="spinner" [ngStyle]="setSpinnerStyles()"></div>
  `,
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

  @Input() width: string;
  @Input() height: string;
  @Input() color: string;
  @Input() border_width: string;

  setSpinnerStyles(): Object {
    const styles = {
      'border-width.px': this.border_width ? this.border_width : '',
      'border-left-color': this.color ? this.color : '',
      'height.px': this.height ? this.height : '',
      'width.px':  this.width  ? this.width   : '',
    }

    return styles;
  }

}

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]'
})
export class OnlyNumberDirective {

  constructor(
    private elementRef: ElementRef
  ) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const initalValue = this.elementRef.nativeElement.value;
    this.elementRef.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');

    if ( initalValue !== this.elementRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}

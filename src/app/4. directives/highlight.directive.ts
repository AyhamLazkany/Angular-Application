import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private elmR: ElementRef, private ren: Renderer2) {}
  
  @HostListener ('mouseenter') onmouseenter() {
    this.ren.addClass(this.elmR.nativeElement, 'highlight');
  }
  @HostListener ('mouseleave') onmouseleave() {
    this.ren.removeClass(this.elmR.nativeElement, 'highlight');
  }

}

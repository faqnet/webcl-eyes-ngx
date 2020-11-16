import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-js-eyes',
  templateUrl: './js-eyes.component.html',
  styleUrls: ['./js-eyes.component.scss']
})
export class JsEyesComponent implements OnInit {

  constructor(private elementRef: ElementRef,) {

    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = './assets/eyes.js';
    this.elementRef.nativeElement.appendChild(s);
  }

  ngOnInit(): void {

  }


}

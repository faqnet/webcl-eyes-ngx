import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-js-loader-eyes',
  templateUrl: './js-loader-eyes.component.html',
  styleUrls: ['./js-loader-eyes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsLoaderEyesComponent implements OnInit {

  constructor() {


  }

  ngOnInit(): void {
    createEyes()
  }

}

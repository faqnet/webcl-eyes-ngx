import {ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webcl-eyes-ngx';

  opened: boolean;


  constructor(private changeDetect: ChangeDetectorRef,) {
  }


  ngAfterViewChecked() {
    this.changeDetect.detectChanges();
  }

}

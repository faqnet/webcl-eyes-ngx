import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public s3 = addStuff('robin ', 'schoch');

  public n3 = addStuff(1, 2)

  public esnrRef = calcESNR(someReference)


  constructor() { }

  ngOnInit(): void {

  }

}

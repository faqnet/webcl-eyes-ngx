import {Component, OnInit} from '@angular/core';
import {IBlinkEvent, ITranslationEvent} from '../eye/eye.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

type EyeEvent = Readonly<Partial<ITranslationEvent & IBlinkEvent>>

@Component({
  selector: 'app-eyes',
  templateUrl: './eyes.component.html',
  styleUrls: ['./eyes.component.scss']
})
export class EyesComponent implements OnInit {

  /***************************************************************************
   *                                                                         *
   * Fields                                                                  *
   *                                                                         *
   **************************************************************************/

  private readonly _eyeStates$ = new BehaviorSubject<Map<string, EyeEvent>>(new Map<string, EyeEvent>());

  public displayedColumns: string[] = ['eyeId', 'x', 'y', 'isOpen'];

  /***************************************************************************
   *                                                                         *
   * Constructor                                                             *
   *                                                                         *
   **************************************************************************/

  constructor() { }

  /***************************************************************************
   *                                                                         *
   * Lifecycle                                                               *
   *                                                                         *
   **************************************************************************/

  ngOnInit(): void {
  }

  /***************************************************************************
   *                                                                         *
   * Public                                                                  *
   *                                                                         *
   **************************************************************************/

  public get eyeStates(): Map<string, EyeEvent> {
    return this._eyeStates$.value;
  }

  public get eyeStates$(): Observable<EyeEvent []> {
    return this._eyeStates$.pipe(map((key) => [...key.values()]));
  }

  public changed(event: IBlinkEvent | ITranslationEvent) {
    this.eyeStates.set(event.eyeId, Object.assign({}, this.eyeStates.get(event.eyeId), event));
  }

}

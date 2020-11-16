import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent, interval, Observable, Subject} from 'rxjs';
import {auditTime, filter, map, takeUntil} from 'rxjs/operators';


export interface IBlinkEvent {
  eyeId: string
  isOpen: boolean
}

export interface ITranslationEvent {
  eyeId: string
  x: number,
  y: number
}


@Component({
  selector: 'app-eye',
  templateUrl: './eye.component.html',
  styleUrls: ['./eye.component.scss']
})
export class EyeComponent implements OnInit, AfterViewInit, OnDestroy {

  /***************************************************************************
   *                                                                         *
   * Public API                                                              *
   *                                                                         *
   **************************************************************************/

  @Input()
  public eyeId: string;

  @Input()
  public blinkInterval: number = 7000;

  @Input()
  public resetBlinkInterval: number = 300;

  @Output()
  public readonly eyeClosedObserver: Observable<IBlinkEvent>;

  @Output()
  public readonly translationObserver: Observable<ITranslationEvent>;

  /***************************************************************************
   *                                                                         *
   * Fields                                                                  *
   *                                                                         *
   **************************************************************************/

  public lidOpacity$: BehaviorSubject<number> = new BehaviorSubject(0);
  public _eyeBallTransform$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([0, 0]);
  public eyeBallTransform$: Observable<string>;


  private _blinkInterval: Observable<number>;

  @ViewChild('rect')
  private _rectRef: ElementRef;
  private _rect;

  @ViewChild('tiger_iris')
  private _iris: ElementRef;

  @ViewChild('tiger_closeLid')
  private _closeLidLayer: ElementRef;

  private _xo: number;
  private _yo: number;

  private readonly _unsub$: Subject<void> = new Subject();

  private readonly _mouseDrag$ = fromEvent(document, 'mousemove').pipe(takeUntil(this._unsub$));

  /***************************************************************************
   *                                                                         *
   * Constructor                                                             *
   *                                                                         *
   **************************************************************************/

  constructor() {
    this.eyeClosedObserver = this.lidOpacity$.pipe(
      filter(() => !!this.eyeId),
      map(opacity => {
        return {eyeId: this.eyeId, isOpen: !Boolean(opacity)};
      }));

    this.eyeBallTransform$ = this._eyeBallTransform$.pipe(
      map(([x, y]) => `translateX(${x}px) translateY(${y}px)`)
    );

    this.translationObserver = this._eyeBallTransform$.pipe(
      filter(() => !!this.eyeId),
      auditTime(50),
      map(([x, y]) => {
        return <ITranslationEvent>{
          eyeId: this.eyeId,
          x: x,
          y: y
        };
      }));


    this._mouseDrag$.subscribe((evt: MouseEvent) => this.mouseTracker(evt));

  }

  /***************************************************************************
   *                                                                         *
   * Lifecycle                                                               *
   *                                                                         *
   **************************************************************************/

  ngOnInit(): void {
    this._blinkInterval = interval(this.blinkInterval);
    this._blinkInterval
        .pipe(takeUntil(this._unsub$), filter(evt => this.lidOpacity$.value === 0))
        .subscribe(tick => {
          this.lidOpacity$.next(1);
          setTimeout(evt => this.lidOpacity$.next(0), this.resetBlinkInterval);
        });


  }

  ngAfterViewInit(): void {
    this._rect = this._rectRef.nativeElement.getBoundingClientRect();
    this._xo = this._rect.x + this._rect.width / 2;
    this._yo = this._rect.y + this._rect.height / 2;
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }

  /***************************************************************************
   *                                                                         *
   * Public                                                                  *
   *                                                                         *
   **************************************************************************/

  public blink() {
    this.lidOpacity$.next(this.lidOpacity$.value === 1 ? 0 : 1);
    setTimeout(evt => {
      this.lidOpacity$.next(this.lidOpacity$.value === 0 ? 1 : 0);
    }, this.resetBlinkInterval);
  }


  /***************************************************************************
   *                                                                         *
   * Private methods                                                         *
   *                                                                         *
   **************************************************************************/

  private set eyeBallTransform([translateX, translateY]: [number, number]) {
    this._eyeBallTransform$.next([translateX, translateY]);
  }


  private mouseTracker(evt: MouseEvent) {
    const xm = evt.clientX - this._xo; // the normalized x/y coords to work with
    const ym = evt.clientY - this._yo;

    const xmax = this._rect.width / 1.5;
    const ymax = this._rect.height / 2;

    const widestFocus = 400; // when x is so far away, the eye is maximal extended
    const scaledX = xm * (xmax / widestFocus);
    let xe = xm > 0 ? Math.min(xmax, scaledX) : Math.max(-xmax, scaledX);
    const scaledY = ym * (ymax / widestFocus);
    let ye = ym > 0 ? Math.min(ymax, scaledY) : Math.max(-ymax, scaledY);
    if (xe * xe + ye * ye > xmax * ymax) {
      xe *= 0.9;
      ye *= 0.9;
    }
    this.eyeBallTransform = [xe, ye];
  }


}


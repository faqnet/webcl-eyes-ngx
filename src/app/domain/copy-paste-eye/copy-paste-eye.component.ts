import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';


/*
 const eyeView = id => `
 <svg id="${id}" viewBox="0 0 120 120">

 <filter id="shadow">
 <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
 <feOffset       dx="0" dy="8" />
 <feColorMatrix  type="matrix"
 values="0 0 0 0  0
 0 0 0 0  0
 0 0 0 0  0
 0 0 0 .5 0"/>
 <feBlend        in="SourceGraphic" mode="normal"/>
 </filter>

 <radialGradient id="gradient1" gradientUnits="objectBoundingBox" cx="50%" cy="50%" r="50%">
 <stop offset= "38%" stop-color="#000000" stop-opacity="1" />
 <stop offset= "46%" stop-color="#073F80" stop-opacity="1" />
 <stop offset= "90%" stop-color="#8EC0DD" stop-opacity="1" />
 <stop offset="100%" stop-color="#2F3A46" stop-opacity="1" />
 </radialGradient>
 <g id="${id}_iris">
 <ellipse cx="60" cy="60" rx="30" ry="30" opacity="1" fill="url(#gradient1)" />
 <ellipse cx="50" cy="50" rx="7"  ry="7"  opacity="1" fill="#FFFFFF" fill-opacity="0.8"/>
 </g>
 <g id="${id}_openLids">
 <path d="M0 60 A60,60 0 0,1 120,60 A60,30 0 0,0 0,60 Z" opacity="1" fill="#FDDC99" fill-opacity="1" filter="url(#shadow)" />
 <path d="M0 60 A60,60 0 0,0 120,60 A60,40 0 0,1 0,60 Z" opacity="1" fill="#F4CB76" fill-opacity="1" />
 </g>
 <g id="${id}_closeLid">
 <path d="M0 60 A60,60 0 0,1 120,60 A60,40 0 0,1 0,60 Z" opacity="1" fill="#FDDC99" fill-opacity="1" />
 </g>
 </svg>
 `;

 document.writeln(eyeView('leftEye'));
 document.writeln(eyeView('rightEye'));

 const v = 14; // versatz - Abstand des Pupillenzentrums vom Augenzentrum in SVG units

 const eyeBinding = eyeId => {
 const rect = document.querySelectorAll(eyeId + '_iris ellipse')[0].getBoundingClientRect();
 const iris = document.querySelector(eyeId + '_iris');
 const closeLidLayer = document.querySelector(eyeId + '_closeLid');
 // @ts-ignore
 closeLidLayer.style.opacity = 0;

 setInterval(evt => {
 // @ts-ignore
 if (closeLidLayer.style.opacity === '1') return; // do not close and then open if already closed
 // @ts-ignore
 closeLidLayer.style.opacity = '1';
 // @ts-ignore
 setTimeout(evt => closeLidLayer.style.opacity = '0', 300);
 }, 7 * 1000);

 const xo = rect.x + rect.width / 2;  // x-origin
 const yo = rect.y + rect.height / 2; // y-origin

 // @ts-ignore
 document.querySelector(eyeId).onclick = evt => closeLidLayer.style.opacity = (closeLidLayer.style.opacity === '1') ?
 '0' :
 '1';

 return evt => {
 const xm = evt.clientX - xo; // the normalized x/y coords to work with
 const ym = evt.clientY - yo;

 const xmax = rect.width / 1.5;
 const ymax = rect.height / 2;

 const widestFocus = 400; // when x is so far away, the eye is maximal extended
 const scaledX = xm * (xmax / widestFocus);
 let xe = xm > 0
 ? Math.min(xmax, scaledX)
 : Math.max(-xmax, scaledX);
 const scaledY = ym * (ymax / widestFocus);
 let ye = ym > 0
 ? Math.min(ymax, scaledY)
 : Math.max(-ymax, scaledY);
 if (xe * xe + ye * ye > xmax * ymax) {
 xe *= 0.9;
 ye *= 0.9;
 }
 // @ts-ignore
 iris.style.transform = `translateX(${xe}px) translateY(${ye}px)`;
 };
 };




 const leftListener = eyeBinding('#leftEye');
 const rightListener = eyeBinding('#rightEye');

document.onmousemove = evt => { // highlander pattern
  leftListener(evt);
  rightListener(evt);
};
 */

@Component({
  selector: 'app-copy-paste-eye',
  templateUrl: './copy-paste-eye.component.html',
  styleUrls: ['./copy-paste-eye.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyPasteEyeComponent implements OnInit {

  constructor() {

    const eyeView = id => `
    <svg id="${id}" viewBox="0 0 120 120">

      <filter id="shadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset       dx="0" dy="8" />
        <feColorMatrix  type="matrix"
                        values="0 0 0 0  0
                                0 0 0 0  0
                                0 0 0 0  0
                                0 0 0 .5 0"/>
        <feBlend        in="SourceGraphic" mode="normal"/>
      </filter>

      <radialGradient id="gradient1" gradientUnits="objectBoundingBox" cx="50%" cy="50%" r="50%">
        <stop offset= "38%" stop-color="#000000" stop-opacity="1" />
        <stop offset= "46%" stop-color="#073F80" stop-opacity="1" />
        <stop offset= "90%" stop-color="#8EC0DD" stop-opacity="1" />
        <stop offset="100%" stop-color="#2F3A46" stop-opacity="1" />
      </radialGradient>
      <g id="${id}_iris">
        <ellipse cx="60" cy="60" rx="30" ry="30" opacity="1" fill="url(#gradient1)" />
        <ellipse cx="50" cy="50" rx="7"  ry="7"  opacity="1" fill="#FFFFFF" fill-opacity="0.8"/>
      </g>
      <g id="${id}_openLids">
        <path d="M0 60 A60,60 0 0,1 120,60 A60,30 0 0,0 0,60 Z" opacity="1" fill="#FDDC99" fill-opacity="1" filter="url(#shadow)" />
        <path d="M0 60 A60,60 0 0,0 120,60 A60,40 0 0,1 0,60 Z" opacity="1" fill="#F4CB76" fill-opacity="1" />
      </g>
      <g id="${id}_closeLid">
        <path d="M0 60 A60,60 0 0,1 120,60 A60,40 0 0,1 0,60 Z" opacity="1" fill="#FDDC99" fill-opacity="1" />
      </g>
    </svg>
    `;

    document.writeln(eyeView('leftEye'));
    document.writeln(eyeView('rightEye'));

    const v = 14; // versatz - Abstand des Pupillenzentrums vom Augenzentrum in SVG units

    const eyeBinding = eyeId => {
      const rect = document.querySelectorAll(eyeId + '_iris ellipse')[0].getBoundingClientRect();
      const iris = document.querySelector(eyeId + '_iris');
      const closeLidLayer = document.querySelector(eyeId + '_closeLid');
      // @ts-ignore
      closeLidLayer.style.opacity = 0;

      setInterval(evt => {
        // @ts-ignore
        if (closeLidLayer.style.opacity === '1') return; // do not close and then open if already closed
        // @ts-ignore
        closeLidLayer.style.opacity = '1';
        // @ts-ignore
        setTimeout(evt => closeLidLayer.style.opacity = '0', 300);
      }, 7 * 1000);

      const xo = rect.x + rect.width / 2;  // x-origin
      const yo = rect.y + rect.height / 2; // y-origin

      // @ts-ignore
      document.querySelector(eyeId).onclick = evt => closeLidLayer.style.opacity = (closeLidLayer.style.opacity === '1') ?
                                                                                   '0' :
                                                                                   '1';

      return evt => {
        const xm = evt.clientX - xo; // the normalized x/y coords to work with
        const ym = evt.clientY - yo;

        const xmax = rect.width / 1.5;
        const ymax = rect.height / 2;

        const widestFocus = 400; // when x is so far away, the eye is maximal extended
        const scaledX = xm * (xmax / widestFocus);
        let xe = xm > 0
                 ? Math.min(xmax, scaledX)
                 : Math.max(-xmax, scaledX);
        const scaledY = ym * (ymax / widestFocus);
        let ye = ym > 0
                 ? Math.min(ymax, scaledY)
                 : Math.max(-ymax, scaledY);
        if (xe * xe + ye * ye > xmax * ymax) {
          xe *= 0.9;
          ye *= 0.9;
        }
        // @ts-ignore
        iris.style.transform = `translateX(${xe}px) translateY(${ye}px)`;
      };
    };

    const leftListener = eyeBinding('#leftEye');
    const rightListener = eyeBinding('#rightEye');

    document.onmousemove = evt => { // highlander pattern
      leftListener(evt);
      rightListener(evt);
    };

  }

  ngOnInit(): void {
  }

}

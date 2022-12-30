import { Injectable } from '@angular/core';
import { fromEvent, debounceTime, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  resizeObs$ = fromEvent(window, 'resize').pipe(
    debounceTime(500),
    map(this.checkScreenSize),
    startWith(this.checkScreenSize())
  );

  checkScreenSize() {
    return document.body.offsetWidth > 700;
  }
}

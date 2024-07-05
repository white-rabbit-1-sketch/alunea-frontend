import {Injectable} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  protected _isMobile: boolean = false;

  constructor(
      protected breakpointObserver: BreakpointObserver
  ) {
    this.init();
  }

  protected init() {
    this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      this._isMobile = result.matches;
    });
  }

  public isMobile(): boolean {
    return this._isMobile;
  }
}

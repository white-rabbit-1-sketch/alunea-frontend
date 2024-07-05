import { Injectable, NgZone } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FlashMessageFeatureComponent} from "../../app/feature/general/flash-message-feature/flash-message-feature.component";

@Injectable({
  providedIn: 'root',
})
export class FlashMessageService {
  protected static readonly DEFAULT_DURATION = 5;

  constructor(
    protected snackBar: MatSnackBar,
    private zone: NgZone
  ) {}

  public showPrimaryMessage(message: string): void {
    this.showMessage(
      FlashMessageFeatureComponent.TYPE_PRIMARY,
      message
    );
  }

  public showWarnMessage(message: string): void {
    this.showMessage(
      FlashMessageFeatureComponent.TYPE_WARN,
      message
    );
  }

  public showSuccessMessage(message: string): void {
    this.showMessage(
      FlashMessageFeatureComponent.TYPE_SUCCESS,
      message
    );
  }

  protected showMessage(type: string, message: string): void {
    this.zone.run(() => {
      this.snackBar.openFromComponent(FlashMessageFeatureComponent, {
        data: {
          message: message,
          type: type
        },
        duration: FlashMessageService.DEFAULT_DURATION * 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }

}

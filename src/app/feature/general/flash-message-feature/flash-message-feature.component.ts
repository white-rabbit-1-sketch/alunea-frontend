import {Component, Inject, inject} from '@angular/core';
import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA
} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-flash-message-feature',
  standalone: true,
  imports: [
    MatSnackBarLabel,
    MatSnackBarActions,
    MatButton,
    MatSnackBarAction
  ],
  templateUrl: './flash-message-feature.component.html',
  styleUrl: './flash-message-feature.component.scss'
})
export class FlashMessageFeatureComponent {
  public static readonly TYPE_PRIMARY = 'primary';
  public static readonly TYPE_WARN = 'warn';
  public static readonly TYPE_SUCCESS = 'success';

  protected type!: string;
  protected message!: string;

  snackBarRef = inject(MatSnackBarRef);

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: {
      message: string,
      type: string
    }
  ) {
    this.message = data.message;
    this.type = data.type;
  }
}

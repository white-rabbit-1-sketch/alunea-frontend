import { Component } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-user-remove-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './user-remove-dialog.component.html',
  styleUrl: './user-remove-dialog.component.scss'
})
export class UserRemoveDialogComponent {

}

import { Component } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-alias-remove-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './alias-remove-dialog.component.html',
  styleUrl: './alias-remove-dialog.component.scss'
})
export class AliasRemoveDialogComponent {

}

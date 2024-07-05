import { Component } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-contact-remove-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './contact-remove-dialog.component.html',
  styleUrl: './contact-remove-dialog.component.scss'
})
export class ContactRemoveDialogComponent {

}

import { Component } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-mailbox-remove-dialog',
  standalone: true,
    imports: [
      MatDialogModule,
      MatButtonModule
    ],
  templateUrl: './mailbox-remove-dialog.component.html',
  styleUrl: './mailbox-remove-dialog.component.scss'
})
export class MailboxRemoveDialogComponent {

}

import { Component } from '@angular/core';
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-contacts-page',
  standalone: true,
    imports: [
        MatAnchor
    ],
  templateUrl: './contacts-page.component.html',
  styleUrl: './contacts-page.component.scss'
})
export class ContactsPageComponent {

}

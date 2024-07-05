import { Component } from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-feature-request-page',
  standalone: true,
    imports: [
        MatButton,
        RouterLink,
        MatAnchor
    ],
  templateUrl: './feature-request-page.component.html',
  styleUrl: './feature-request-page.component.scss'
})
export class FeatureRequestPageComponent {

}

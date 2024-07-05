import { Injectable } from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(
    protected router: Router,
    protected viewportScroller: ViewportScroller
  ) {
  }

  redirectAndScroll(uri: string, fragment: string, fragmentOffset: number = 0) {
    const currentRouterState: RouterStateSnapshot = this.router.routerState.snapshot;

    // Получаем активный URL
    const currentUrl: string = currentRouterState.url.split('#')[0];

    if (currentUrl !== uri) {
      this.router.navigate([uri], { fragment: fragment }).then(() => {
        setTimeout(() => {
          this.smoothScrollTo(fragment, fragmentOffset)
        }, 100);
      });
    } else {
      this.smoothScrollTo(fragment, fragmentOffset)
    }
  }

  smoothScrollTo(fragment: string, fragmentOffset: number = 0) {
    const targetFragment = document.querySelector('#' + fragment);
    if (targetFragment) {
      const fragmentPosition = targetFragment.getBoundingClientRect().top;
      const offsetPosition = fragmentPosition + window.pageYOffset - fragmentOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}

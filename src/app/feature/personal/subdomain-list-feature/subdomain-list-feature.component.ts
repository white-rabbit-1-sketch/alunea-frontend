import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Subdomain} from "../../../../common/entitiy/domain/subdomain.entity";
import {SecurityService} from "../../../../common/service/security.service";
import {User} from "../../../../common/entitiy/user.entity";
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconButton} from "@angular/material/button";
import {NgClass, NgIf} from "@angular/common";
import {EventService} from "../../../../common/service/event.service";
import {MatBadgeModule} from '@angular/material/badge';
import {FlashMessageService} from "../../../../common/service/flash-message.service";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {of, switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {SubdomainRemoveDialogComponent} from "./subdomain-remove-dialog/subdomain-remove-dialog.component";
import {DomainService} from "../../../../common/service/domain.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DeviceService} from "../../../../common/service/device.service";
import {
  SubdomainEnableCatchAllDialogComponent
} from "./subdomain-enable-catch-all-dialog/subdomain-enable-catch-all-dialog.component";
import {finalize} from "rxjs/operators";
import {Mailbox} from "../../../../common/entitiy/mailbox.entity";

@Component({
  selector: 'app-subdomain-list-feature',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconButton,
    NgIf,
    NgClass,
    MatBadgeModule,
    MatSlideToggle
  ],
  templateUrl: './subdomain-list-feature.component.html',
  styleUrl: './subdomain-list-feature.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SubdomainListFeatureComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  protected displayedColumnList!: string[];
  protected dataSource: MatTableDataSource<Subdomain> = new MatTableDataSource();
  protected expandedSubdomain: Subdomain | null = null;

  constructor(
    protected securityService: SecurityService,
    protected domainService: DomainService,
    protected eventService: EventService,
    protected flashMessageService: FlashMessageService,
    protected dialog: MatDialog,
    protected deviceService: DeviceService
  ) {
  }

  ngOnInit(): void {
    this.securityService.getAuthenticatedUser().subscribe({
      next: (user: User | null) => {
        if (user) {
          this.domainService.getSubdomainList(user.getId() as string).subscribe({
            next: (subdomainList: Subdomain[]) => {
              this.dataSource.data = subdomainList;
              this.onSortChange();
            }
          });
        }
      }
    });

    this.eventService.onSubdomainAdded().subscribe(
      (subdomain: Subdomain) => {
        this.dataSource.data.push(subdomain);
        this.dataSource.data = this.dataSource.data;
        this.onSortChange();
      }
    );

    if (this.deviceService.isMobile()) {
      this.displayedColumnList = ['domain', 'expand', 'actions'];
    } else {
      this.displayedColumnList = ['domain', 'catch-all-status', 'status', 'expand', 'actions'];
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleSubdomainCatchAllEnablingStatus(e: any, subdomain: Subdomain): void {
    if (subdomain.getCatchAllMailbox()) {
      this.disableSubdomainCatchAll(subdomain);
    } else {
      this.enableSubdomainCatchAll(e, subdomain);
    }
  }

  toggleSubdomainEnablingStatus(subdomain: Subdomain): void {
    if (subdomain.getIsEnabled()) {
      this.disableSubdomain(subdomain);
    } else {
      this.enableSubdomain(subdomain);
    }
  }

  enableSubdomain(subdomain: Subdomain): void {
    this.domainService.enableDomain(subdomain).subscribe({
      next: () => {

      }
    });
  }

  disableSubdomain(subdomain: Subdomain): void {
    this.domainService.disableDomain(subdomain).subscribe({
      next: () => {

      }
    });
  }

  enableSubdomainCatchAll(e: any, subdomain: Subdomain): void {
    const dialogRef = this.dialog.open(SubdomainEnableCatchAllDialogComponent);

    dialogRef.afterClosed().pipe(
      switchMap((mailbox: Mailbox | undefined) => {
        return mailbox ? this.domainService.enableDomainCatchAll(subdomain, mailbox) : of();
      }),
      finalize(() => {
        e.source.checked = !!subdomain.getCatchAllMailbox();
      })
    ).subscribe({
      next: () => {
        this.flashMessageService.showSuccessMessage($localize `The subdomain's catch-all function has been enabled`);
      },

    });
  }

  disableSubdomainCatchAll(subdomain: Subdomain): void {
    this.domainService.disableDomainCatchAll(subdomain).subscribe({
      next: () => {

      }
    });
  }

  removeSubdomain(subdomain: Subdomain): void {
    const dialogRef = this.dialog.open(SubdomainRemoveDialogComponent);

    dialogRef.afterClosed().pipe(
      switchMap((result) => {
        return result ? this.domainService.removeDomain(subdomain) : of();
      })
    ).subscribe({
      next: () => {
        const index = this.dataSource.data.findIndex(domain => domain === subdomain);

        if (index !== -1) {
          this.dataSource.data.splice(index, 1);
          this.dataSource.data = this.dataSource.data;
          this.flashMessageService.showSuccessMessage($localize `The subdomain has been removed`);
        }
      }
    });
  }

  onSortChange() {
    if (!this.sort.active || this.sort.direction === '') {
      this.dataSource.data = this.dataSource.data;
    } else {
      this.dataSource.data = this.dataSource.data.sort((a, b) => {
        const isAsc = this.sort.direction === 'asc';
        switch (this.sort.active) {
          case 'domain': return this.compare(a.getDomain(), b.getDomain(), isAsc);
          case 'status': return this.compare(a.getIsEnabled(), b.getIsEnabled(), isAsc);
          default: return 0;
        }
      });
    }
  }

  compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

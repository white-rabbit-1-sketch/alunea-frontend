import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {SecurityService} from "../../../../common/service/security.service";
import {EventService} from "../../../../common/service/event.service";
import {FlashMessageService} from "../../../../common/service/flash-message.service";
import {User} from "../../../../common/entitiy/user.entity";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconButton} from "@angular/material/button";
import {NgClass, NgIf} from "@angular/common";
import {MatBadgeModule} from "@angular/material/badge";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AliasService} from "../../../../common/service/alias.service";
import {MatDialog} from "@angular/material/dialog";
import {AliasRemoveDialogComponent} from "./alias-remove-dialog/alias-remove-dialog.component";
import {of, switchMap} from "rxjs";
import {MatTooltip} from "@angular/material/tooltip";
import {MailboxAlias} from "../../../../common/entitiy/alias/mailbox-alias.entity";
import {DeviceService} from "../../../../common/service/device.service";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-mailbox-alias-list-feature',
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
    MatSlideToggleModule,
    MatTooltip
  ],
  templateUrl: './mailbox-alias-list-feature.component.html',
  styleUrl: './mailbox-alias-list-feature.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MailboxAliasListFeatureComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  protected displayedColumnList!: string[];
  protected dataSource: MatTableDataSource<MailboxAlias> = new MatTableDataSource();
  protected expandedAlias: MailboxAlias | null = null;

  constructor(
    protected securityService: SecurityService,
    protected aliasService: AliasService,
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
          this.aliasService.getMailboxAliasList(user.getId() as string).subscribe({
            next: (aliasList: MailboxAlias[]) => {
              this.dataSource.data = aliasList;
              this.onSortChange();
            }
          });
        }
      }
    });

    this.eventService.onMailboxAliasAdded().subscribe(
      (alias: MailboxAlias) => {
        this.dataSource.data.push(alias);
        this.dataSource.data = this.dataSource.data;
        this.onSortChange();
      }
    );

    if (this.deviceService.isMobile()) {
      this.displayedColumnList = ['alias', 'expand', 'actions'];
    } else {
      this.displayedColumnList = ['alias', 'mailbox', 'status', 'expand', 'actions'];
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = this.filterPredicate;
  }

  filterPredicate = (alias: MailboxAlias, filter: string): boolean => {
    const searchValue = filter.trim().toLowerCase();

    const aliasValue = (alias.getRecipient() || '') + '@' +
      (alias.getDomain()?.getDomain() || '') + alias.getMailbox()?.getEmail();

    return aliasValue.trim().toLowerCase().includes(searchValue);
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleAliasEnablingStatus(alias: MailboxAlias): void {
    if (alias.getIsEnabled()) {
      this.disableAlias(alias);
    } else {
      this.enableAlias(alias);
    }
  }

  enableAlias(alias: MailboxAlias): void {
    this.aliasService.enableAlias(alias).subscribe({
      next: () => {

      }
    });
  }

  disableAlias(alias: MailboxAlias): void {
    this.aliasService.disableAlias(alias).subscribe({
      next: () => {

      }
    });
  }

  removeAlias(alias: MailboxAlias): void {
    const dialogRef = this.dialog.open(AliasRemoveDialogComponent);

    dialogRef.afterClosed().pipe(
      switchMap((result) => {
        return result ? this.aliasService.removeAlias(alias) : of();
      })
    ).subscribe({
      next: () => {
        const index = this.dataSource.data.findIndex(iterationAlias => iterationAlias === alias);

        if (index !== -1) {
          this.dataSource.data.splice(index, 1);
          this.dataSource.data = this.dataSource.data;
          this.flashMessageService.showSuccessMessage($localize `The alias has been removed`);
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
          case 'alias': return this.compare(a.getRecipient(), b.getRecipient(), isAsc);
          case 'mailbox': return this.compare(a.getMailbox()?.getEmail(), b.getMailbox()?.getEmail(), isAsc);
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

import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SecurityService} from "../../../../common/service/security.service";
import {User} from "../../../../common/entitiy/user.entity";
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from "@angular/material/menu";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgClass, NgIf} from "@angular/common";
import {EventService} from "../../../../common/service/event.service";
import {MatBadgeModule} from '@angular/material/badge';
import {FlashMessageService} from "../../../../common/service/flash-message.service";
import {Mailbox} from "../../../../common/entitiy/mailbox.entity";
import {MailboxService} from "../../../../common/service/mailbox.service";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {of, switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {MailboxRemoveDialogComponent} from "./mailbox-remove-dialog/mailbox-remove-dialog.component";
import {finalize} from "rxjs/operators";
import {DeviceService} from "../../../../common/service/device.service";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-mailbox-list-feature',
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
    MatSlideToggle,
    MatButton,
    MatTooltip
  ],
  templateUrl: './mailbox-list-feature.component.html',
  styleUrl: './mailbox-list-feature.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MailboxListFeatureComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  protected displayedColumnList!: string[];
  protected dataSource: MatTableDataSource<Mailbox> = new MatTableDataSource();
  protected mailboxVerificationEmailResendButtonDisabledMap= new Map<string, boolean>();
  protected expandedMailbox: Mailbox | null = null;

  constructor(
    protected securityService: SecurityService,
    protected mailboxService: MailboxService,
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
          this.mailboxService.getMailboxList(user.getId() as string).subscribe({
            next: (mailboxList: Mailbox[]) => {
              this.dataSource.data = mailboxList;
              this.onSortChange();
            }
          });
        }
      }
    });

    this.eventService.onMailboxAdded().subscribe(
      (mailbox: Mailbox) => {
        this.dataSource.data.push(mailbox);
        this.dataSource.data = this.dataSource.data;
        this.onSortChange();
      }
    );

    if (this.deviceService.isMobile()) {
      this.displayedColumnList = ['email', 'expand', 'actions'];
    } else {
      this.displayedColumnList = ['email', 'state', 'status', 'expand', 'actions'];
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

  toggleMailboxEnablingStatus(mailbox: Mailbox): void {
    if (mailbox.getIsEnabled()) {
      this.disableMailbox(mailbox);
    } else {
      this.enableMailbox(mailbox);
    }
  }

  favoriteMailbox(mailbox: Mailbox): void {
    this.mailboxService.favoriteMailbox(mailbox).subscribe({
      next: () => {
        this.dataSource.data.forEach((iterationMailbox: Mailbox) => {
          if (mailbox != iterationMailbox) {
            iterationMailbox.setIsFavorite(false);
          }
        });
      }
    });
  }

  enableMailbox(mailbox: Mailbox): void {
    this.mailboxService.enableMailbox(mailbox).subscribe({
      next: () => {

      }
    });
  }

  disableMailbox(mailbox: Mailbox): void {
    this.mailboxService.disableMailbox(mailbox).subscribe({
      next: () => {

      }
    });
  }

  removeMailbox(mailbox: Mailbox): void {
    const dialogRef = this.dialog.open(MailboxRemoveDialogComponent);

    dialogRef.afterClosed().pipe(
      switchMap((result) => {
        return result ? this.mailboxService.removeMailbox(mailbox) : of();
      })
    ).subscribe({
      next: () => {
        const index = this.dataSource.data.findIndex(box => box === mailbox);

        if (index !== -1) {
          this.dataSource.data.splice(index, 1);
          this.dataSource.data = this.dataSource.data;
          this.flashMessageService.showSuccessMessage($localize `The mailbox has been removed`);
        }
      }
    });
  }

  resendVerificationEmail(mailbox: Mailbox) {
    this.mailboxVerificationEmailResendButtonDisabledMap.set(mailbox.getId() as string, true);
    this.securityService.getAuthenticatedUser().pipe(
      switchMap((user: User | null) => {
        return user ? this.mailboxService.sendMailboxEmailVerificationEmail(mailbox.getId() as string).pipe(
          finalize(() => {
            this.mailboxVerificationEmailResendButtonDisabledMap.set(mailbox.getId() as string, false);
            }
          )) : of() ;
      })
    ).subscribe({
      next: () => {
        this.flashMessageService.showSuccessMessage($localize `The verification email has been successfully sent`);
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
          case 'email': return this.compare(a.getEmail(), b.getEmail(), isAsc);
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

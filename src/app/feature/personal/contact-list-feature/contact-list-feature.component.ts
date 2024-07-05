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
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {of, switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Contact} from "../../../../common/entitiy/contact.entity";
import {ContactService} from "../../../../common/service/contact.service";
import {ContactRemoveDialogComponent} from "./contact-remove-dialog/contact-remove-dialog.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DeviceService} from "../../../../common/service/device.service";
import {MailboxAlias} from "../../../../common/entitiy/alias/mailbox-alias.entity";

@Component({
  selector: 'app-contact-list-feature',
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
    MatButton
  ],
  templateUrl: './contact-list-feature.component.html',
  styleUrl: './contact-list-feature.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ContactListFeatureComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  protected displayedColumnList!: string[];
  protected dataSource: MatTableDataSource<Contact> = new MatTableDataSource();
  protected expandedContact: Contact | null = null;

  constructor(
      protected securityService: SecurityService,
      protected contactService: ContactService,
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
          this.contactService.getContactList(user.getId() as string).subscribe({
            next: (contactList: Contact[]) => {
              this.dataSource.data = contactList;
              this.onSortChange();
            }
          });
        }
      }
    });

    this.eventService.onContactAdded().subscribe(
        (contact: Contact) => {
          this.dataSource.data.push(contact);
          this.dataSource.data = this.dataSource.data;
          this.onSortChange();
        }
    );

    if (this.deviceService.isMobile()) {
      this.displayedColumnList = ['email', 'expand', 'actions'];
    } else {
      this.displayedColumnList = ['email', 'status', 'expand', 'actions'];
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

  toggleContactEnablingStatus(contact: Contact): void {
    if (contact.getIsEnabled()) {
      this.disableContact(contact);
    } else {
      this.enableContact(contact);
    }
  }

  enableContact(contact: Contact): void {
    this.contactService.enableContact(contact).subscribe({
      next: () => {

      }
    });
  }

  disableContact(contact: Contact): void {
    this.contactService.disableContact(contact).subscribe({
      next: () => {

      }
    });
  }

  removeContact(contact: Contact): void {
    const dialogRef = this.dialog.open(ContactRemoveDialogComponent);

    dialogRef.afterClosed().pipe(
        switchMap((result) => {
          return result ? this.contactService.removeContact(contact) : of();
        })
    ).subscribe({
      next: () => {
        const index = this.dataSource.data.findIndex(c => c === contact);

        if (index !== -1) {
          this.dataSource.data.splice(index, 1);
          this.dataSource.data = this.dataSource.data;
          this.flashMessageService.showSuccessMessage($localize `The contact has been removed`);
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

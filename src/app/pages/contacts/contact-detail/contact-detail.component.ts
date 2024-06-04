import { Component, inject, Input, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IContact } from '@app/@interfaces/IContact';
import { ContactsService } from '@app/services/contacts.service';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css',
})
export class ContactDetailComponent {
  private _contactsService = inject(ContactsService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  protected contact = signal<IContact | null>(null);

  @Input() set id(id: string) {
    const c = this._contactsService.getContact(id);

    if (c) {
      this.contact.set(c);
    } else {
      this.handleBackClick();
    }
  }

  handleEditClick() {
    this._router.navigate(['/contacts', this.contact()!.id, 'edit']);
  }

  handleDeleteClick() {
    this._contactsService.deleteContact(this.contact()!);
  }

  handleBackClick() {
    this._router.navigate(['../'], { relativeTo: this._route });
  }
}

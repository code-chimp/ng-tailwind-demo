import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ContactsService } from '../../services/contacts.service';
import { IContact } from '../../@interfaces/IContact';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  private _contactsService = inject(ContactsService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  get contacts(): IContact[] {
    return this._contactsService.getContacts();
  }

  handleAddClick() {
    this._router.navigate(['new'], { relativeTo: this._route });
  }
}

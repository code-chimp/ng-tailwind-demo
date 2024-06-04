import { Component, inject, Input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IContact } from '../../../@interfaces/IContact';
import { ContactsService } from '../../../services/contacts.service';

const stateLength = 2;
const zipLength = 5;

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
  private _contactsService = inject(ContactsService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  protected contact = signal<IContact | null>(null);
  protected updating = signal<boolean>(false);

  @Input() set id(id: string) {
    const contact = this._contactsService.getContact(id);

    if (contact) {
      this.updating.set(true);

      this.contactForm.patchValue({
        name: contact.name,
        avatar: contact.avatar,
        email: contact.email,
        mobilePhone: contact.phone.mobile ?? '',
        workPhone: contact.phone.work ?? '',
        address: contact.address,
        city: contact.city,
        state: contact.state,
        postalCode: contact.postalCode,
        notes: contact.notes,
      });

      this.contact.set(contact);
    }
  }

  contactForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    avatar: new FormControl<string>('avatar-0.png', Validators.required),
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    mobilePhone: new FormControl<string>('', [Validators.minLength(10), Validators.required]),
    workPhone: new FormControl<string>(''),
    address: new FormControl<string>('', Validators.required),
    city: new FormControl<string>('', Validators.required),
    state: new FormControl<string>('', [
      Validators.minLength(stateLength),
      Validators.maxLength(stateLength),
      Validators.required,
    ]),
    postalCode: new FormControl<string>('', [
      Validators.minLength(zipLength),
      Validators.maxLength(zipLength),
      Validators.required,
    ]),
    country: new FormControl<string>('USA', Validators.required),
    notes: new FormControl<string>(''),
  });

  handleSubmitClick() {
    if (this.contactForm.valid) {
      if (this.updating() && this.contact()) {
        const contact: IContact = {
          id: this.contact()!.id,
          name: this.contactForm.value.name!,
          avatar: this.contactForm.value.avatar!,
          email: this.contactForm.value.email!,
          phone: {
            mobile: this.contactForm.value.mobilePhone!,
            work: this.contactForm.value.workPhone ?? undefined,
          },
          address: this.contactForm.value.address!,
          city: this.contactForm.value.city!,
          state: this.contactForm.value.state!,
          postalCode: this.contactForm.value.postalCode!,
          country: this.contactForm.value.country!,
          notes: this.contactForm.value.notes!,
          createdAt: this.contact()!.createdAt,
          updatedAt: new Date().toISOString(),
        };

        this._contactsService.updateContact(contact);
      } else {
        const contact = {
          name: this.contactForm.value.name!,
          avatar: this.contactForm.value.avatar!,
          email: this.contactForm.value.email!,
          phone: {
            mobile: this.contactForm.value.mobilePhone!,
            work: this.contactForm.value.workPhone ?? undefined,
          },
          address: this.contactForm.value.address!,
          city: this.contactForm.value.city!,
          state: this.contactForm.value.state!,
          postalCode: this.contactForm.value.postalCode!,
          country: this.contactForm.value.country!,
          notes: this.contactForm.value.notes!,
          createdAt: new Date().toISOString(),
          updatedAt: null,
        };
        this._contactsService.addContact(contact);
      }

      this._router.navigate(['../'], { relativeTo: this._route });
    }
  }

  handleCancelClick() {
    this._router.navigate(['../'], { relativeTo: this._route });
  }
}

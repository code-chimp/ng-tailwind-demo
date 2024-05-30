import { Injectable, signal } from '@angular/core';

import { IContact } from '../@interfaces/IContact';
import { seedData } from '../seed-data';

/**
 * @class ContactsService
 * @description This service is responsible for managing contacts data.
 */
@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  /**
   * @private
   * @type {signal<IContact[]>}
   * @description A signal representing the list of contacts.
   */
  private _contacts = signal<IContact[]>([]);

  /**
   * @constructor
   * @description Initializes the contacts list from local storage or seed data.
   */
  constructor() {
    const rawContacts = localStorage.getItem('contacts');

    this._contacts.set(rawContacts ? JSON.parse(rawContacts) : seedData.slice());
  }

  /**
   * @private
   * @method _saveContacts
   * @description Saves the current state of contacts to local storage.
   */
  private _saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(this._contacts()));
  }

  /**
   * @method getContacts
   * @returns {IContact[]} The current list of contacts.
   */
  getContacts(): IContact[] {
    return this._contacts();
  }

  /**
   * @method getContact
   * @param {string} id The ID of the contact to retrieve.
   * @returns {IContact | null} The contact with the specified ID, or null if not found.
   */
  getContact(id: string): IContact | null {
    return this._contacts().find(c => c.id === id) ?? null;
  }

  /**
   * @method addContact
   * @param {Omit<IContact, 'id' | 'updatedAt'>} contact The contact to add.
   * @description Adds a new contact to the list and saves the updated list to local storage.
   */
  addContact(contact: Omit<IContact, 'id' | 'updatedAt'>) {
    const maxId = this._contacts().reduce(
      (max, contact) => Math.max(max, +contact.id.slice(1)),
      0,
    );

    this._contacts.set([
      ...this._contacts(),
      {
        ...contact,
        id: `c${maxId + 1}`,
        createdAt: new Date().toISOString(),
        updatedAt: null,
      },
    ]);

    this._saveContacts();
  }

  /**
   * @method updateContact
   * @param {IContact} contact The contact to update.
   * @description Updates a contact in the list and saves the updated list to local storage.
   */
  updateContact(contact: IContact) {
    this._contacts.set(
      this._contacts().map(c =>
        c.id === contact.id ? { ...contact, updatedAt: new Date().toISOString() } : c,
      ),
    );
    this._saveContacts();
  }

  /**
   * @method deleteContact
   * @param {IContact} contact The contact to delete.
   * @description Deletes a contact from the list and saves the updated list to local storage.
   */
  deleteContact(contact: IContact) {
    this._contacts.set(this._contacts().filter(c => c.id !== contact.id));
    this._saveContacts();
  }
}

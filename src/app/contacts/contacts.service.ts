import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number = 0;

  constructor(private http: HttpClient) {
    this.getContacts();
    this.maxContactId = this.getMaxId();
  }

  private contactsUrl = 'http://localhost:3000/contacts';

  getContacts() {
    this.http.get<Contact[]>(this.contactsUrl).subscribe({
      next: (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();

        this.contacts.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.contactListChangedEvent.next(this.contacts.slice());
        console.log(this.contacts);
      },
      error: (error: any) => {
        console.error('Error fetching contacts:', error);
      },
      complete: () => {
        console.log('Contact fetch complete');
        console.log(this.contacts);
      },
    });
  }

  getContact(id: string): Contact | null {
    return this.contacts.find((contact) => contact.id === id) || null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      const currentId = Number(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) return;

    newContact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; contact: Contact }>(this.contactsUrl, newContact, {
        headers: headers,
      })
      .subscribe((responseData) => {
        this.contacts.push(responseData.contact);
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(`${this.contactsUrl}/` + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe((response) => {
        this.contacts[pos] = newContact;
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.http.delete(`${this.contactsUrl}/` + contact.id).subscribe((response) => {
      this.contacts.splice(pos, 1);
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }
}

import { Component } from '@angular/core';
import { Contact } from '../contacts/contact.model';

@Component({
  selector: 'cms-contacts',
  standalone: false,
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts {
  selectedContact!: Contact;
}

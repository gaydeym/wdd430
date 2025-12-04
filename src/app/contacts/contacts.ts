import { Component, OnInit } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'cms-contacts',
  standalone: false,
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts implements OnInit {
  selectedContact!: Contact;

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    this.contactsService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    });
  }
}

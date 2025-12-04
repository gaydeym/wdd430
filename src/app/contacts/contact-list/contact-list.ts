import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactList implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactsService: ContactsService) {}

  onSelected(contact: Contact) {
    this.contactsService.contactSelectedEvent.emit(contact);
  }

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
  }
}

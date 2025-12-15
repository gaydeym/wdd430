import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.css',
})
export class ContactEdit implements OnInit {
  @ViewChild('f') documentForm!: NgForm;

  originalContact!: Contact | null;
  contact: Contact = new Contact('', '', '', '', '', null);
  groupContacts: Contact[] = [];
  hasInvalidGroupContact: boolean = false;
  editMode: boolean = false;

  connectedDropLists: string[] = ['availableList', 'groupList'];

  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Subscribe to route parameters
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      // No ID? Creating a new contact
      if (!id) {
        this.editMode = false;
        return;
      }

      // Get the original contact by ID
      this.originalContact = this.contactsService.getContact(id);

      // No contact found? Do nothing
      if (!this.originalContact) {
        return;
      }

      // Editing an existing contact
      this.editMode = true;

      // Clone the contact
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      // If the contact has a group, clone that too
      if (this.contact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      }
    });
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      value.id,
      value.name,
      value.email,
      value.phone,
      value.imageUrl || '',
      this.groupContacts.length > 0 ? this.groupContacts : null
    );

    if (this.editMode === true) {
      this.contactsService.updateContact(this.originalContact!, newContact);
    } else {
      this.contactsService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  canEnterGroup = (drag: any, drop: any): boolean => {
    const draggedContact: Contact = drag.data;

    if (!draggedContact || !this.groupContacts) {
      return false;
    }

    const isDuplicate = this.groupContacts.some((c) => c.id === draggedContact.id);
    return !isDuplicate;
  };

  onGroupDrop(event: CdkDragDrop<Contact[]>) {
    const draggedContact = event.item.data as Contact;

    const invalidGroupContact = this.isInvalidContact(draggedContact);
    if (invalidGroupContact) {
      this.hasInvalidGroupContact = true;
      return;
    }

    this.hasInvalidGroupContact = false;

    if (event.previousContainer !== event.container) {
      this.groupContacts.push(draggedContact);
    } else {
      const previousIndex = event.previousIndex;
      const currentIndex = event.currentIndex;
      this.groupContacts.splice(currentIndex, 0, this.groupContacts.splice(previousIndex, 1)[0]);
    }
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}

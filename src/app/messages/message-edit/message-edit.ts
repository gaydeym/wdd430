import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { ContactsService } from '../../contacts/contacts.service';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.html',
  styleUrl: './message-edit.css',
})
export class MessageEdit {
  @ViewChild('subject') subjectInput!: ElementRef;
  @ViewChild('msgText') msgTextInput!: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = '101';

  constructor(private messageService: MessageService, private contactsService: ContactsService) {}

  onSendMessage() {
    const subject = this.subjectInput.nativeElement.value;
    const msgText = this.msgTextInput.nativeElement.value;

    this.currentSender = '101';

    const newMessage = new Message('temp', subject, msgText, this.currentSender);

    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.msgTextInput.nativeElement.value = '';
  }
}

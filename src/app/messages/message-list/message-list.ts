import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList implements OnInit {
  messages: Message[] = [
    new Message('1', 'Update', 'The system will be updated tonight.', 'Alice'),
    new Message('2', 'Alert', 'Your password will expire soon.', 'David'),
    new Message('3', 'Greetings', 'Hope you are having a great day!', 'Maria'),
  ];

  constructor() {}

  ngOnInit(): void {}

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}

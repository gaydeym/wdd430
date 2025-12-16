import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList implements OnInit, OnDestroy {
  messages: Message[] = [];
  private messageChangeSub!: Subscription;

  constructor(private messageService: MessageService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.messageService.getMessages();
    this.messageChangeSub = this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.cdr.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.messageChangeSub.unsubscribe();
  }
}

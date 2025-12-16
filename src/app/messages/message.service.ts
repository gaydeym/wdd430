import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();
  maxMessageId: number = 0;

  private messagesUrl = 'https://wdd430-975d9-default-rtdb.firebaseio.com/messages.json';

  constructor(private http: HttpClient) {
    this.maxMessageId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;

    for (const message of this.messages) {
      const currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  getMessages() {
    this.http.get<{ [key: string]: Message }>(this.messagesUrl).subscribe({
      next: (messagesObj: { [key: string]: Message }) => {
        this.messages = Object.values(messagesObj || {});
        this.maxMessageId = this.getMaxId();

        this.messageChangedEvent.next(this.messages.slice());
      },
      error: (error: any) => {
        console.error('Error fetching messages:', error);
      },
      complete: () => {
        console.log('Message fetch complete');
      },
    });
  }

  getMessage(id: string): Message | null {
    return this.messages.find((message) => message.id === id) || null;
  }

  addMessage(newMessage: Message): void {
    if (!newMessage) {
      return;
    }

    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString();

    this.messages.push(newMessage);
    this.storeMessages();
  }

  storeMessages() {
    const messagesJson = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.messagesUrl, messagesJson, { headers }).subscribe(() => {
      this.messageChangedEvent.next([...this.messages]);
    });
  }
}

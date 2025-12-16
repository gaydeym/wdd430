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

  private messagesUrl = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {}

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
    this.http.get<Message[]>(this.messagesUrl).subscribe({
      next: (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();

        this.messageChangedEvent.next(this.messages.slice());
      },
      error: (error: any) => {
        console.error('Error fetching messages:', error);
      },
      complete: () => {
        console.log('Message fetch complete');
        console.log(this.messages);
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
    newMessage.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; createdMessage: Message }>(this.messagesUrl, newMessage, {
        headers: headers,
      })
      .subscribe((responseData) => {
        console.log('Respuesta del servidor:', responseData);
        this.messages.push(responseData.createdMessage);
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}

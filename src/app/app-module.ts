import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { Header } from './header';
import { Contacts } from './contacts/contacts';
import { ContactList } from './contacts/contact-list/contact-list';
import { ContactDetail } from './contacts/contact-detail/contact-detail';

@NgModule({
  declarations: [App, Header, Contacts, ContactList, ContactDetail],
  imports: [BrowserModule],
  providers: [provideBrowserGlobalErrorListeners(), provideZonelessChangeDetection()],
  bootstrap: [App],
})
export class AppModule {}

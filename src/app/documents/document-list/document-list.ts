import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList implements OnInit, OnDestroy {
  documents: Document[] = [];
  documentId: string = '';
  private docChangeSub!: Subscription;

  constructor(private documentsService: DocumentsService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.documentsService.getDocuments();

    this.docChangeSub = this.documentsService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.cdr.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.docChangeSub.unsubscribe();
  }
}

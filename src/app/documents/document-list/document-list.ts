import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(private documentsService: DocumentsService) {}

  ngOnInit() {
    this.documents = this.documentsService.getDocuments();

    this.docChangeSub = this.documentsService.documentListChangedEvent.subscribe(
      (documentsList: Document[]) => {
        this.documents = documentsList;
      }
    );
  }

  ngOnDestroy() {
    this.docChangeSub.unsubscribe();
  }
}

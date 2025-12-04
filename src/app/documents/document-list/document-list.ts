import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList implements OnInit {
  documents: Document[] = [];

  constructor(private documentsService: DocumentsService) {}

  onSelectDocument(document: Document) {
    this.documentsService.documentSelectedEvent.emit(document);
  }

  ngOnInit() {
    this.documents = this.documentsService.getDocuments();
  }
}

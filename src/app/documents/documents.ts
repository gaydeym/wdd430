import { Component, OnInit } from '@angular/core';
import { Document } from '../documents/document.model';
import { DocumentsService } from '../documents/documents.service';
@Component({
  selector: 'cms-documents',
  standalone: false,
  templateUrl: './documents.html',
  styleUrl: './documents.css',
})
export class Documents implements OnInit {
  selectedDocument!: Document;

  constructor(private documentsService: DocumentsService) {}

  ngOnInit() {
    this.documentsService.documentSelectedEvent.subscribe((document: Document) => {
      this.selectedDocument = document;
    });
  }
}

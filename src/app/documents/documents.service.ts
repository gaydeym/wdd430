import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number = 0;

  constructor(private http: HttpClient) {
    this.documents = this.documents;
    this.maxDocumentId = this.getMaxId();
  }

  private documentsUrl = 'http://localhost:3000/documents';

  getDocuments() {
    this.http.get<Document[]>(this.documentsUrl).subscribe({
      next: (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();

        this.documents.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
        console.log(this.documents);
      },
      error: (error: any) => {
        console.error('Error fetching documents:', error);
      },
      complete: () => {
        console.log('Document fetch complete');
      },
    });
  }

  getDocument(id: string): Document | null {
    return this.documents.find((document) => document.id === id) || null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (const document of this.documents) {
      const currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    newDocument.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; document: Document }>(this.documentsUrl, newDocument, {
        headers: headers,
      })
      .subscribe((responseData) => {
        this.documents.push(responseData.document);
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(`${this.documentsUrl}/` + originalDocument.id, newDocument, {
        headers: headers,
      })
      .subscribe((response) => {
        this.documents[pos] = newDocument;
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.findIndex((d) => d.id === document.id);
    if (pos < 0) {
      return;
    }
    this.http.delete(`${this.documentsUrl}/` + document.id).subscribe((response) => {
      this.documents.splice(pos, 1);
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }
}

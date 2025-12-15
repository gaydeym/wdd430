import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.html',
  styleUrl: './document-edit.css',
})
export class DocumentEdit implements OnInit {
  @ViewChild('f') documentForm!: NgForm;

  originalDocument!: Document | null;
  document: Document = new Document('', '', '', '', []);
  editMode: boolean = false;

  constructor(
    private documentsService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      if (!id) {
        this.editMode = false;
        return;
      }

      this.originalDocument = this.documentsService.getDocument(id);

      if (!this.originalDocument) {
        return;
      }

      this.editMode = true;

      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newDocument = new Document(value.id, value.name, value.description, value.url);

    if (this.editMode === true) {
      this.documentsService.updateDocument(this.originalDocument!, newDocument);
    } else {
      this.documentsService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }
}

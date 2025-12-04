import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  standalone: false,
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css',
})
export class DocumentDetail implements OnInit {
  document!: Document;
  nativeWindow: any;

  constructor(
    private documentsService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute,
    private windowRefService: WindRefService
  ) {}

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentsService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.document = this.documentsService.getDocument(id)!;
    });
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }
}

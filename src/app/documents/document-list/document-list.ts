import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

  documents: Document[] = [
    new Document(
      '1',
      'Introduction to Databases',
      'This course covers the basic elements of database management systems. It introduces students to the concepts of logical and physical relationships in a data model and the concepts of inner and outer joins. Students will use a computer aided software engineering (CASE) tool to design, create, and query a database.',
      'https://catalog.byupathway.edu/courses/ITM111'
    ),
    new Document(
      '2',
      'Web Fundamentals',
      'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
      'https://catalog.byupathway.edu/courses/WDD130'
    ),
    new Document(
      '3',
      'Web Backend Development',
      'This programming course focuses on constructing dynamic web sites using server-side languages, making use of databases and design patterns. The concepts introduced in Web Frontend Development courses are expected to be continued and implemented.',
      'https://catalog.byupathway.edu/courses/CSE340'
    ),
    new Document(
      '4',
      'Web Services',
      'This course focuses on the backend development of dynamic, service-oriented web applications. Students will learn how to design and implement web services, how to interact with data storage, and how to use these tools to build functioning web application.',
      'https://catalog.byupathway.edu/courses/CSE341'
    ),
    new Document(
      '5',
      'Web Full-Stack Development',
      'This course will teach you how to design and build interactive web based applications using HTML, CSS, JavaScript, and a web development stack.',
      'https://catalog.byupathway.edu/courses/WDD430'
    ),
  ];

  constructor() {}
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
@Component({
  selector: 'app-write-blogs',
  templateUrl: './write-blogs.component.html',
  styleUrls: ['./write-blogs.component.scss']
})
export class WriteBlogsComponent implements OnInit, OnDestroy{
  editor!: Editor;
  html!: '';

  ngOnInit(): void {
    this.editor = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

}

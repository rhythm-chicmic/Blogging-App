import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor,Toolbar,Validators } from 'ngx-editor';
import { PATHS } from 'src/app/common/constants';
@Component({
  selector: 'app-write-blogs',
  templateUrl: './write-blogs.component.html',
  styleUrls: ['./write-blogs.component.scss']
})
export class WriteBlogsComponent implements OnInit, OnDestroy{
  editor!: Editor;
  writeForm!:FormGroup
  html!: '';
  constructor(private fb:FormBuilder,private router:Router){
    this.initWriteForm();
  }
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  initWriteForm(){
    this.writeForm =this.fb.group({
      editorContent: new FormControl('', Validators.required()),
    });
  }

  OnSubmit(){
    console.log(this.writeForm.value);
    this.router.navigate([PATHS.MAIN.DASHBOARD])
    
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

}

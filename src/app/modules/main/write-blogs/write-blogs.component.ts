import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import { Editor,Toolbar,Validators as validators } from 'ngx-editor';
import swal from 'sweetalert2'


import { WriteBlogService } from 'src/app/core/services/write-blog.service';
import { PATHS, REGEX } from 'src/app/common/constants';
export interface Tags {
  tagName: string;
}
@Component({
  selector: 'app-write-blogs',
  templateUrl: './write-blogs.component.html',
  styleUrls: ['./write-blogs.component.scss']
})

export class WriteBlogsComponent implements OnInit, OnDestroy{
  editor!: Editor;
  file:any;
  blogId:string='';
  writeForm!:FormGroup
  image:any;
  imageForm!:FormGroup
  addOnBlur = true;
  isTrue:boolean=false
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  html!: '';
  tags: Tags[] = [];

  constructor(private fb:FormBuilder,private router:Router,private WriteBlogService:WriteBlogService){
    if(router.getCurrentNavigation()?.extras?.state?.['data']){
     this.blogId=this.router.getCurrentNavigation()?.extras?.state?.['data']?.blog?.blogId;
      this.isTrue=true;
    this.initEditForm();
     }
     else{
    this.initWriteForm();
     }




    this.initImageForm();

  }

  initImageForm(){
    this.imageForm=this.fb.group({
      file:new FormControl('',Validators.required),
      type:new FormControl(2)

    })
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
      content: new FormControl('',validators.required()),
      title: new FormControl('',[Validators.required,Validators.pattern(REGEX.NAME)]),
      tags: new FormArray([]),
      previewImage:new FormControl('')

    });
  }
  initEditForm(){
    this.writeForm =this.fb.group({
      content: new FormControl(this.router.getCurrentNavigation()?.extras?.state?.['data'].blog.content),
      title: new FormControl(this.router.getCurrentNavigation()?.extras?.state?.['data'].blog.title),
      tags: new FormArray([]),
      previewImage:new FormControl(this.router.getCurrentNavigation()?.extras?.state?.['data'].blog.previewImage)

    });

    let tagsData =this.router.getCurrentNavigation()?.extras?.state?.['data'].tags;

    for(let tagName of tagsData){
      this.tags.push({tagName: tagName});
    }

  }


  OnSubmit(){
    if(this.isTrue){

      this.writeForm.value.tags.push(...this.tags);
      if(this.image){
    this.writeForm.value.previewImage=this.image
      }
      console.log(this.writeForm.value, "hello");
      this.WriteBlogService.putBlog(this.writeForm.value,this.blogId).subscribe(res=>console.log(res));
      swal.fire("Good job!", "Blog Updated Successfully!", "success").then(
        ()=>{
          this.router.navigate([PATHS.MAIN.DASHBOARD])
        }
      );
    }
       else{
    this.writeForm.value.tags.push(...this.tags);
    this.writeForm.value.previewImage=this.image;
    console.log(this.writeForm.value);
    this.WriteBlogService.postBlog(this.writeForm.value).subscribe(res=>console.log(res));
    swal.fire("Good job!", "Blog Created Successfully!", "success").then(
        ()=>{
          this.router.navigate([PATHS.MAIN.DASHBOARD])
        }
    )

  }}
  get imageControls(){
    return this.imageForm?.controls;
  }
  get controls(){
    return this.writeForm?.controls;
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  //-------------------------------------------------------------------------------------
  readImage(fileEvent:any){
    console.log(fileEvent);
    this.image= fileEvent.srcElement.files[0];
    console.log(this.image);
    this.imageFormSubmit();
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();


    if (value) {
      this.tags.push({tagName: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tags): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(tag: Tags, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove tag if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing tag
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index].tagName = value;
    }
  }
//------------------------------------------------------------

imageFormSubmit(){
    const data = new FormData();
    data.append('file',this.image);
    data.append('type',this.imageForm?.value.type);
    this.WriteBlogService.postImage(data).subscribe((res:any)=>{
      this.file=res;
      this.image= res.data;
      });

  }


  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

}

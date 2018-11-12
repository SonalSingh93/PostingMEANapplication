import { Post } from './../post.model';
import { MatProgressSpinner } from '@angular/material';
import { PostsService } from './../posts.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validator, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredContent = '';
  enteredTitle = '';
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private postid: string;
  post: Post;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      'title' : new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'content' : new FormControl(null, {
        validators: [Validators.required]
      }),
      'image' : new FormControl(null, {
        validators: [Validators.required],
        asyncValidators : [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postid')) {
        this.mode = 'edit';
        this.postid = paramMap.get('postid');
        this.isLoading = true;
        this.postsService.getPost(this.postid).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id ,
            title: postData.title ,
            content: postData.content,
            imagePath: postData.imagePath
          };
          this.form.setValue({
              title: this.post.title,
              content: this.post.content,
              image: this.post.imagePath
            });
        });
      } else {
        this.mode = 'create';
        this.postid = null;
      }
    });
  }

  OnImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image : file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
    console.log(this.imagePreview);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
      this.postsService.updatePost(
        this.postid ,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image);
    }
    this.form.reset();
  }
}

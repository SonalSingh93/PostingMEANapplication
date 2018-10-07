import { PostsService } from './../posts.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private postid: string;
  post: Post;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postid')) {
        this.mode = 'edit';
        this.postid = paramMap.get('postid');
        this.postsService.getPost(this.postid).subscribe(postData => {
          this.post = {id: postData._id , title: postData.title , content: postData.content};
        });
      } else {
        this.mode = 'create';
        this.postid = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postid , form.value.title, form.value.content);
    }
    form.resetForm();
  }
}

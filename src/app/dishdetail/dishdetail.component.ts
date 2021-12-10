import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../3. Shared/dish';
import { Comment } from '../3. Shared/comment';
import { DishService } from '../2. services/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  @ViewChild('cform') commentFormDirective: any;
  @Input()
  commentForm!: FormGroup;
  comment!: Comment;
  theDish!: Dish;
  DishIDs!: string [];
  Prev!: string;
  Next!: string;
  cDate: Date = new Date(Date.now());
  formErrors : any = {
    author : '',
    comment : ''
  };
  validationMessages : any = {
    author : {
      required : 'The name is required.',
      minlength : 'The name must be at least 3 characters long.',
      maxlength : 'The name cannot be more than 30 characters long.'
    },
    comment : {
      required : 'The comment is required.',
      minlength : 'The comment must be at least 3 characters long.'
    }
  }

  constructor(private fb: FormBuilder,
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location) { 
      this.creatForm();
     }

  ngOnInit(): void {
    this.dishService.getDishIDs().subscribe(dishIDs => this.DishIDs = dishIDs);
    this.route.params.pipe(switchMap((param: Params)  => this.dishService.getDish(param['id'])))
    .subscribe( dish => { this.theDish = dish; this.setPrevNext(dish.id);}); 
  }
  goBack(): void {
    this.location.back();
  }
  setPrevNext(dishID: string): void {
    const index = this.DishIDs.indexOf(dishID);
    this.Prev = this.DishIDs[(this.DishIDs.length + index - 1) % this.DishIDs.length];
    this.Next = this.DishIDs[(this.DishIDs.length + index + 1) % this.DishIDs.length];
  }
  creatForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['',[Validators.required,Validators.minLength(3)]],
      author: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      date: ''
    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChange(data));
    this.onValueChange();
  }
  onValueChange(data?:any) {
    if(!this.commentForm) {return;}
    for(let field in this.formErrors) {
      this.formErrors[field] = '';
      let Ffield = this.commentForm.get(field);
      if(Ffield && Ffield.dirty && !Ffield.valid) {
        let errM = this.validationMessages[field];
        for(let er in Ffield.errors) {
          if(Ffield.errors.hasOwnProperty(er)) 
          { this.formErrors[field] += errM[er] + " "; }
        }
      }
    }
    if(this.commentForm.valid) { this.comment = this.commentForm.value; }
  }
  onSubmit(): void {
    this.comment.date = this.cDate.toISOString();
    this.theDish.comments[this.theDish.comments.length] = this.comment;
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: '',
      date: ''
    });
  }



}

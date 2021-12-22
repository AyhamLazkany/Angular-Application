import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish } from '../3. Shared/dish';
import { Comment } from '../3. Shared/comment';
import { visibility, expand } from '../5. animations/app.animation';
import { DishService } from '../2. services/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {
  @ViewChild('cform') commentFormDirective: any;
  commentForm!: FormGroup;
  comment!: Comment;
  theDish!: Dish | any;
  copyDish!: Dish | any;
  errMsg!: string;
  DishIDs!: string [];
  Prev!: string;
  Next!: string;
  visibility: string = 'shown';
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
    private location: Location,
    @Inject('BaseURL') public BaseURL: any) { 
      this.creatForm();
     }

  ngOnInit(): void {
    this.dishService.getDishIDs().subscribe(dishIDs => this.DishIDs = dishIDs,
      errmsg => this.errMsg = <any>errmsg);
    this.route.params.pipe(switchMap(params => {this.visibility='hidden'; return this.dishService.getDish(params['id']);}))
    .subscribe( dish => { this.theDish = dish; this.copyDish = dish; this.setPrevNext(dish.id); this.visibility='shown'; }); 
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
    this.comment.date = new Date().toISOString();
    this.theDish.comments[this.theDish.comments.length] = this.comment;
    this.dishService.putDish(this.copyDish).subscribe(dish => { this.theDish = dish; this.copyDish = dish },
      errmess => { this.theDish = null; this.copyDish = null; this.errMsg = <any>errmess; });
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: '',
      date: ''
    });
  }



}

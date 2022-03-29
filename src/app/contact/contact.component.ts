import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConType, Feedback } from '../3. Shared/feedback';
import { flyInOut , expand } from '../5. animations/app.animation';
import { FeedbackService } from '../2. services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [ flyInOut(), expand() ]
})
export class ContactComponent implements OnInit {

  feedbacks!:Feedback[];
  feedback!: Feedback | any;
  cfeedback!: Feedback | any;
  feedbackForm!: FormGroup;
  conType: string [] = ConType;
  errMsg!: string;
  @ViewChild('fform') feedbackFormDirective: any;
  formErrors : any = {
    firstname : '',
    lastname : '',
    telnum : '',
    email : ''
  };
  validationMessages : any = {
    firstname : {
      required :      'First Name is required.',
      minlength :     'First Name must be at least 2 characters long.',
      maxlength :     'FirstName cannot be more than 25 characters long.'
    },
    lastname : {
      required :      'Last Name is required.',
      minlength :     'Last Name must be at least 2 characters long.',
      maxlength :     'Last Name cannot be more than 25 characters long.'
    },
    telnum : {
      required :      'Tel. number is required.',
      pattern :       'Tel. number must contain only numbers.'
    },
    email : {
      required :      'Email is required.',
      email :         'Email not in valid format.'
    }
  };
  
  constructor(
    private fb:FormBuilder ,
    private feedbackservice:FeedbackService ,
    @Inject('BaseURL') public BaseURL: any
    ) {
    this.creatForm();
  }

  ngOnInit(): void { 
    this.feedbackservice.getFeedbacks().subscribe(fbs => this.feedbacks = fbs,
      errMsg => this.errMsg = <any>errMsg);
  }
  creatForm(): void {
    this.feedbackForm = this.fb.group({
      firstname:['',[Validators.required , Validators.minLength(2) , Validators.maxLength(25)]],
      lastname:['',[Validators.required , Validators.minLength(2) , Validators.maxLength(25)]],
      telnum:[0,[Validators.required , Validators.pattern]],
      email:['',[Validators.required , Validators.email]],
      contact:false,
      contype:'None',
      message:''
    });
    this.feedbackForm.valueChanges.subscribe(data => this.onValueChange(data));
    this.onValueChange();
  }
  onValueChange(data?: any): void {
    if (!this.feedbackForm) { return; }
    for (let field in this.formErrors) {
      this.formErrors[field] = '';
      let fmfd = this.feedbackForm.get(field);
      if (fmfd && fmfd.dirty && !fmfd.valid ) {
        let message = this.validationMessages[field];
        for (let err in fmfd.errors) {
          if(fmfd.errors.hasOwnProperty(err))
            { this.formErrors[field] += message[err]; }
        }
      }
    }
  }
  onSubmit(): void {
    this.feedback = this.feedbackForm.value;
    this.feedbackservice.postFeedback(this.feedback).subscribe(fb => {this.cfeedback= fb ;this.feedback = null},
      errM => { this.feedback = null; this.errMsg = errM });
    console.log(this.feedbacks);
    this.onReset();
    setTimeout(() => {
      this.cfeedback = null;
    }, 5000);
  }
  onReset(): void {
    this.feedbackFormDirective.resetForm();
    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum:0,
      email:'',
      contact:false,
      contype:'None',
      message:''
    });
  }

}

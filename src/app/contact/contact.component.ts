import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConType, Feedback } from '../3. Shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm!: FormGroup;
  feedback!: Feedback;
  conType: string [] = ConType;
  @ViewChild('fform') feedbackFormDirective: any;
  
  constructor(private fb:FormBuilder) {
    this.creatForm();
  }

  ngOnInit(): void {
  }
  creatForm(): void {
    this.feedbackForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      telnum:[0,Validators.required],
      email:['',Validators.required],
      contact:false,
      contype:'None',
      message:''
    });
  }
  onSubmit(): void {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum:0,
      email:'',
      contact:false,
      contype:'None',
      message:''
    });
    this.feedbackFormDirective.resetForm();
  }

}

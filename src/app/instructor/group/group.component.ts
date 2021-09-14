import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  addUserFrom: FormGroup;
  
  constructor(@Inject(FormBuilder) fb: FormBuilder) {
      this.addUserFrom = fb.group({
          userGroup: fb.group({
              name: ['', Validators.required],
              email: ['', Validators.required],
              phone: ['', Validators.required]
          }),
          addressGroup: fb.group({
              street: ['', Validators.required],
              suite: ['', Validators.required],
              city: ['', Validators.required],
              zipCode: ['', Validators.required]
          })
      });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

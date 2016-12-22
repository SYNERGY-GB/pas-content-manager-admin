import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder, private af: AngularFire) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      this.af.auth.login({
        email: this.email.value,
        password: this.password.value
      }).then(
        () => console.log("success"))
        .catch(error => console.log(error));
    }
  }
}

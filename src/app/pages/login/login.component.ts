import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CLIENTS } from '../../app.clients.ts';

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
  public client:AbstractControl;
  public credentials:Object;

  constructor(fb:FormBuilder, private af: AngularFire, private router: Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'client': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.client = this.form.controls['client'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
    //   this.af.auth.login({
    //     email: this.email.value,
    //     password: this.password.value
    //   }).then(
    //     () => this.router.navigate(['/pages/dashboard']))
    //     .catch(error => console.log(error));
    console.log(this.client.value);
    console.log(this.password.value);
    console.log(this.email.value);
    }

  }

  public checkClient(): Boolean {
    for (var i = 0; i < CLIENTS.length; i++)
    {
      if (this.client.value == CLIENTS[i]){
        this.credentials = CLIENTS[i].credentials;
        return true;
      }
    }
    return false;
  }
}

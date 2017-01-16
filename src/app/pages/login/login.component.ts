import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { FirebaseService } from '../../app-firebase.service';
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

  constructor(fb:FormBuilder, private router: Router, private fs: FirebaseService) {
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
    // console.log(this.client.value);
    // console.log(this.password.value);
    // console.log(this.email.value);

    /* if the client exists, then we check if the user can enter to the app */
      if (this.checkClient())
      { 
        this.fs.authenticate(this.email.value, this.password.value)
          .then(() =>{
            if (this.fs.signedIn == true){
              this.router.navigate(["/pages/content"]);
            }
          })
      }
    }
  }

  public checkClient(): Boolean {
    for (var i = 0; i < CLIENTS.length; i++)
    {
      console.log(CLIENTS[i].name)
      if (this.client.value == CLIENTS[i].name){
        this.fs.initialize(CLIENTS[i].credentials);
        return true;
      }
    }
    return false;
  }
}

/* This service define the Authentication guard to
protect the data of users without permission */

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FirebaseService } from './app-firebase.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{
    constructor(private fs: FirebaseService, private router: Router ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        let url: string = state.url;
        return this.checkURL(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
        return this.canActivate(route, state);
    }

    checkURL(url:string): boolean{
        if (this.fs.signedIn){ 
            return true;}
        else {
            this.fs.redirectURL = url;
            this.router.navigate(["/login"]);
            return false;
        }
    }

}
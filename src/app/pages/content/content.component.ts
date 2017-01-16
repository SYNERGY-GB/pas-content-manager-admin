import { Component } from '@angular/core';
import { FirebaseService } from '../../app-firebase.service';

@Component({
    selector: 'content-ma',
    template: `<strong> My page content here </strong>`
})
export class ContentComponent{
    public modules: Object;
    constructor(private fs: FirebaseService) {}
    ngOnInit(){
        this.fs.db.ref('modules').on('value', (snapshot) => {
            console.log(snapshot.val());
            this.modules = snapshot.val();
            console.log(this.modules);
        });

    }

    public updateModule(val){
        this.modules = val;
    }
}


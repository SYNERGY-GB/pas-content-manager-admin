import { Component} from '@angular/core';
import { FirebaseService } from '../../app-firebase.service';
import { ContentComponent } from './content.component';

@Component({
    selector: 'content-manager',
    template: require('./content-manager.html')
})
export class ContentManagerComponent{
    private modulesObs;
    private modules;
    private selectedModule;
    constructor(private fs: FirebaseService){
        this.fs.db.ref('modules').on('value', (snapshot) => {
        this.modules = Object.keys(snapshot.val());
        console.log(this.modules);
        });
    }
    onSelect(obj){
        console.log(obj);
        this.selectedModule = obj;
    }
}   
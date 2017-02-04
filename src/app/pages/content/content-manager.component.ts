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
        /* Sets the modules. Only the names. Then this names
        will be passed as input to the content component */
        this.fs.db.ref('modules').on('value', (snapshot) => {
        this.modules = Object.keys(snapshot.val());
        });
    }
    onSelect(obj){
        this.selectedModule = obj;
    }
}   
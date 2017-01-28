import { Component } from '@angular/core';
import { FirebaseService } from '../../app-firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'content-ma',
    template: require('./content.html')
})
export class ContentComponent{
    public modules: Object;
    private module: string;
    private schema: any;
    private model: any;
    constructor(
        private fs: FirebaseService,
        private router: Router,
        private route: ActivatedRoute) {}
    ngOnInit(){
        this.route.params.subscribe((params) => {
            this.module = params['id'];
            this.schema = this.fs.modules[this.module].schemaForm.schema;
        });
    }
}


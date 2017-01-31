import { Component, Pipe, PipeTransform } from '@angular/core';
import { FirebaseService } from '../../app-firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'content-ma',
    template: require('./content.html')
})
export class ContentComponent{
    private module: string;
    private schema: any;
    private model: any;
    private columns: string[];
    private actions;
    private banners = [];
    constructor(
        private fs: FirebaseService,
        private router: Router,
        private route: ActivatedRoute) {}
    ngOnInit(){
        this.route.params.subscribe((params) => {
            this.module = params['id'];
            var module = this.fs.modules[this.module];
            this.schema = module.schemaForm.schema;
            this.columns = module.tableColumns;
            var buttons = [{id:"add", label:"Add", ngClass:"status-button btn btn-xs btn-success btn-lg"}]
            this.actions = {
                add: (property) => {
                    var moduleRef = this.fs.db.ref().child(this.module);
                    moduleRef.push(property.value);
                }
            }
            this.schema["buttons"] = buttons;
            var moduleRef = this.fs.db.ref().child(this.module);
            // moduleRef.once('value').then((snapshot) => {
            //     var banners = snapshot.val();
            //     for (var key in banners){
            //         if(banners.hasOwnProperty(key)){
            //             this.banners.push(banners[key]);
            //         }
            //     }
            //     console.log(this.banners)});
            moduleRef.on('child_added', (data) => this.banners.push(data.val()));
        });
    }
}


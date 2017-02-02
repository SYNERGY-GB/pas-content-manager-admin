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
    private objects = [];
    private toModify : any = undefined;
    constructor(
        private fs: FirebaseService,
        private router: Router,
        private route: ActivatedRoute) {}

    ngOnInit(){
        this.route.params.subscribe((params) => {
            this.objects = [];
            this.module = params['id'];
            var module = this.fs.modules[this.module];
            this.schema = module.schemaForm.schema;
            this.columns = module.tableColumns;
            var buttons = [{id:"add", label:"Add", ngClass:"status-button btn btn-xs btn-success btn-lg"}]
            this.actions = { add: (obj) => {
                var moduleRef = this.fs.db.ref().child(this.module);
                if (this.toModify == undefined){
                    console.log("push", obj);
                    moduleRef.push(obj.value).then(() =>  this.toModify = undefined);                   
                }
                else{
                    console.log("update", this.toModify);
                    var update = {};
                    update['/' + this.toModify.key] = obj.value;
                    moduleRef.update(update).then(() => {
                        this.toModify = undefined;
                        console.log("Modified");
                    }); 
                }
                this.model = {};    
            }
            };
            this.schema["buttons"] = buttons;
            var moduleRef = this.fs.db.ref().child(this.module);

            moduleRef.on('child_added', (data) => {
                console.log(data.key, data.val());
                this.objects.push({key: data.key, value: data.val()})});
            moduleRef.on('child_removed', (data) => {
                var objects = [];
                for (var o in this.objects){
                    console.log(this.objects[o].key, data.key);
                    if (this.objects[o].key != data.key)
                    {
                        objects.push(this.objects[o]);
                    }
                }
                this.objects = objects;
                console.log(this.objects);
            });
            moduleRef.on('child_changed', (data) =>{
                for (var o in this.objects){
                    console.log(this.objects[o].key, data.key);
                    if (this.objects[o].key == data.key)
                        this.objects[o].value = data.val();
                }
            });
        });
    }

    delete(obj){
        var moduleRef = this.fs.db.ref().child(this.module+"/"+obj.key);
        moduleRef.remove().then(() => {
            this.toModify = undefined;
            this.model = {};
        });

    }

    modify(obj){
        this.model = obj.value;
        this.toModify = obj;
        console.log(this.toModify);
    }
}


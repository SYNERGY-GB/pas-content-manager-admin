import { Component, Input } from '@angular/core';
import { FirebaseService } from '../../app-firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'content',
    template: require('./content.html')
})
export class ContentComponent{
    @Input() module: string;
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
            this.objects = [];
            var module = this.fs.modules[this.module];
            this.schema = module.schemaForm.schema;
            this.columns = module.tableColumns;
            this.setButtonsAndActions();
            this.setFirebaseCallbacks();
    }

    /* Executes when delete button is clicked. Deletes an element at the Firebase.
    Also reset the model and the object toModify */
    delete(obj){
        var moduleRef = this.fs.db.ref().child(this.module+"/"+obj.key);
        moduleRef.remove().then(() => {
            this.toModify = undefined;
            this.model = {};
        });

    }

    /* Executes when modify button is clicked. This set the object to modify then */
    modify(obj){
        this.model = obj.value;
        this.toModify = obj;
    }

    setFirebaseCallbacks(){
        /* Push the new object added to the Firebase into the 
        objects array  */
        var moduleRef = this.fs.db.ref().child(this.module);
        moduleRef.on('child_added', (data) => {
            this.objects.push({key: data.key, value: data.val()})
        });

        /* Creates a new array of objects with all the elements, 
        excepte the deleted one */
        moduleRef.on('child_removed', (data) => {
            var objects = [];
            for (var o in this.objects){
                if (this.objects[o].key != data.key)
                {
                    objects.push(this.objects[o]);
                }
            }
            this.objects = objects;
        });

        /* Iterates through the objects and change the same object
        that was changed at the Firebase. The key attribute is unique */
        moduleRef.on('child_changed', (data) =>{
            for (var o in this.objects){
                if (this.objects[o].key == data.key)
                    this.objects[o].value = data.val();
            }
        });
    }

    /* Sets the buttons and the respective actions of the SchemaForm,
    to submit the data needed for the CRUD operations */
    setButtonsAndActions(){
        var buttons = [{id:"add", label:"Add"}]
        this.actions = { add: (obj) => {
            var moduleRef = this.fs.db.ref().child(this.module);
            if (this.toModify == undefined){
                moduleRef.push(obj.value).then(() =>  this.toModify = undefined);                   
            }
            else{
                var update = {};
                update['/' + this.toModify.key] = obj.value;
                moduleRef.update(update).then(() => {
                    this.toModify = undefined;
                }); 
            }
            this.model = {};    
            }
        };
        this.schema["buttons"] = buttons;
    }
}


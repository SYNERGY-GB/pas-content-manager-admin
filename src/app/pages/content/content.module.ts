import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { ContentManagerComponent } from './content-manager.component';
import { routing } from './content.routing';
import { NgaModule } from '../../theme/nga.module';
import { SchemaFormModule } from 'angular2-schema-form';


@NgModule({
    imports: [
        CommonModule,
        routing,
        NgaModule,
        SchemaFormModule
    ],
    declarations: [
        ContentComponent,
        ContentManagerComponent,
    ]
})
export default class ContentModule{}
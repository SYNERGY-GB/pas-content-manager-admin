import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { routing } from './content.routing';
import { NgaModule } from '../../theme/nga.module';
import { SchemaFormModule } from 'angular2-schema-form';
//import { TablesModule } from '../tables/tables.module';

@NgModule({
    imports: [
        CommonModule,
        routing,
        NgaModule,
        SchemaFormModule
    ],
    declarations: [
        ContentComponent
    ]
})
export default class ContentModule{}
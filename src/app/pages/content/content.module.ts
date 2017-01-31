import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { routing } from './content.routing';
import { NgaModule } from '../../theme/nga.module';
import { SchemaFormModule } from 'angular2-schema-form';
import { KeysPipe } from './keys.pipe';
//import { TablesModule } from '../tables/tables.module';

@NgModule({
    imports: [
        CommonModule,
        routing,
        NgaModule,
        SchemaFormModule
    ],
    declarations: [
        ContentComponent,
        KeysPipe
    ]
})
export default class ContentModule{}
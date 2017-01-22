import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { routing } from './content.routing';
import { NgaModule } from '../../theme/nga.module';
//import { TablesModule } from '../tables/tables.module';

@NgModule({
    imports: [
        CommonModule,
        routing,
        NgaModule
    ],
    declarations: [
        ContentComponent
    ]
})
export default class ContentModule{}
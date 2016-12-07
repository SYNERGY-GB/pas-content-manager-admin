import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { routing } from './content.routing';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [
        ContentComponent
    ]
})
export default class ContentModule{}
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content.component';
import { ContentManagerComponent } from './content-manager.component';

const routes: Routes = [
    {
        path: '',
        component: ContentManagerComponent
    }
];

export const routing = RouterModule.forChild(routes);

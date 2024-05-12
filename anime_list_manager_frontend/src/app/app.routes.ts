import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';


export const routes: Routes = [
  // other routes...
  { path: 'create-anime', component: CreateComponent },
  {
    path: 'update-anime/:id',
    component: EditComponent,
  },{
    path: 'delete-anime/:id',
    component: DeleteComponent,
  },
];

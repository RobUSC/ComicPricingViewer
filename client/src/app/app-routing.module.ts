import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemsListComponent} from './items-list/items-list.component';
import {AddItemComponent} from "./add-item/add-item.component";
import {EditItemComponent} from "./edit-item/edit-item.component";

const routes: Routes = [
  {path: '', redirectTo: 'items', pathMatch: 'full'},
  {path: 'items', component: ItemsListComponent},
  {path: 'items/new', component: AddItemComponent},
  {path: 'items/edit/:id', component: EditItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

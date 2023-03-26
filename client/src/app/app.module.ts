import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ItemsListComponent} from './items-list/items-list.component';
import {ItemFormComponent} from './item-form/item-form.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddItemComponent} from './add-item/add-item.component';
import {EditItemComponent} from './edit-item/edit-item.component';
import {PaginationComponent} from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    ItemFormComponent,
    AddItemComponent,
    EditItemComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

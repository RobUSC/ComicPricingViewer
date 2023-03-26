import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-add-item',
  template: `
   <h2 class="text-center m-5">Add a New Item</h2>
   <app-item-form (formSubmitted)="addItem($event)"></app-item-form>
 `
})
export class AddItemComponent {
  constructor(
    private router: Router,
    private itemService: ItemService
  ) { }

  addItem(item: Item) {
    this.itemService.createItem(item)
      .subscribe({
        next: () => {
          this.router.navigate(['/items']);
        },
        error: (error) => {
          alert("Failed to create item");
          console.error(error);
        }
      });
  }
}

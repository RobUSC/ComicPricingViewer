import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-edit-item.component.ts',
  template: `
   <h2 class="text-center m-5">Edit an Item</h2>
   <app-item-form [initialState]="item" (formSubmitted)="editItem($event)"></app-item-form>
 `
})
export class EditItemComponent implements OnInit {
  item: BehaviorSubject<Item> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.itemService.getItem(id !).subscribe((item) => {
      this.item.next(item);
    });
  }

  editItem(item: Item) {
    this.itemService.updateItem(this.item.value._id || '', item)
      .subscribe({
        next: () => {
          this.router.navigate(['/items']);
        },
        error: (error) => {
          alert('Failed to update item');
          console.error(error);
        }
      })
  }
}

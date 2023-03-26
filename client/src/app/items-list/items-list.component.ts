import {Component} from '@angular/core';
import {ItemService} from '../item.service';
import {Subject} from "rxjs";
import {Item} from "../item";
import {FormControl} from "@angular/forms";
import {HttpParams} from "@angular/common/http";


@Component({selector: 'app-root', templateUrl: './items-list.component.html'})
export class ItemsListComponent {
  itemsS: Subject<Item[]> = new Subject<Item[]>()
  items: Item[] = []
  sortProperty: string = 'id'
  sortOrder = 1;
  loading = false;
  id = new FormControl()
  publisher = new FormControl()
  series_title = new FormControl()
  issue_number = new FormControl()
  httpParams: HttpParams = new HttpParams()
  options: any

  constructor(private itemService: ItemService) {
  }

  ngOnInit() {
    this.loading = true;
    this.fetchItems();
    this.loading = false;
  }

  private fetchItems(): void {
    this.setHttpParams()
    this.itemService.getItems(this.options).subscribe(value => {
      this.items = value
    })
  }

  setHttpParams() {
    this.httpParams = new HttpParams()
    if (this.publisher.value) {
      this.httpParams = this.httpParams.append("publisher", this.publisher.value)
    }
    if (this.series_title.value) {
      this.httpParams = this.httpParams.append("series_title", this.series_title.value)
    }
    if (this.issue_number.value) {
      this.httpParams = this.httpParams.append("issue_number", this.issue_number.value)
    }
    this.options = {params: this.httpParams}
  }

  deleteItem(id: string): void {
    this.itemService.deleteItem(id).subscribe({
      next: () => this.fetchItems()
    });
  }

  onChangePage(items: Subject<Item[]>) {
    this.itemsS = items
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1
    this.sortProperty = property
    this.items = [...this.items.sort((a: any, b: any) => {
      let result = 0
      if (a[property] < b[property]) {
        result = -1
      }
      if (a[property] > b[property]) {
        result = 1
      }
      return result * this.sortOrder
    })];
  }

  sortIcon(property: string) {
    if (property === this.sortProperty) {
      return this.sortOrder === 1 ? '⬆️' : '⬇️'
    }
    return '';
  }

  onBlur() {
    this.fetchItems()
  }

  formatNumber(price: any): string {
    if (price) {
      return (Number(price["$numberDecimal"])).toLocaleString('en-US', {minimumFractionDigits: 2 })
    } else {
      return ""
    }
  }
}

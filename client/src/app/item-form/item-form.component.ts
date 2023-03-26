import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../item';

@Component({
  selector: 'app-item-form',
  template: `
      <form class="item-form" autocomplete="off" [formGroup]="itemForm" (ngSubmit)="submitForm()">
          <div class="form-floating mb-3">
              <input class="form-control" type="text" id="publisher" formControlName="publisher" placeholder="Publisher"
                     required>
              <label for="publisher">Publisher</label>
          </div>

          <div *ngIf="publisher.invalid && (publisher.dirty || publisher.touched)" class="alert alert-danger">
              <div *ngIf="publisher.errors?.['required']">
                  publisher is required.
              </div>
          </div>

          <div class="form-floating mb-3">
              <input class="form-control" type="text" id="series_title" formControlName="series_title"
                     placeholder="Series Title" required>
              <label for="series_title">Series Title</label>
          </div>
          <div *ngIf="series_title.invalid && (series_title.dirty || series_title.touched)" class="alert alert-danger">
              <div *ngIf="series_title.errors?.['required']">
                  Series Title is required.
              </div>
          </div>

          <div class="form-floating mb-3">
              <input class="form-control" type="text" id="issue_number" formControlName="issue_number"
                     placeholder="Issue Number" required>
              <label for="issue_number">Issue Number</label>
          </div>
          <div *ngIf="issue_number.invalid && (issue_number.dirty || issue_number.touched)" class="alert alert-danger">
              <div *ngIf="issue_number.errors?.['required']">
                  Issue Number is required.
              </div>
          </div>

          <button class="btn btn-primary" type="submit" [disabled]="itemForm.invalid">Add</button>
      </form>
  `,
  styles: [
    `.item-form {
     max-width: 560px;
     margin-left: auto;
     margin-right: auto;
   }`
  ]
})
export class ItemFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Item> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Item>();

  @Output()
  formSubmitted = new EventEmitter<Item>();

  itemForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get publisher() { return this.itemForm.get('publisher')!; }
  get series_title() { return this.itemForm.get('series_title')!; }
  get issue_number() { return this.itemForm.get('issue_number')!; }

  ngOnInit() {
    this.initialState.subscribe(item => {
      this.itemForm = this.fb.group({
        publisher: [ item.publisher, [Validators.required] ],
        series_title: [ item.series_title, [ Validators.required] ],
        issue_number: [ item.issue_number, [Validators.required] ]
      });
    });

    this.itemForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.itemForm.value);
  }
}

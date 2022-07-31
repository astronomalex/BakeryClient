import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from "../../_services/category.service";
import {Subject, takeUntil} from "rxjs";
import {Category} from "../../_models/category";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AddBunsDto} from "../../_models/add-buns-dto";
import {BunService} from "../../_services/bun.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-buns',
  templateUrl: './add-buns.component.html',
  styleUrls: ['./add-buns.component.css']
})
export class AddBunsComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  ngUnsubscribe$ = new Subject();
  formControl = new FormGroup({
    categoryId: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    dateManufacture: new FormControl(null),
    timeManufacture: new FormControl(null)
  });

  constructor(
    private categoryService: CategoryService,
    private bunService: BunService,
    private router: Router
  ) {
  }

  get controls() {
    return this.formControl.controls;
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(false);
    this.ngUnsubscribe$.complete();
  }

  public getCategories() {
    this.categoryService.getAllCategories().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(categories => {
      this.categories = categories;
    })
  }

  onSubmit() {
    const date = (this.controls['dateManufacture'].value as Date)?.toLocaleDateString();
    const dto: AddBunsDto = {
      categoryId: this.controls['categoryId'].value,
      quantity: this.controls['quantity'].value,
      dateManufacture: date ? date + (this.controls['timeManufacture'].value ? ' ' + this.controls['timeManufacture'].value : '') : ''
    };
    this.bunService.addBuns(dto).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      this.router.navigateByUrl('').then();
    })
  }
}

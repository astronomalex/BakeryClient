import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../_services/category.service";
import {Category} from "../../_models/category";
import {Subject, takeUntil} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EditCategoryDto} from "../../_models/edit-category-dto";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categories: EditCategoryDto[] = [];
  selectedCategory: Category = new class implements Category {
    controlPeriodHours = 0;
    expirationDateHours = 0;
    id = 0;
    name = '';
    price = 0;
  };
  ngUnsubscribe$ = new Subject();
  formControl = new FormGroup({
    id: new FormControl('', [Validators.required]),
    controlPeriodHours: new FormControl('', [Validators.required]),
    expirationDateHours: new FormControl('' ,[Validators.required]),
    price: new FormControl('', [Validators.required])
  });
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(false);
    this.ngUnsubscribe$.complete();
  }

  onSubmit() {
    const catControlId = this.controls['id'].value as number;
    const category = this.categories.find(c => c.id == catControlId)
    if(!category) return;
    const controlPeriodHours = this.controls['controlPeriodHours'].value as number;
    const expirationDateHours = this.controls['expirationDateHours'].value as number;
    const id = category.id;
    const name = category.name;
    const price =  this.controls['price'].value as number;
    const dto: EditCategoryDto = new class implements EditCategoryDto {
      name = name;
      controlPeriodHours = controlPeriodHours;
      expirationDateHours = expirationDateHours;
      id = id;
      price = price;
    }
    this.categoryService.updateCategory(dto).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(result => {
      console.log(result);
    });
  }

  get controls() {
    return this.formControl.controls;
  }

  onCategoryChange(event: any) {
    this.selectedCategory = this.categories.find(c => c.id == event.value) as Category;
    this.controls['controlPeriodHours'].setValue(this.selectedCategory.controlPeriodHours);
    this.controls['expirationDateHours'].setValue(this.selectedCategory.expirationDateHours);
    this.controls['price'].setValue(this.selectedCategory.price);
  }

  public getCategories() {
    this.categoryService.getAllCategories().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(categories => {
      this.categories = categories;
      console.log('got: ' + this.categories);
    })
  }
}

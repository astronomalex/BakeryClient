import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from "../_models/category";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {CategoryService} from "../_services/category.service";
import {Bun} from "../_models/bun";
import {BunService} from "../_services/bun.service";
import {MatDialog} from "@angular/material/dialog";
import {AddBunsComponent} from "./add-buns/add-buns.component";
import {EditCategoryComponent} from "./edit-category/edit-category.component";
import {EditCategoryDto} from "../_models/edit-category-dto";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  categories: EditCategoryDto[] = [];
  buns: Bun[] = [];
  ngUnsubscribe$ = new Subject();


  constructor(
    private categoryService: CategoryService,
    private bunService: BunService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.updateInfo();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(false);
    this.ngUnsubscribe$.complete();
  }

  public getCategories() {
    this.categoryService.getAllCategories().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(categories => {
      this.categories = categories;
      console.log('got: ' + this.categories);
    })
  }

  public getBuns() {
    this.bunService.getAllBuns().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(buns => {
      this.buns = buns;
      console.log('got: ' + this.buns);
    })
  }

  updateInfo() {
    this.getBuns();
    this.getCategories();
  }

  addList() {
    let dialogRef = this.dialog.open(AddBunsComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.updateInfo();
    });
  }

  editCategory() {
    let dialogRef = this.dialog.open(EditCategoryComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.updateInfo();
    });
  }

  removeItem(item: Bun) {
    this.bunService.Remove(item.id).subscribe(result => {
      this.updateInfo();
    });
  }
}

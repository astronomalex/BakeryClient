import {Component, OnDestroy, OnInit} from '@angular/core';
import {EditCategoryDto} from "../_models/edit-category-dto";
import {Subject, takeUntil} from "rxjs";
import {CategoryService} from "../_services/category.service";
import {BunService} from "../_services/bun.service";
import {BunMain} from "../_models/bun-main";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit, OnDestroy {
  categories: EditCategoryDto[] = [];
  buns: BunMain[] = [];
  ngUnsubscribe$ = new Subject();
  now = Date.now();


  constructor(
    private categoryService: CategoryService,
    private bunService: BunService,
  ) {
  }

  ngOnInit(): void {
    this.updateInfo();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(false);
    this.ngUnsubscribe$.complete();
  }

  public getCategories() {
    this.categoryService.getAllCategories().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(categories => {
      this.categories = categories;
    })
  }

  public getBuns() {
    this.bunService.getAllBuns().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(buns => {
      this.buns = [];
      for (const bun of buns) {
        const now = Date.now();
        const date = new Date(bun.timeNextChangePrice);
        const minutes = (date.getTime() - now) / 1000 / 60;
        const bunMain: BunMain = new class implements BunMain {
          actualPrice = bun.actualPrice;
          id = bun.id;
          name = bun.name;
          nextPrice = bun.nextPrice;
          price = bun.price;
          timeManufacture = bun.timeManufacture;
          timeNextChangePriceOf = minutes;
        }
        this.buns.push(bunMain);
      }
    })
  }

  updateInfo() {
    this.getBuns();
    this.getCategories();
  }
}

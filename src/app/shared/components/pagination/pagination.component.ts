import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, pluck } from "rxjs/operators";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() total_results: number = 0;
  @Input() limit: number = 15;
  @Input() page: number = 1;
  @Output() goPage = new EventEmitter();
  @Output() pageChange = new EventEmitter();
  @Output() limitChange = new EventEmitter();

  total_pages: number = 0;
  form: any;
  timeout: any;
  options = [15, 30, 50, 100, 200, 250];
  width_mobile: boolean = false;

  @ViewChild("input_number", { static: true }) input_number!: ElementRef<any>;
  @ViewChild("content") content: ElementRef;

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    if (this.content.nativeElement.offsetWidth <= 600) {
      this.width_mobile = true;
    } else {
      this.width_mobile = false;
    }
  }

  constructor(public form_builder: FormBuilder) {
    this.form = form_builder.group({
      page: [1],
      limit: [15],
    });
  }

  ngOnInit(): void {
    if (!this.options.includes(this.limit)) {
      this.limit = 100;
    }
    this.form.controls.limit.setValue(this.limit);
    this.getPageInput();
    this.totalPages();
  }

  ngOnChanges(changes: any): void {
    if (changes.page) {
      this.form.controls.page.setValue(changes.page.currentValue);
    }
    if (changes.total_results) {
      this.totalPages();
    }
  }

  ngAfterContentInit() {
    setTimeout(() => {
      if (this.content.nativeElement.offsetWidth <= 600) {
        this.width_mobile = true;
      }
    }, 200);
  }

  changeLimit() {
    this.limit = this.form.controls.limit.value;
    this.page = 1;
    this.form.controls.limit.setValue(this.limit);
    this.form.controls.page.setValue(this.page);
    this.pageChange.emit(this.page);
    this.limitChange.emit(this.limit);
    this.totalPages();
    this.goPage.emit({ page: this.page, limit: this.limit });
  }

  totalPages() {
    if (this.total_results > 0) {
      let total = this.total_results / this.limit;
      this.total_pages = Math.ceil(total);
    } else {
      this.form.controls.page.setValue(this.page);
      this.total_pages = 1;
    }
  }

  goNext() {
    if (this.page == this.total_pages) {
      return;
    }
    this.setPage(Math.min(this.total_pages, this.page + 1));
  }

  goPrevious() {
    if (this.page == 1) {
      return;
    }
    this.setPage(Math.max(1, this.page - 1));
  }

  setPage(numberPage: number) {
    if (numberPage >= 1 && numberPage <= this.total_pages) {
      this.page = numberPage;
      this.form.controls.page.setValue(this.page);
    } else {
      if (numberPage > this.total_pages) {
        this.page = this.total_pages;
        this.form.controls.page.setValue(this.page);
      }
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.pageChange.emit(this.page);
      this.goPage.emit({ page: this.page, limit: this.limit });
    }, 300);
  }

  resetPage() {
    this.page = 1;
  }

  getPageInput() {
    fromEvent<number>(this.input_number.nativeElement, "keyup")
      .pipe(pluck("target", "value"), debounceTime(1000), distinctUntilChanged())
      .subscribe((res: any) => {
        if (res === "" || res < 1) {
          this.setPage(1);
        } else {
          this.setPage(Number(res));
        }
      });
  }
}

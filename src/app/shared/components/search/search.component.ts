import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  search = new FormControl();
  @Input() default_value?: string;
  @Input() placeholder: string = "Search";
  @Output() searchChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.search.valueChanges.pipe(debounceTime(600)).subscribe((value) => {
      this.searchChange.emit(value);
    });
  }
  ngOnChanges(): void {
    this.search.setValue(this.default_value);
  }
}

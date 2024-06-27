import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-search-autocomplete-product",
  templateUrl: "./search-autocomplete-product.component.html",
  styleUrls: ["./search-autocomplete-product.component.scss"],
})
export class SearchAutocompleteProductComponent implements OnInit {
  search = new FormControl();
  @Output() searchChange = new EventEmitter();
  @Output() onSelectionChange = new EventEmitter();
  @Input() placeholder: string = "Buscar producto";
  @Input() data: Array<any> = [];
  @Input() set value(v){
    this.search.setValue(v,{emitEvent:false})
  }
  constructor() {}

  ngOnInit(): void {
    this.search.valueChanges.pipe(debounceTime(600)).subscribe((value) => {
      this.searchChange.emit(value);
    });
  }

  selectionChange(item) {
    this.search.setValue(item,{emitEvent:false})
    this.onSelectionChange.emit(item);
  }

}

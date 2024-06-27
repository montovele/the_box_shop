import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { OrderService } from "src/app/shared/_api/order.service";
import { QuoteDetailDialogComponent } from "./components/quote-detail-dialog/quote-detail-dialog.component";

@Component({
  selector: "app-quotes",
  templateUrl: "./quotes.component.html",
  styleUrls: ["./quotes.component.css"],
})
export class QuotesComponent implements OnInit {
  quotes: Array<any> = [];
  total_results: number = 0;

  constructor(public order_service: OrderService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getQuotes();
  }

  getQuotes() {
    this.order_service.getAllQuotes().subscribe((res) => {
      this.quotes = res.data;
      this.total_results = res.total;
    });
  }

  openQuoteDetail(id_quote: number) {
    this.dialog.open(QuoteDetailDialogComponent, {
      width: "900px",
      height: "800px",
      data: {
        id_quote,
      },
    });
  }

  changeSearch(value) {
    this.order_service.filter_quote.criteria = value;
    this.order_service.filter_quote.page = 1;
    this.getQuotes();
  }

  get filter_quote() {
    return this.order_service.filter_quote;
  }
}

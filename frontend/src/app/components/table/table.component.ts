import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerTransactions } from '../../models/customertrans.model';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent implements OnInit {
  @Input() tableData: CustomerTransactions[] = [];
  filteredData: CustomerTransactions[] = [];
  nameFilterValue: string = '';
  amountFilterValue: string = '';

  @Output() filteredDataChange = new EventEmitter<CustomerTransactions[]>();
  @Output() customerSelected = new EventEmitter<number>();

  ngOnInit(): void {
    this.filteredData = this.tableData;
  }

  filter() {
    this.filteredData = this.tableData.filter(item =>
      (item.name.toLowerCase().startsWith(this.nameFilterValue.toLowerCase())) &&
      (item.total_amount.toString().startsWith(this.amountFilterValue.toLowerCase()))
    );
    this.filteredDataChange.emit(this.filteredData);
  }

  selectCustomer(customerId: number) {
    console.log(customerId);
    
    this.customerSelected.emit(customerId);
  }
}

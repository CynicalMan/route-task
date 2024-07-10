import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Transaction } from '../../models/transaction.model';
import { Customer } from '../../models/customer.model';
import { DataService } from '../../services/data.service';
import { CustomerTransactions } from '../../models/customertrans.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableComponent,NgxChartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {

  customers: Customer[] = [];
  transactions: Transaction[] = [];
  tableData: CustomerTransactions[] = [];
  selectedCustomerTransactions: any[] = [];

  constructor(private dataService: DataService) {
    
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.customers = data.customers;
      this.transactions = data.transactions;
      this.customers.forEach(customer => {
        const totalAmount = this.transactions
          .filter(transaction => transaction.customer_id === customer.id)
          .reduce((sum, transaction) => sum + transaction.amount, 0);
  
        this.tableData.push({
          id: customer.id,
          name: customer.name,
          total_amount: totalAmount
        });
      });
    });
  }

  
  view: [number, number] = [700, 400];
  colorScheme : Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  gradient = true;
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Amount';
  showXAxisLabel = true;
  showYAxisLabel = true;

  tableColumns = ['Id', 'Name', 'Total Amount'];
  filteredTableData: any[] = [];

  onCustomerSelected(customerId: number) {
    this.selectedCustomerTransactions = this.transactions
    .filter(t => t.customer_id === customerId)
    .map( t => ({
      name: t.date,
      value: t.amount
    }));
  }
  

  updateFilteredData(filteredData: any[]) {
    this.filteredTableData = filteredData;
  }
}

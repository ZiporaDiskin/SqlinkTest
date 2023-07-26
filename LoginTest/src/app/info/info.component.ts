import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoService } from 'src/services/info.service';
import { observable, Observable, Subject, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/models/project';
import { MatTableDataSource } from '@angular/material';




@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit {
  dataSource!:any
 data!:Project[]
  constructor(private infoService:InfoService){}
    ngOnInit(): void {
  this.infoService.getInfo().pipe()
  .subscribe(x=>{
    this.data=x
  }
  )
  
    }
   
  
    
  }
  
// export class InfoComponent implements OnInit {
// // Each Column Definition results in one Column.


// // Data that gets displayed in the grid
// public rowData$!: Observable<any[]>;

// // For accessing the Grid's API
// @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
//   constructor(private infoservice:InfoService,private http:HttpClient) { }

//   ngOnInit(): void {


//   }
//   onGridReady(params: GridReadyEvent) {
//     this.rowData$ = this.http
//     .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
//     console.log(this.rowData$);
    
//   }

//   // Example of consuming Grid Event
//   onCellClicked( e: CellClickedEvent): void {
//     console.log('cellClicked', e);
//   }

//   // Example using Grid's API
//   clearSelection(): void {
//     this.agGrid.api.deselectAll();
//   }
// }

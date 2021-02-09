import { Component } from '@angular/core';
import { productList } from './data';
import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buscador';
  busqueda = "";
  ///paginas:number=0;

  itemsw = [
    { description: 'Pakistan', name: 'Karachi', code: 'Pk-8732' },
    { description: 'China', name: 'Beijing', code: 'Ch-9304' },
    { description: 'Russia', name: 'Moscow', code: 'Rs-134' },
    { description: 'USA', name: 'Washington', code: 'USA-2134' },
    { description: 'Australia', name: 'Canberra', code: 'As-2753' },
    { description: 'Turkey', name: 'Ankara', code: 'Tk-823' },
    { description: 'Italy', name: 'Roma', code: 'Tk-8234' }
  ];
  inicio = 0;
  fin = 3;

  filteredItems: Product[];
  pages: number = 4;
  pageSize: number = 5;
  pageNumber: number = 0;
  currentIndex: number = 1;
  items: Product[];
  pagesIndex: Array<number>;
  pageStart: number = 1;
  inputName: string = '';

  constructor() {
    this.filteredItems = productList;
    this.init();
  };
  init() {
    this.currentIndex = 1;
    this.pageStart = 1;
    this.pages = 4;

    this.pageNumber = parseInt("" + (this.filteredItems.length / this.pageSize));
    if (this.filteredItems.length % this.pageSize != 0) {
      this.pageNumber++;
    }

    if (this.pageNumber < this.pages) {
      this.pages = this.pageNumber;
    }

    this.refreshItems();
    console.log("this.pageNumber :  " + this.pageNumber);
  }

  FilterByName() {
    this.filteredItems = [];
    if (this.inputName != "") {
      productList.forEach(element => {
        if (element.name.toUpperCase().indexOf(this.inputName.toUpperCase()) >= 0) {
          this.filteredItems.push(element);
        }
      });
    } else {
      this.filteredItems = productList;
    }
    console.log(this.filteredItems);
    this.init();
  }
  fillArray(): any {
    var obj = new Array();
    for (var index = this.pageStart; index < this.pageStart + this.pages; index++) {
      obj.push(index);
    }
    return obj;
  }
  refreshItems() {
    this.items = this.filteredItems.slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);
    this.pagesIndex = this.fillArray();
  }
  prevPage() {
    if (this.currentIndex > 1) {
      this.currentIndex--;
    }
    if (this.currentIndex < this.pageStart) {
      this.pageStart = this.currentIndex;
    }
    this.refreshItems();
  }
  nextPage() {
    if (this.currentIndex < this.pageNumber) {
      this.currentIndex++;
    }
    if (this.currentIndex >= (this.pageStart + this.pages)) {
      this.pageStart = this.currentIndex - this.pages + 1;
    }

    this.refreshItems();
  }
  setPage(index: number) {
    this.currentIndex = index;
    this.refreshItems();
  }




  // if(this.items.length % this.NItem != 0) {
  //    this.pagActiva++;
  //  }


  pagina = Number(this.itemsw.length) / 3;

  mas() {

    // this.inicio = this.inicio + this.fin;
    // this.fin = this.fin + this.fin;
  }
}

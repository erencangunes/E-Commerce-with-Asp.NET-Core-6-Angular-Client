import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/product';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit{

  constructor(spinner : NgxSpinnerService, private productService: ProductService) {

    super(spinner);

   }

  ngOnInit() : void{

  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    const create_Product: Create_Product = new Create_Product();
    create_Product.name = name.value;
    create_Product.stock = parseInt(stock.value);
    create_Product.price = parseFloat(price.value);

    this.productService.create(create_Product);
  }

}

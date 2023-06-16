import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit{

  constructor(
    spinner : NgxSpinnerService, 
    private alertify : AlertifyService,
    private productService: ProductService) 
    {

      super(spinner);
      
    }

  ngOnInit() : void{

  }

  // Eklenen ürünü listede göstermek için
  @Output() createdProduct : EventEmitter<Create_Product> = new EventEmitter();

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {

    this.showSpinner(SpinnerType.ballRunningDots)
    const create_Product: Create_Product = new Create_Product();
    create_Product.name = name.value;
    create_Product.stock = parseInt(stock.value);
    create_Product.price = parseFloat(price.value);

    this.productService.create(create_Product, () => {
      this.hideSpinner(SpinnerType.ballRunningDots);
      this.alertify.message("Ürün başarıyla eklenmiştir.", {
        dismissOthers : true,
        MessageType : MessageType.Success,
        position : Position.TopRight
      });
      this.createdProduct.emit(create_Product);
    },errorMessage => {
      this.alertify.message(errorMessage, 
        {
            dismissOthers : true,
            MessageType: MessageType.Error,
            position: Position.TopRight
        });
    });
  }

}

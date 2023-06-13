import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit{

  constructor(
    spinner : NgxSpinnerService ,
    private httpClientService: HttpClientService
    ) 
    { 
      super(spinner);
     }

  ngOnInit(): void {

    this.showSpinner(SpinnerType.cubeTransition)

    this.httpClientService.get({
    controller: "products"
    }).subscribe(data => console.log(data))

    // this.httpClientService.post({
    //   controller: "products"
    // },
    // {
    //   name: "Kalem",
    //   stock: "100",
    //   price: 15
    // }).subscribe();


    // this.httpClientService.put({
    //   controller: "products"
    // },
    // {
    //   id: "73b778b8-2ff0-488d-8da2-922cf555deee",
    //   name: "sanane",
    //   stock: 3333,
    //   price: 44
    // }).subscribe();

    // this.httpClientService.del({
    //   controller: "products"
    // },"73b778b8-2ff0-488d-8da2-922cf555deee").subscribe();

  }

}
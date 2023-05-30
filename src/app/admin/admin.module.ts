import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutModule, //Layout modul adminin altında oldugu için admine layout modülü import edicez
    ComponentsModule
  ],
  exports : [
    LayoutModule
  ]
})
export class AdminModule { }

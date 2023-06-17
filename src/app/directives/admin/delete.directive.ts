import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {
    // img elementi ekledim
    const img = this._renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;

    this._renderer.appendChild(element.nativeElement, img)

  }

  // Silinen Ürünün IId'sini alabimemiz İçin
  @Input() id: string;
  // Ürün silindikten sonra listeyi güncellememiz için
  @Output() callback: EventEmitter<any> = new EventEmitter();

  // Silme tuşuna basıldıgında tetiklemek için
  @HostListener("click")
  async onClick() {

    this.openDialog(async () => {

      this.spinner.show(SpinnerType.ballRunningDots);

      // td elementine ulaştım
      const td: HTMLTableCellElement = this.element.nativeElement;

      await this.productService.delete(this.id);

      // Jquery ile ürünü listeden td elementinin üstündeki tr elementini silerken listeyide output ile gelen veriyle güncellemiş olucaz.
      $(td.parentElement).animate({
        opacity: 0,
        left: "+=50",
        height: "toogle"
      }, 700, () => {
        this.callback.emit();
      });

    });

  }

  openDialog(afterClosed: any): void {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });

  }



}

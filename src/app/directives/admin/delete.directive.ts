import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private httpClientService: HttpClientService,
    private element: ElementRef,
    private _renderer: Renderer2,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService : AlertifyService
  ) {
    // img elementi ekledim
    const img = this._renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;

    this._renderer.appendChild(element.nativeElement, img)

  }

  // Silinen Ürünün Id'sini alabimemiz İçin
  @Input() id: string;
  // Silinen ürünün bulunduğu controllerı alıyoruz
  @Input() controller: string;
  // Ürün silindikten sonra listeyi güncellememiz için
  @Output() callback: EventEmitter<any> = new EventEmitter();

  // Silme tuşuna basıldıgında tetiklemek için
  @HostListener("click")
  async onClick() {

    this.openDialog(async () => {

      this.spinner.show(SpinnerType.ballRunningDots);

      // td elementine ulaştım
      const td: HTMLTableCellElement = this.element.nativeElement;

      await this.httpClientService.delete({

        controller: this.controller,
      }, this.id).subscribe(data => {
        // Jquery ile ürünü listeden td elementinin üstündeki tr elementini silerken listeyide output ile gelen veriyle güncellemiş olucaz.
        $(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toogle"
        }, 700, () => {
          this.callback.emit();
          this.alertifyService.message("Ürün başarıyla silinmiştir.", {
            dismissOthers:true,
            MessageType: MessageType.Success,
            position: Position.TopRight
          })
        });
      }, (errorResponse : HttpErrorResponse) => {
        this.spinner.hide(SpinnerType.ballRunningDots);
        this.alertifyService.message("Ürün silinirken beklenmeyen bir hata gerçekleşmiştir.", {
          dismissOthers:true,
          MessageType: MessageType.Error,
          position: Position.TopRight
        });
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

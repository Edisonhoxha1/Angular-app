import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {ComfirmationPopupComponent} from "./comfirmation-popup.component";

@NgModule({
  declarations: [ComfirmationPopupComponent],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [ComfirmationPopupComponent]
})
export class ComfirmationPopupModule {
}

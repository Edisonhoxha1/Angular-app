import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-comfirmation-popup',
  templateUrl: './comfirmation-popup.component.html',
  styleUrls: ['./comfirmation-popup.component.css']
})
export class ComfirmationPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { question: string },
              private dialogRef: MatDialogRef<ComfirmationPopupComponent>) { }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close(false);
  }

}

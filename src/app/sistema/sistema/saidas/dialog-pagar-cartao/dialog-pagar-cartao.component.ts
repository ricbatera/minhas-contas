import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-pagar-cartao',
  templateUrl: './dialog-pagar-cartao.component.html',
  styleUrls: ['./dialog-pagar-cartao.component.css']
})
export class DialogPagarCartaoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogPagarCartaoComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

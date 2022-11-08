import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { contaBancaria } from 'src/app/model/model';

@Component({
  selector: 'app-dialog-deletar',
  templateUrl: './dialog-deletar.component.html',
  styleUrls: ['./dialog-deletar.component.css']
})
export class DialogDeletarComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogDeletarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: contaBancaria,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(alert('Conta Deletada'));
  }

}

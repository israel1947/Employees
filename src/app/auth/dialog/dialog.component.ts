import { Component, Inject, OnInit, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor( private dialogReft:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  }

  confirmar(){
      this.dialogReft.close();
  }

}

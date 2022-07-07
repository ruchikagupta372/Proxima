import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
export interface DialogData {
  title: string;
  description: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string;
  description: string;
  constructor(private dialog: MatDialog) {}
  private dialogRef: MatDialogRef<InputDialogComponent>;
  private deleteDialogRef: MatDialogRef<DeleteDialogComponent>;
  public searchText = '';
  rows = [{ title: 'Austin', description: 'Male' }];
  editing = {};

  columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(InputDialogComponent, {
      width: '360px',
      height: '250px',
      data: { title: this.title, description: this.description },
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      /*istanbul ignore else*/
      if (result) {
        this.rows.push({
          title: result.title,
          description: result.description,
        });
        this.rows = [...this.rows];
      }
    });
  }

  delete(index) {
    this.deleteDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '360px',
      height: '175px',
      data: { index: index },
    });
    this.deleteDialogRef.afterClosed().subscribe((result) => {
      /*istanbul ignore else*/
      if (result) {
        this.rows.splice(result.index, 1);
        this.rows = [...this.rows];
      }
    });
  }

  search(search) {
    const data = this.rows;
    if (search.length > 3) {
      setTimeout(() => {
        const source = [...this.rows];
        this.rows = source.filter((item) => {
          return Object.keys(item).some((key) =>
            String(item[key]).toLowerCase().includes(search.toLowerCase())
          );
        });
      }, 1000);
    } else {
      this.rows = [...data];
    }
  }
}

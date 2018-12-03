import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyContentComponent } from './my-content/my-content.component';
import { MaterialDialogBuilder, SimpleDialogBuilder } from '@shadow-ui/dialog';

@Component({
  selector: 'app-playground-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public size = '500px';
  public component = MyContentComponent;
  public title = 'Mein Title';
  public data = {name: 'test'};

  constructor(private dlgService: MatDialog) {
  }

  public openSimple() {
    const builder = new SimpleDialogBuilder(this.dlgService)
      .setDimensions(this.size)
      .setDisplayComponent(this.component)
      .setTitle(this.title)
      .setDialogData(this.data)
    ;
    builder.open();
  }

  public openMat() {
    const builder = new MaterialDialogBuilder(this.dlgService)
      .setDimensions(this.size)
      .setDisplayComponent(this.component)
      .setTitle(this.title)
      .setDialogData(this.data)
    ;
    builder.open();
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyContentComponent } from './my-content/my-content.component';
import { SdwAdvancedDialogBuilder, SdwSimpleDialogBuilder } from '@shadow-ui/core';

@Component({
  selector: 'app-playground-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public size = '500px';
  public component = MyContentComponent;
  public title = 'My Title';
  public data = {myData: 'test'};

  constructor(private dlgService: MatDialog) {
  }

  public openSimple() {
    const builder = new SdwSimpleDialogBuilder(this.dlgService)
      .setDimensions(this.size)
      .setDisplayComponent(this.component)
      .setTitle(this.title)
      .setDialogData(this.data)
    ;
    builder.open();
  }

  public openMat() {
    const builder = new SdwAdvancedDialogBuilder(this.dlgService)
      .setDimensions(this.size)
      .setDisplayComponent(this.component)
      .setTitle(this.title)
      .setDialogData(this.data)
    ;
    builder.open();
  }
}

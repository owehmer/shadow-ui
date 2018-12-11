import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyContentComponent } from './my-content/my-content.component';
import { SdwAdvancedDialogBuilder, SdwSimpleDialogBuilder, SdwStepDialogBuilder } from '@shadow-ui/core';

@Component({
  selector: 'app-playground-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _size = '500px';
  private _component = MyContentComponent;
  private _title = 'My Title';
  private _data = {myData: 'test'};

  @ViewChild('myDialogTemplate', {read: TemplateRef})
  private _template: TemplateRef<any>;

  constructor(private dlgService: MatDialog) {
  }

  public openSimple(type?: 'comp' | 'ref' | 'text') {
    const builder = new SdwSimpleDialogBuilder(this.dlgService)
      .setDimensions(this._size)
      .setTitle(this._title)
      .setDialogData(this._data)
    ;
    builder.setBackdropClickCanClose(false);

    if (type === 'comp')
      builder.setDisplayComponent(this._component);
    if (type === 'ref')
      builder.setDisplayComponent(this._template);
    else if (type === 'text')
      builder.setText('This custom text is really nice. HTML is <b>supported</b>');

    const dialog = builder.open();
    dialog.afterClosed().subscribe(({mode, result}) => console.info('Dialog closed', mode, 'Data: ', result))
  }

  public openAdv() {
    const builder = new SdwAdvancedDialogBuilder(this.dlgService)
      .setDimensions(this._size)
      .setDisplayComponent(this._component)
      .setTitle(this._title)
      .setDialogData(this._data)
    ;
    builder.open();
  }

  public openStep() {
    const builder = new SdwStepDialogBuilder(this.dlgService)
      .setDimensions(this._size)
      .setDisplayComponent(this._component)
      .setTitle(this._title)
      .setDialogData(this._data)
    ;
    builder.open();
  }
}

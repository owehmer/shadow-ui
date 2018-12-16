import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyContentComponent } from './my-content/my-content.component';
import { SdwAdvancedDialogBuilder } from '@shadow-ui/core';

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
    this.openDlg('simple', type);
  }

  public openAdv(type?: 'comp' | 'ref' | 'text') {
    this.openDlg('adv', type);
  }

  private openDlg(dlgType: 'adv' | 'simple', type?: 'comp' | 'ref' | 'text') {
    const builder = new SdwAdvancedDialogBuilder(this.dlgService)
      .setDimensions(this._size)
      .setTitle(this._title)
      .setDialogData(this._data)
    ;
    if (dlgType === 'simple')
      builder.simpleDialogStyle();

    if (type === 'comp')
      builder.setDisplay(this._component);
    if (type === 'ref')
      builder.setDisplay(this._template);
    else if (type === 'text')
      builder.setText('This custom text is really nice.');

    const dialog = builder.open();
    dialog.afterClosed().subscribe(({mode, result}) => console.info('Dialog closed', mode, 'Data: ', result))
  }

  // public openStep() {
  //   const builder = new SdwStepDialogBuilder(this.dlgService)
  //     .setDimensions(this._size)
  //     .setDisplay(this._component)
  //     .setTitle(this._title)
  //     .setDialogData(this._data)
  //   ;
  //   builder.open();
  // }
}

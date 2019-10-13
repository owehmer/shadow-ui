import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SdwAdvancedDialogBuilder } from '@shadow-ui/core';
import { FormOneComponent } from '../form-dlgs/form-one/form-one.component';
import { MyContentComponentShort } from '../my-content-short/my-content-short.component';
import { DynamicComponent } from '../dynamic/dynamic.component';
import { MatDialog } from '@angular/material/dialog';
import { MyContentComponent } from '../my-content/my-content.component';

@Component({
  selector: 'shadow-ui-dialog-demo',
  templateUrl: './dialog-demo.component.html',
  styleUrls: ['./dialog-demo.component.css']
})
export class DialogDemoComponent {
  private _size = '500px';
  private _component = MyContentComponent;
  private _title = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do';
  private _data = {myData: 'test'};

  @ViewChild('myDialogTemplate', {read: TemplateRef, static: true})
  private _template: TemplateRef<any>;

  constructor(private dlgService: MatDialog) {
  }

  public openSimple(type?: 'comp' | 'ref' | 'text') {
    const dialog =  this.buildDLg('simple', type).open();
    dialog.afterClosed().subscribe(({mode, result}) => console.info('Dialog closed', mode, 'Data: ', result))
  }

  public openAdv(type?: 'comp' | 'ref' | 'text' | 'test') {
    const dialog = this.buildDLg('adv', type).open();
    dialog.afterClosed().subscribe(({mode, result}) => console.info('Dialog closed', mode, 'Data: ', result))
  }

  private buildDLg(dlgType: 'adv' | 'simple', type?: 'comp' | 'ref' | 'text' | 'step' | 'test') {
    const builder = new SdwAdvancedDialogBuilder(this.dlgService)
      .setDimensions(this._size)
      .setTitle(this._title)
      .setDialogData(this._data)
    ;
    if (dlgType === 'simple')
      builder.simpleDialogStyle();

    if (type === 'comp')
      builder.setDisplay(this._component);
    else if (type === 'ref')
      builder.setDisplay(this._template);
    else if (type === 'text')
      builder.setText('This custom text is really nice.');
    else if (type === 'test') {
      builder.setDisplay(this._component);
      builder.setDimensions(null, '500px');
      builder.setMaxDimensions(null, '80vh');
      // builder.setMinDimensions(null, '500px');
    }

    return builder;
  }
}

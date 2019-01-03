import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyContentComponent } from './my-content/my-content.component';
import { SdwAdvancedDialogBuilder, SdwStepDialogBuilder } from '@shadow-ui/core';
import { MyContentComponentShort } from './my-content-short/my-content-short.component';
import { DynamicComponent } from './dynamic/dynamic.component';

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
    const dialog =  this.buildDLg('simple', type).open();
    dialog.afterClosed().subscribe(({mode, result}) => console.info('Dialog closed', mode, 'Data: ', result))
  }

  public openAdv(type?: 'comp' | 'ref' | 'text') {
    const dialog = this.buildDLg('adv', type).open();
    dialog.afterClosed().subscribe(({mode, result}) => console.info('Dialog closed', mode, 'Data: ', result))
  }

  public openStep() {
    const builder = new SdwStepDialogBuilder(this.dlgService)
      .setDimensions('80vw')
      .setMaxDimensions('800px')
      .setTitle(this._title)
      .setDialogData(this._data)
      .setSteps([
        {
          title: 'First Step',
          subtitle: 'My subtitle',
          component: this._component
        },
        {
          title: 'Hold it right there',
          component: MyContentComponentShort
        }
      ])
      .animateStepChanges(true)
    ;
    const dlg = builder.open();
    setTimeout(() => {
      dlg.componentInstance.insertStep(1, {
        title: 'dynamic added',
        subtitle: '2nd subtitle',
        component: DynamicComponent
      })
    }, 1500);

  }

  private buildDLg(dlgType: 'adv' | 'simple', type?: 'comp' | 'ref' | 'text' | 'step') {
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

    return builder;
  }
}

# ShadowUi

This page is currently beeing created.

## Getting started
### Step 1
Install the latest package from npm with: ``npm i --save @shadowui/core``

### Step 2
Import the whole dialog module or either of the dialogs
```
import {SdwDialogModule} from '@shadowui/core;'
```
or
```
import {SdwSimpleDialogModule, SdwAdvancedDialogModule} from '@shadowui/core;'
```

### Step 3
Use one the the dedicated builders to set ur your dialog
```
const builder = new SdwSimpleDialogBuilder(this.dlgService)
  .setDimensions('500px')
  .setDisplayComponent(MyContentComponent)
  .setTitle('My dialog')
  .setDialogData({provide: 'some data'})
;
```

### Finally
Open the dialog you just prepared with
```
builder.open();
```

# ShadowUi

This page is currently beeing created.

## Getting started
### Step 1
Choose any or all of the npm packages: 
Install the latest package from npm with: ``npm i --save @shadowui/dialog @shadowui/forms @shadowui/utils``

### Step 2.1: Dialog imports
Import the whole dialog module or either of the dialogs
```js
import {SdwDialogModule} from '@shadowui/dialog;'
```
or
```js
import {SdwSimpleDialogModule, SdwAdvancedDialogModule} from '@shadowui/dialog;'
```

### Step 2.2 Create a dialog
Use one the the dedicated builders to set ur your dialog
```js
const builder = new SdwSimpleDialogBuilder(this.dlgService)
  .setDimensions('500px')
  .setDisplayComponent(MyContentComponent)
  .setTitle('My dialog')
  .setDialogData({provide: 'some data'})
;
```

### Step 2.3 Open the dialog
Open the dialog you just prepared with
```js
builder.open();
```

### Step 3.1: Import the Forms module
```js
import {
    SdwFormsModule,
    SdwFormCheckboxModule,
    SdwFormDateTimePickerModule,
    SdwFormDatepickerModule,
    SdwFormInputElementModule,
    SdwFormRadioModule,
    SdwFormSelectModule
} from '@shadowui/forms;'
```

### Step 3.2: Create the template
For any further customization checkout the playground. Documentation on every component is coming soon.
```html
<sdw-form>
  <sdw-form-input-element [name]="name">
  </sdw-form-input-element>

  <sdw-form-checkbox [name]="checkName">
    Some Checkbox Label
  </sdw-form-checkbox>

  <sdw-form-select [name]="selectName" [options]="selectOptions">
  </sdw-form-select>

  <sdw-form-radio [name]="radioName" [options]="radioOptions">
  </sdw-form-radio>

  <sdw-form-datepicker [name]="datepickerSimple">
  </sdw-form-datepicker>

  <sdw-form-date-time-picker [name]="dateOnly" [showTime]="false" [placeholder]="'Date only'">
  </sdw-form-date-time-picker>

  <sdw-form-date-time-picker [name]="'timeOnly'" [showDate]="false" [placeholder]="'Time only'">
  </sdw-form-date-time-picker>

  <sdw-form-date-time-picker [name]="'dateOnly'" [placeholder]="'Date und Time'" [highlightBgColor]="'rgba(0,0,0,0.05)'">
  </sdw-form-date-time-picker>
</sdw-form>
```

### Step 4.1 Use the utils for some help
```js
import { SdwDynGridModule } from '@shadowui/utils';
```

and in the template just use

```html
<sdw-form sdwDynGridContainer [cols]="['300px', '1fr']">
  <sdw-form-input-element [name]="'input1'" [placeholder]="'Placeholder 1'"
                          sdwDynGridChild
  ></sdw-form-input-element>

  <sdw-form-input-element [name]="'input2'" [placeholder]="'Placeholder 3'"
                          sdwDynGridChild
  ></sdw-form-input-element>

  <sdw-form-input-element [name]="'input3'" [placeholder]="'Placeholder 3'"
                          sdwDynGridChild
  ></sdw-form-input-element>
</sdw-form>

```

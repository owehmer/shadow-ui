# ShadowUi

This page is currently beeing created.

#### Check out the [playground](https://shadow-ui.owehmer.now.sh/)!

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
<sdw-form [sdwFormGroup]="formGroup">
  <sdw-form-input-element name="inputText"
                          type="text"
                          label="Some Text Label"
                          placeholder="Some Input Placeholder"
                          [validatorOrOpts]="requiredValidator"
  >
  </sdw-form-input-element>

  <sdw-form-input-element name="inputNumber"
                          type="number"
                          label="Some Number Label"
                          placeholder="Some Input Number Placeholder"
  >
  </sdw-form-input-element>

  <sdw-form-checkbox name="inputCheckbox"
                     labelPosition="after"
  >
    Checkbox Text
  </sdw-form-checkbox>

  <sdw-form-select name="inputSelect"
                   label="Choose an option"
                   [options]="selectOptions"
  >
    <ng-template sdwFormSelectTemplate let-option>
      <span>{{option.label}}</span>
    </ng-template>
  </sdw-form-select>

  <sdw-form-radio name="inputRadio"
                  [options]="radioOptions"
  >
    <ng-template sdwFormRadioTemplate let-option>
      <{{option.label}}>
    </ng-template>
  </sdw-form-radio>

  <sdw-form-datepicker name="inputMatDatepicker"
                       placeholder="Some Datepicker Placeholder"
                       label="Some Datepicker Label"
  >
  </sdw-form-datepicker>

  <sdw-form-date-time-picker name="inputDateOnly"
                             [showTime]="false"
                             placeholder="Some Date Placeholder"
                             label="Some Date Label"
  >
  </sdw-form-date-time-picker>

  <sdw-form-date-time-picker name="inputTimeOnly"
                             [showDate]="false"
                             label="Some Time Label"
                             placeholder="Some Time Placeholder">
  </sdw-form-date-time-picker>

  <sdw-form-date-time-picker name="inputDateTime"
                             label="Some Date + Time Label"
                             placeholder="Some Date + Time Placeholder"
                             highlightBgColor="rgba(0,0,0,0.05)">
  </sdw-form-date-time-picker>

  <sdw-form-textarea-element name="inputTextarea"
                             placeholder="Some Textarea Placeholder"
                             [autosize]="true"
                             [minRows]="5"
                             label="Some Textarea Label">

  </sdw-form-textarea-element>
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

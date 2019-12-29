/*
 * Public API Surface of dialog
 */
export {SdwDialogModule} from './lib/dialog.module';
export {SdwDialogBuilder} from './lib/dialog-builder';
export {SdwDialogBase} from './lib/dialog-base';

// Building block
export * from './lib/blocks/content/content.component';
export * from './lib/blocks/title-bar/title-bar.component';
export * from './lib/blocks/footer/footer.component';

// Dialogs
export * from './lib/advanced/advanced-dialog.component';
// export * from './lib/step/step-dialog.component';
// export * from './lib/step/step-dialog-content-api';


export * from './lib/dialog-internal-api';
export * from './lib/dialog-content-api';

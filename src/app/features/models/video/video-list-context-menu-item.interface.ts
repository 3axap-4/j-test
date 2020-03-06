import { GetContextMenuItemsParams } from 'ag-grid-community';

export interface IVideoListContextMenuItem {
  // name of menu item
  name: string;
  // if item should be enabled / disabled
  disabled?: boolean;
  // shortcut (just display text, saying the shortcut here does nothing)
  shortcut?: string;
  // set to true to provide a check beside the option
  checked?: boolean;
  // the icon to display beside the icon, either a DOM element or HTML string
  icon?: HTMLElement|string;
  // if this menu is a sub menu, contains a list of sub menu item definitions
  subMenu?: IVideoListContextMenuItem[];
  // Additional CSS classes to be applied to the menu item
  cssClasses?: string[];
  // Optional tooltip for the menu item
  tooltip?: string;
// function that prepeare action function that gets executed when item is chosen
  prepareAction(params: GetContextMenuItemsParams): () => void;
}

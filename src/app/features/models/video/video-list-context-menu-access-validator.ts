import { GetContextMenuItemsParams } from 'ag-grid-community';

export const contextMenuAccessValidatorForFieldOnly = (fieldName: string) => {
  return (params: GetContextMenuItemsParams) => {
    if (!params || !params.column || !params.value || !params.value.id) {
      return false;
    }

    const colDef = params.column.getColDef();
    if (!colDef) {
      return false;
    }

    return colDef.field === fieldName;
  };
};

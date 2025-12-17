sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("employee.controller.App", {
      getModel(sName) {
      return sName ? this.getOwnerComponent().getModel(sName) : this.getOwnerComponent().getModel();
    }
  });
});
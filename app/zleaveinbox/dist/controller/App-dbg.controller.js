sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("zleaveinbox.controller.App", {
      onInit() {
      },

      getModel: function (sName) {
        return sName === "" ? this.getOwnerComponent().getModel() : this.getOwnerComponent().getModel(sName);
      },
  
      getFilter: function (path, operator, value) {
        return new sap.ui.model.Filter({ path: path, operator: operator, value1: value });
      },

      getRouter: function(){
        return this.getOwnerComponent().getRouter();
      }
  });
});
sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("zleaverequest.controller.App", {
    onInit() {
    },

    getRouter: function () {
      return this.getOwnerComponent().getRouter();
    },

    getModel: function (sName) {
      return sName === "" ? this.getOwnerComponent().getModel() : this.getOwnerComponent().getModel(sName);
    },

    getFilter: function (path, operator, value) {
      return new sap.ui.model.Filter({ path: path, operator: operator, value1: value });
    },

    setBusy: function(oControl){
      oControl.setBusyIndicatorDelay(0);
      return oControl.setBusy(true);
    },

    hideBusy: function(oControl){
      return oControl.setBusy(false);
    }

  });
});
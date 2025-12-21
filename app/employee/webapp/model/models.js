sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
],
    function (JSONModel, Device) {
        "use strict";

        return {
            /**
             * Provides runtime information for the device the UI5 app is running on as a JSONModel.
             * @returns {sap.ui.model.json.JSONModel} The device model.
             */
            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },

            _createEmployeePayload() {
                return {
                    FIRST_NAME: "",
                    LAST_NAME: "",
                    GENDER: "",
                    EMAIL: "",
                    EXPERIENCE: "",
                    DESIGNATION: "",
                    MODULE: "",
                    MODULE_TYPE: "",
                    PHONE_NO: "",
                    QR_CODE: ""

                }
            }
        };

    });
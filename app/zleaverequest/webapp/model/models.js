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

        getPriorityItems: function () {
            return [{
                "key": "High",
                "value": "High"
            }, {
                "key": "Medium",
                "value": "Medium"
            }, {
                "key": "Low",
                "value": "Low"
            }]
        },

        getLeaveTypeItems: function () {
            return [{
                "key": "Sick Leave",
                "value": "Sick Leave"
            }, {
                "key": "Casual Leave",
                "value": "Casual Leave"
            }, {
                "key": "Paid Leave",
                "value": "Paid Leave"
            }]
        },

        getLeaveRequestPayload: function(){
                return {
                    "APPLIED_BY_EMP_ID":"",
                    "DATE":"",
                    "FROM_DATE":"",
                    "TO_DATE":"",
                    "TYPE":"",
                    "PRIORITY":"",
                    "REASON":""
                };
        }
    };

});
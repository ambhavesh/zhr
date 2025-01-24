sap.ui.define([
    "sap/ui/core/library"
], function (coreLibrary) {
    "use strict";
 
    const { ValueState } = coreLibrary;
 
    const Formatter = {
        formatPriority: function (sPriority) {
            switch (sPriority) {
                case "High":
                    return ValueState.Error;
                case "Medium":
                    return ValueState.Warning;
                case "Low":
                    return ValueState.Information;
                default:
                    return ValueState.None;
            }
        },
 
        formatPriorityIcon: function (sPriority) {
            switch (sPriority) {
                case "High":
                    return "sap-icon://high-priority";
                case "Medium":
                    return "sap-icon://overflow"
                case "Low":
                    return "sap-icon://arrow-down";
                default:
                    return ""
            }
        },
 
        formatStatus: function (sStatus) {
            switch (sStatus) {
                case "Pending":
                    return ValueState.Warning;
                case "Approved":
                    return ValueState.Success;
                case "Rejected":
                    return ValueState.Error;
                default:
                    return ValueState.None;
            }
        },
 
        formatStatusIcon: function (sStatus) {
            switch (sStatus) {
                case "Pending":
                    return "sap-icon://pending";
                case "Approved":
                    return "sap-icon://sys-enter-2";
                case "Rejected":
                    return "sap-icon://sys-cancel-2";
                default:
                    return "";
            }
        }
    };
    return Formatter;
});
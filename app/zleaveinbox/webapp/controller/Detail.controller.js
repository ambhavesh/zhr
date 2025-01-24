sap.ui.define([
    "./App.controller",
    "../formatter/Formatter",
    "sap/m/MessageBox",

], (BaseController, Formatter, MessageBox) => {
    "use strict";

    return BaseController.extend("zleaveinbox.controller.Detail", {

        formatter: Formatter,
        onInit() {
            this.getModel("").setUseBatch(false);
            var oModel = this.getModel("JSONModel");
            this.getView().setModel(oModel);
        },

        onRejectButtonPress: function () {
            this.getRouter().navTo("DetailEmpty")
        },

        onApproveButtonPress: function (oEvent) {
            sap.ui.core.BusyIndicator.show(0);
            var oLeaveRequest = this.getModel("JSONModel").getProperty("/LeaveRequests");
            var oApproveLeaveObj = {
                "LeaveRequestId": oLeaveRequest.LEAVE_REQUEST_ID,
                "LeaveType": oLeaveRequest.TYPE,
                "EmpId": oLeaveRequest.APPLIED_BY_EMP_ID
            };
            var ODataModel = this.getModel("");
            ODataModel.callFunction("/ApproveLeave", {
                method: "POST",
                urlParameters: oApproveLeaveObj,
                success: (oData) => {
                    this.getModel("").refresh(true)
                    this.getModel("JSONModel").refresh(true);
                    sap.ui.core.BusyIndicator.hide();                    
                    MessageBox.success("Leave approved successfully",{
                        title:'Success',
                        onClose: (oAction) => {
                            debugger;
                            this.getRouter().navTo("DetailEmpty")
                        }
                    });
                },
                error: (error) => {
                    debugger;
                    sap.ui.core.BusyIndicator.hide();
                }
                
            });
        },

        onRejectButtonPress: function(){
            sap.ui.core.BusyIndicator.show(0);
            var oLeaveRequest = this.getModel("JSONModel").getProperty("/LeaveRequests");
            var oRejectLeaveObj = {
                "LeaveRequestId": oLeaveRequest.LEAVE_REQUEST_ID,
                "LeaveType": oLeaveRequest.TYPE,
                "EmpId": oLeaveRequest.APPLIED_BY_EMP_ID
            };
            var ODataModel = this.getModel("");
            ODataModel.callFunction("/RejectLeave", {
                method: "POST",
                urlParameters: oRejectLeaveObj,
                success: () => {
                    sap.ui.core.BusyIndicator.hide();
                    this.getModel("").refresh(true)
                    this.getModel("JSONModel").refresh(true);                    
                    MessageBox.success("Leave rejected successfully",{
                        title:'Success',
                        onClose: (oAction) => {
                            debugger;
                            this.getRouter().navTo("DetailEmpty")
                        }
                    });
                },
                error: (error) => {
                    debugger;
                    sap.ui.core.BusyIndicator.hide();
                }
                
            });
        }
    });
});
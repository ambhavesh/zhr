sap.ui.define([
    "./App.controller",
    "../model/models",
    "../formatter/formatter",
], (BaseController, Models, Formatter) => {
    "use strict";

    return BaseController.extend("zleaverequest.controller.LeaveRequestDetail", {

        formatter: Formatter,
        onInit: function () {
            this.getModel().setUseBatch(false);
            this.getRouter().getRoute("LeaveRequest").attachPatternMatched(this._onPatternMatched, this);
        },

        _onPatternMatched: async function () {
            await this.getLeaveRequest();
        },

        getLeaveRequest: function () {
            return new Promise(function (resolve, reject) {
                var oLeaveRequestFilter = this.getFilter("LEAVE_REQUEST_ID", sap.ui.model.FilterOperator.EQ, this.getModel("LeaveModel").getProperty("/SelectedLeaveRequestObj").LEAVE_REQUEST_ID);
                var ODataModel = this.getModel();
                sap.ui.core.BusyIndicator.show();
                ODataModel.read("/LeaveRequests", {
                    filters: [oLeaveRequestFilter],
                    urlParameters: {
                        "$expand": 'APPLIED_BY'
                    },
                    success: (oData) => {
                        resolve(oData);
                        sap.ui.core.BusyIndicator.hide();
                        this.getModel("LeaveModel").setProperty("/SelectedLeaveRequestObj", oData.results[0]);
                    },
                    error: (error) => { }
                })
            }.bind(this));

        },

        onLeaveRequestOverviewNavPress: function () {
            this.getRouter().navTo("RouteMain");
        },

        onModifyRequestPress: function () {
            this.getRouter().navTo("EditLeaveRequestDetail");
        },

        onCancelRequestPress: function () {
            this.getRouter().navTo("LeaveRequest", {
                LeaveRequestId: this.getModel("LeaveModel").getProperty("/SelectedLeaveRequestObj").LEAVE_REQUEST_ID
            });
        },

        onSaveRequestPress: function () {
            var sDateRange = this.byId("idUpdateDateRange").getValue()
            var oLeaveRequesteModifiedObj = this.getModel("LeaveModel").getProperty("/SelectedLeaveRequestObj");
            oLeaveRequesteModifiedObj.FROM_DATE = sDateRange.split(" - ")[0];
            oLeaveRequesteModifiedObj.TO_DATE = sDateRange.split(" - ")[1];
            var sPath = `/LeaveRequests(guid'${oLeaveRequesteModifiedObj.LEAVE_REQUEST_ID}')`;
            
            this.getModel().update(sPath, oLeaveRequesteModifiedObj, {
                success: ()=>{
                    this.getRouter().navTo("LeaveRequest", {
                        LeaveRequestId: this.getModel("LeaveModel").getProperty("/SelectedLeaveRequestObj").LEAVE_REQUEST_ID
                    });
                },
                error: (oError)=>{}
            });
        }

    });
});
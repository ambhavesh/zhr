sap.ui.define([
    "./App.controller",
    "../formatter/Formatter",
], (BaseController, Formatter) => {
    "use strict";

    return BaseController.extend("zleaveinbox.controller.Master", {
        formatter: Formatter,
        onInit() {
            this.getRouter().navTo("DetailEmpty")
        },

		onLeaveRequestsListItemPress: function(oEvent) {
            sap.ui.core.BusyIndicator.show(0);
            var oItem = oEvent.getParameter("listItem");
            var sPath = oItem.getBindingContext().sPath;
            var oSelectedLeaveObj = oItem.getBindingContext().getObject();
            var sId = oSelectedLeaveObj.LEAVE_REQUEST_ID;
            var oLeaveRequestFilter = this.getFilter("LEAVE_REQUEST_ID", sap.ui.model.FilterOperator.EQ, oSelectedLeaveObj.LEAVE_REQUEST_ID);
            var ODataModel = this.getModel("");
            
            ODataModel.read("/LeaveRequests", {
                filters: [oLeaveRequestFilter],
                urlParameters: {
                    "$expand": 'APPLIED_BY'
                },
                success: (oData) => {
                    sap.ui.core.BusyIndicator.hide();
                    this.getOwnerComponent().getRouter().navTo("Detail",{
                        leaveID: sId
                    });
                    var oModel = this.getModel("JSONModel")
                    oModel.setProperty("/LeaveRequests", oData.results[0]);
                    
                },
                error: (error) => { }
            });
            
		}
    });
});
sap.ui.define([
    "./App.controller",
    "../model/models",
    "../formatter/formatter",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
], (BaseController, Models, Formatter, Fragment, MessageBox) => {
    "use strict";

    return BaseController.extend("zleaverequest.controller.Main", {

        formatter: Formatter,
        onInit: async function () {
            this.getModel().setUseBatch(false);
            var oLeaveModel = this.getModel("LeaveModel");
            oLeaveModel.setProperty("/PriorityItems", Models.getPriorityItems());
            oLeaveModel.setProperty("/TypeItems", Models.getLeaveTypeItems());
            await this.getUserDetails();
            this.getLeaveRequest();
            this.getRouter().getRoute("RouteMain").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function () {
            this.getLeaveRequest();
        },

        getUserDetails: function () {
            return new Promise((resolve, reject) => {
                var Email;
                var shell = sap.ushell;
                if (shell) {
                    Email = sap.ushell.Container.getService("UserInfo").getEmail();
                }
                if (Email === undefined) {
                    Email = 'tiwaribhavesh45@gmail.com';
                }
                var ODataModel = this.getModel();
                ODataModel.callFunction("/GetLoggedInUser", {
                    urlParameters: {
                        "Email": Email
                    },
                    success: (oData) => {
                        resolve(oData);
                        this.getModel("LeaveModel").setProperty("/User", oData.results);
                        this.getModel("LeaveModel").setProperty("/EmpId", oData.results[0].EMP_ID);
                    },
                    error: (error) => {
                        reject(error);
                        MessageBox.error("Failed to load, Instance is crashed or stopped",{
                            title: "Error",
                        });
                     }
                })
            });

        },

        getLeaveRequest: function () {
            var sEmpId = this.getModel("LeaveModel").getProperty("/EmpId");
            var oLeaveRequestFilter = this.getFilter("APPLIED_BY_EMP_ID", sap.ui.model.FilterOperator.EQ, sEmpId);
            var ODataModel = this.getModel();
            this.setBusy(this.byId("LeaveRequestList"));
            ODataModel.read("/LeaveRequests", {
                filters: [oLeaveRequestFilter],
                urlParameters: {
                    "$expand": 'APPLIED_BY'
                },
                success: (oData) => {
                    this.hideBusy(this.byId("LeaveRequestList"));
                    this.getModel("LeaveModel").setProperty("/LeaveRequestItem", oData.results);
                    this.getModel("LeaveModel").setProperty("/RequestCount", oData.results.length);
                },
                error: (oError) => { 
                    MessageBox.error("Failed to load, Instance is crashed or stopped",{
                        title: "Error",
                    });
                }
            })
        },

        onCreateRequestPress: function () {
            var oLeaveRequestPayload = Models.getLeaveRequestPayload();
            this.getModel("LeaveModel").setProperty("/CreateLeaveRequestPayload", oLeaveRequestPayload);
            var oView = this.getView();
            var that = this;
            if (!this.oLeaveRequestDialog) {
                this.oLeaveRequestDialog = Fragment.load({
                    id: oView.getId(),
                    name: "zleaverequest.fragments.CreateLeaveRequest",
                    controller: this
                }).then(function (oDialog) {
                    that.oLeaveRequestDialog = oDialog;
                    oView.addDependent(oDialog);
                    oDialog.open();
                    return oDialog;
                });
            }
            else {
                this.oLeaveRequestDialog.open();
            }
        },

        onLeaveRequestDialogCancelPress: function () {
            this.oLeaveRequestDialog.close();
            if (this.oLeaveRequestDialog) {
                this.oLeaveRequestDialog.destroy();
                this.oLeaveRequestDialog = null;
            }
        },

        onLeaveRequestSavePress: function () {
            var oLeaveModel = this.getModel("LeaveModel");
            var oLeaveRequestPayload = oLeaveModel.getProperty("/CreateLeaveRequestPayload");
            oLeaveRequestPayload.APPLIED_BY_EMP_ID = oLeaveModel.getProperty("/EmpId");
            oLeaveRequestPayload.FROM_DATE = oLeaveRequestPayload.DATE.split(" - ")[0];
            oLeaveRequestPayload.TO_DATE = oLeaveRequestPayload.DATE.split(" - ")[1];
            delete (oLeaveRequestPayload.DATE);
            sap.ui.core.BusyIndicator.show();
            this.getModel().create("/LeaveRequests", oLeaveRequestPayload, {
                success: (oData) => {
                    this.getLeaveRequest();
                    this.onLeaveRequestDialogCancelPress();
                    this.getModel("LeaveModel").refresh();
                    sap.ui.core.BusyIndicator.hide();
                },
                error: function (oError) {
                    MessageBox.error("Failed to create, Instance is crashed or stopped",{
                        title: "Error",
                    });
                 }
            });
        },

        onLeaveRequestSelectionChange: function (oEvent) {
            var oLeaveModel = this.getModel("LeaveModel");
            var oSelectdListItem = oEvent.mParameters.listItem;
            oSelectdListItem.setSelected(false);
            var oSelectedLeaveRequestObj = oSelectdListItem.getBindingContext("LeaveModel").getObject();
            oLeaveModel.setProperty("/SelectedLeaveRequestObj", oSelectedLeaveRequestObj);
            oSelectedLeaveRequestObj.STATUS === "Pending" ? oLeaveModel.setProperty("/EnabledForModify", true) : oLeaveModel.setProperty("/EnabledForModify", false);
            this.getRouter().navTo("LeaveRequest", {
                LeaveRequestId: oSelectedLeaveRequestObj.LEAVE_REQUEST_ID
            });
        }

    });
});
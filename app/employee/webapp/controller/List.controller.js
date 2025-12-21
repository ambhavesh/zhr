sap.ui.define([
    "employee/controller/App.controller",
    "employee/model/models",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/library",
    "sap/m/Text",
    "sap/m/Button"
], (Controller, Models, MessageBox, Dialog, mobileLibrary, Text, Button) => {
    "use strict";

    const ButtonType = mobileLibrary.ButtonType;
    const DialogType = mobileLibrary.DialogType;

    return Controller.extend("employee.controller.List", {
        onInit() {
            this.oUIModel = this.getModel("ui");
            this.oUIModel.setData({
                editEnabled: false,
                isCreationPending: false
            });
        },

        onRefreshPress() {
            this.getModel().refresh();
        },

        onUpdateFinished(oEvent) {
            const oEmployeeTable = oEvent.getSource();
            const aNewEmployeeExists = oEmployeeTable.getItems().map(item => item.getBindingContext().isTransient());
            aNewEmployeeExists.includes(true) ?
                this.oUIModel.setProperty("/isCreationPending", true) :
                this.oUIModel.setProperty("/isCreationPending", false);

        },

        async onMassUploadPress(){
            const oView = this.getView();
            oView.setBusyIndicatorDelay(0);
            oView.setBusy(true);
            this.spreadsheetUpload = await this.getOwnerComponent().createComponent({
                usage: "spreadsheetImporter",
                async: true,
                componentData: {
                    context: this,
                    readAllSheets: true,
                    spreadsheetFileName: "Employee.xlsx",
                    showBackendErrorMessages: true
                },
            });

            this.spreadsheetUpload.openSpreadsheetUploadDialog();
            oView.setBusy(false);
        },

        onUpdatePress: async function () {
            try {
                await this._updateEmployee(this.getModel()).then(() => {
                    MessageBox.success("Employee updated successfully", { title: "Success" });
                    const oEmployeeTable = this.byId("employeeTable");
                    oEmployeeTable.removeSelections(true);
                    this.oUIModel.setProperty("/editEnabled", oEmployeeTable.getSelectedItems().length > 0)

                    oEmployeeTable.getItems().forEach(item => {
                        item.getCells().forEach(cell => {
                            const oBindInfo = cell.getBindingInfo("value");
                            if (oBindInfo) {
                                cell.setEditable(false);
                            }
                        });
                    });
                });
            } catch (error) {
                MessageBox.error("Employee updating failed", { title: "Error" });
            }
        },

        _updateEmployee(oModel) {
            return new Promise((resolve, reject) => {
                if (oModel.hasPendingChanges()) {
                    oModel.submitChanges({
                        success: resolve,
                        error: reject
                    })
                }
            });
        },

        onCreatePress() {
            const oEmployeeTable = this.byId("employeeTable");
            const oBinding = oEmployeeTable.getBinding("items");
            const oPayload = Models._createEmployeePayload();
            oBinding.create(oPayload);
            oEmployeeTable.getItems().forEach((item) => {
                const isTransient = item.getBindingContext().isTransient();
                if (isTransient) {
                    item.getCells().forEach(cell => {
                        if (cell instanceof sap.m.Input) { cell.setEditable(true); }
                    })
                } else return;
            });
            this.oUIModel.setProperty("/isCreationPending", true);
        },

        onSavePress() {
            try {
                this._onSaveEmployee(this.getModel()).then(() => {
                    this.oUIModel.setProperty("/isCreationPending", false);
                    MessageBox.success("Employee saved successfully", { title: "Success" });
                    const oEmployeeTable = this.byId("employeeTable");
                    oEmployeeTable.getItems().forEach((item) => {
                        item.getCells().forEach(cell => {
                            if (cell instanceof sap.m.Input) { cell.setEditable(false); }
                        })
                    });
                })
            } catch (error) {
                MessageBox.error("Employee saving failed", { title: "Error" });
                this.oUIModel.setProperty("/isCreationPending", false);
            }
        },

        _onSaveEmployee(oModel) {
            return new Promise((resolve, reject) => {
                if (oModel.hasPendingChanges()) {
                    oModel.submitChanges({
                        success: resolve,
                        error: reject
                    })
                }
            });
        },

        onDeletePress(oEvent) {
            const oSource = oEvent.getSource();
            const oModel = oSource.getModel();
            const oBindingContext = oSource.getBindingContext();
            const sPath = oBindingContext.getPath();

            if (oBindingContext.isTransient()) {
                oBindingContext.delete().then(() => {
                    this.byId("employeeTable").getItems().forEach(item => {
                        const oBindingContext = item.getBindingContext();
                        const bNewEmployee = oBindingContext.isTransient();
                        if (!bNewEmployee) {
                            item.getCells().forEach(cell => { if (cell instanceof sap.m.Input) cell.setEditable(false) })
                        }
                    })
                })
            } else {
                if (!this.oConfirmationDialog) {
                    this.oConfirmationDialog = new Dialog({
                        type: DialogType.Message,
                        title: "Confirm",
                        state: "Information",
                        content: new Text({ text: "Do you want to delete this employee ?" }),
                        beginButton: new Button({
                            type: ButtonType.Emphasized,
                            text: "Delete",
                            press: async function () {
                                await this._deleteEmployee(oModel, sPath);
                                this.oConfirmationDialog.close();
                            }.bind(this)
                        }),
                        endButton: new Button({
                            text: "Cancel",
                            press: function () {
                                this.oConfirmationDialog.close();
                            }.bind(this)
                        })
                    });
                }

                this.oConfirmationDialog.open();
            }
        },

        _deleteEmployee(oModel, sPath) {
            return new Promise((resolve, reject) => {
                oModel.remove(sPath, {
                    success: resolve,
                    error: reject
                })
            })
        },

        onEmployeeSelectionChange(oEvent) {
            const mParams = oEvent.getParameters();
            const bSelected = mParams.selected;
            const aListItems = mParams.listItems;
            const aSelectedItems = oEvent.getSource().getSelectedItems();
            this.oUIModel.setProperty("/editEnabled", aSelectedItems.length > 0);

            aListItems.forEach(item => {
                item.getCells().forEach(cell => {
                    if (cell.getBindingInfo("value")) {
                        cell.setEditable(bSelected);

                        if (!bSelected) {
                            const oContext = item.getBindingContext();
                            if (oContext) {
                                const oModel = oContext.getModel();
                                const sPath = oContext.getPath();
                                oModel.resetChanges([sPath]);
                            }
                        }
                    }
                });
            });
        }

    });
});
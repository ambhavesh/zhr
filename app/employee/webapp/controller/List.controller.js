sap.ui.define([
    "employee/controller/App.controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("employee.controller.List", {
        onInit() {
        },

        onEmployeeSelectionChange(oEvent) {
            const mParams = oEvent.getParameters();
            const bSelected = mParams.selected;
            const aListItems = mParams.listItems;
            const aSelectedItems = oEvent.getSource().getSelectedItems();
            this.getOwnerComponent().getModel("ui").setProperty("/editEnabled", aSelectedItems.length > 0);

            aListItems.forEach(item => {
                item.getCells().forEach(cell => {
                    if (cell.getBindingInfo("value")) {
                        cell.setEnabled(bSelected);

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
        },

        onUpdatePress: async function () {
            try {
                await this._updateEmployee(this.getModel()).then(() => {
                    MessageBox.success("Employee updated successfully", { title: "Success" });
                    const oEmployeeTable = this.byId("employeeTable");
                    oEmployeeTable.removeSelections(true);
                    this.getModel("ui").setProperty("/editEnabled", oEmployeeTable.getSelectedItems().length > 0)

                    oEmployeeTable.getItems().forEach(item => {
                        item.getCells().forEach(cell => {
                            const oBindInfo = cell.getBindingInfo("value");
                            if (oBindInfo) {
                                cell.setEnabled(false);
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

    });
});
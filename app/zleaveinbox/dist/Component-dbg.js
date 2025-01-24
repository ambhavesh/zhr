sap.ui.define([
    "sap/ui/core/UIComponent",
    "zleaveinbox/model/models",
    'sap/m/IllustrationPool'
], (UIComponent, models, IllustrationPool) => {
    "use strict";

    return UIComponent.extend("zleaveinbox.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();

            // var oTntSet = {
			// 	setFamily: "tnt",
			// 	setURI: sap.ui.require.toUrl("sap/tnt/themes/base/illustrations")
			// };
			// IllustrationPool.registerIllustrationSet(oTntSet, false);
        }
    });
});
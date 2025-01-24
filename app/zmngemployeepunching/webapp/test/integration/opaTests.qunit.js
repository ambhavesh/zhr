sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'zmngemployeepunching/test/integration/FirstJourney',
		'zmngemployeepunching/test/integration/pages/EmployeesList',
		'zmngemployeepunching/test/integration/pages/EmployeesObjectPage',
		'zmngemployeepunching/test/integration/pages/PunchingDetailsObjectPage'
    ],
    function(JourneyRunner, opaJourney, EmployeesList, EmployeesObjectPage, PunchingDetailsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('zmngemployeepunching') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheEmployeesList: EmployeesList,
					onTheEmployeesObjectPage: EmployeesObjectPage,
					onThePunchingDetailsObjectPage: PunchingDetailsObjectPage
                }
            },
            opaJourney.run
        );
    }
);
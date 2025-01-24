using timetracker.srv.service.TIME_TRACKER_SRV as service from '../../srv/service';

annotate service.Employees with @(UI.SelectionFields: [
    FIRST_NAME,
    LAST_NAME
]);


annotate service.Employees with @(
    UI.LineItem  : [
        {
            $Type                : 'UI.DataField',
            Value                : FIRST_NAME,
            ![@HTML5.CssDefaults]: {width: '20%'}
        },
        {
            $Type                : 'UI.DataField',
            Value                : LAST_NAME,
            ![@HTML5.CssDefaults]: {width: '20%'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : 'Experience (in years)',
            Value                : EXPERIENCE,
            ![@HTML5.CssDefaults]: {width: '20%'}
        },
        {
            $Type                : 'UI.DataField',
            Value                : EMAIL,
            ![@HTML5.CssDefaults]: {width: '20%'}
        },
        {
            $Type                : 'UI.DataField',
            Value                : MODULE,
            ![@HTML5.CssDefaults]: {width: '20%'}
        }
    ],
    UI.HeaderInfo: {
        TypeName      : 'Employee',
        TypeNamePlural: 'Employees',
        Title         : {
            $Type: 'UI.DataField',
            Value: FIRST_NAME
        }
    }
);

annotate service.Employees with @(
    UI.FieldGroup #GeneratedGroup1: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'First Name',
                Value: FIRST_NAME,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Last Name',
                Value: LAST_NAME,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Gender',
                Value: GENDER,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Email',
                Value: EMAIL,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Phone',
                Value: PHONE_NO,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Experience (in years)',
                Value: EXPERIENCE,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Designation',
                Value: DESIGNATION,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Module',
                Value: MODULE,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Module Type',
                Value: MODULE_TYPE,
            },
        ],
    },
    UI.Facets                     : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'IdeneralInformation',
            Label : 'General Information',
            Target: '@UI.FieldGroup#GeneratedGroup1',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Punching Details',
            ID    : 'IdPunchingDetails',
            Target: 'PUNCHING_DATA/@UI.LineItem#PunchingDetails',
        },
    ]
);

annotate service.PunchingDetails with @(
    UI.LineItem #PunchingDetails: [
        {
            $Type                : 'UI.DataField',
            Label                : 'Punch Date',
            Value                : PUNCH_DATE,
            ![@HTML5.CssDefaults]: {width: '25%'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : 'Punch In',
            Value                : PUNCH_IN,
            ![@HTML5.CssDefaults]: {width: '25%'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : 'Punch Out',
            Value                : PUNCH_OUT,
            ![@HTML5.CssDefaults]: {width: '25%'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : 'Arrival Status',
            Value                : ARRIVAL_STATUS,
            Criticality          : CRITICALITY,
            ![@HTML5.CssDefaults]: {width: '25%'}
        },
    ],
    UI.SelectionFields          : [
        PUNCH_DATE,
        ARRIVAL_STATUS
    ]
);

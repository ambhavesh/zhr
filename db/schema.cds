namespace timetracker.db.schema;

entity EMPLOYEE {
    key EMP_ID         : UUID                                  @title: 'Employee Id';
        FIRST_NAME     : String                                @title: 'First Name';
        LAST_NAME      : String                                @title: 'Last Name';
        GENDER         : String                                @title: 'Gender';
        EMAIL          : String                                @title: 'Email';
        LAUNCHPAD_USER : String                                @title: 'Launchpad User';
        EXPERIENCE     : Integer                               @title: 'Experience';
        DESIGNATION    : String                                @title: 'Designation';
        MODULE         : String                                @title: 'Module';
        MODULE_TYPE    : String                                @title: 'Module Type';
        PHONE_NO       : Integer64                             @title: 'Phone No';
        PUNCHING_DATA  : Association to many PUNCHING_DETAILS
                             on PUNCHING_DATA.EMP_CODE = $self @title: 'Punching Details';
        QR_CODE        : String                                @title: 'QR Code';
};

entity PUNCHING_DETAILS {
    key EMP_CODE   : Association to EMPLOYEE;
    key PUNCH_DATE : String;
        PUNCH_IN   : String;
        PUNCH_OUT  : String;
};

entity LEAVE_BALANCE {
    key LEAVE_BALANCE_ID      : UUID;
        TOTAL_LEAVE_COUNT     : Integer;
        AVAILABLE_LEAVE_COUNT : Integer;
        EMP                   : Association to EMPLOYEE;
};

entity LEAVE_REQUEST {
    key LEAVE_REQUEST_ID : UUID                    @title: 'Leave Request Id';
        APPLIED_BY       : Association to EMPLOYEE @title: 'Applied By';
        FROM_DATE        : String                  @title: 'From Date';
        TO_DATE          : String                  @title: 'To Date';
        TYPE             : String                  @title: 'Type';
        PRIORITY         : String                  @title: 'Priority';
        STATUS           : String                  @title: 'Status';
        REASON           : String                  @title: 'Reason';
};

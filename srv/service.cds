namespace timetracker.srv.service;

using {timetracker.db.schema as db} from '../db/schema';


service TIME_TRACKER_SRV @(path: '/odata') {

    @odata.draft.enabled: true
    entity Employees       as projection on db.EMPLOYEE;

    @cds.redirection.target
    entity EmployeeSet     as projection on db.EMPLOYEE;

    @readonly: true
    entity PunchingDetails as
        projection on db.PUNCHING_DETAILS {
            EMP_CODE   as EMP_CODE_EMP_ID,
            PUNCH_DATE as PUNCH_DATE,
            PUNCH_IN   as PUNCH_IN,
            PUNCH_OUT  as PUNCH_OUT,
            case
                when
                    cast(
                        PUNCH_IN as        Time
                    ) > '10:10:00'
                then
                    'Late'
                else
                    'On Time'
            end        as ARRIVAL_STATUS : String,
            case
                when
                    cast(
                        PUNCH_IN as        Time
                    ) > '10:10:00'
                then
                    1
                else
                    3
            end        as CRITICALITY    : Integer
        };

    entity LeaveBalances   as projection on db.LEAVE_BALANCE;

    entity LeaveRequests   as
        projection on db.LEAVE_REQUEST {
            LEAVE_REQUEST_ID as LEAVE_REQUEST_ID,
            APPLIED_BY       as APPLIED_BY,
            FROM_DATE        as FROM_DATE,
            TO_DATE          as TO_DATE,
            TYPE             as TYPE,
            PRIORITY         as PRIORITY,
            STATUS           as STATUS,
            REASON           as REASON
        };

    entity TimeTrackerView as
        select from Employees {
            *,
            PUNCHING_DATA : redirected to PunchingDetails
        }
        excluding {
            QR_CODE
        };

    @open
    type object {};

    function GetLoggedInUser(Email : String)                                           returns object;
    action   Punch(Action : String, EmpId : Integer)                                   returns object;
    action   ApproveLeave(LeaveRequestId : String, LeaveType : String, EmpId : String) returns object;
    action   RejectLeave(LeaveRequestId : String, LeaveType : String, EmpId : String)  returns object;
}

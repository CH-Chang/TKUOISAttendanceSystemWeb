const pool = require("../utils/database");

exports.getAllStaffDetail = () => {
  return pool.execute(
    `select A.account, A.name, A.sex, A.department, A.role, S.id as staffNum from staff as S, account as A where S.account=A.id order by S.id asc;`
  );
};

exports.getStaffDetailByAccount = (account) => {
  return pool.execute(
    `select A.id as accountId, A.account, A.name, A.sex, A.department, A.role, S.id as staffNum from staff as S, account as A where S.account=A.id and A.account="407630390@gms.tku.edu.tw" order by S.id asc;`
  );
};

exports.getStaffsDetailByStaff = (staffNums) => {
  return pool.execute(
    `select A.account, A.name, A.sex, A.department, A.role, S.id as staffNum from staff as S, account as A where S.account=A.id and S.id in (${staffNums.toString()});`
  );
};

exports.getScheduleDetailByIntervalsAndStaffsAndShifts = (
  times,
  staffs,
  shifts
) => {
  return pool.execute(
    `select S.id, S.staff as staffNum, A.name as staffName, S.date, SH.id as shiftId, SH.name as shiftName, SH.start as shouldCheckin, SH.end as shouldCheckout, S.checkin, S.checkout, C.post as postId
    from schedule as S
    left join staff as ST on ST.id=S.staff
    left join account as A on  A.id=ST.account
    left join shift as SH on S.shift=SH.id
    left join cover as C on S.cover=C.id
    where S.date>="${times[0]}" and S.date<="${
      times[1]
    }" and S.staff in (${staffs.toString()}) and S.shift in (${shifts.toString()}) 
    order by S.date desc, S.shift asc;`
  );
};

exports.getScheduleCoverDetailByIntervalsAndStaffsAndShifts = (
  times,
  staffs,
  shifts
) => {
  return pool.execute(
    `select SC.id as scheduleId, SC.staff as staffNum, A.name as staffName, SC.date, SC.shift as shiftId, SH.name as shiftName, SH.start as shouldCheckin, SH.end as shouldCheckout, SH.hour, SH.payhour, SC.checkin, SC.checkout, SC.cover as coverId, C.approverId, C.approverName, C.requesterId, C.requesterName, C.recipientId, C.recipientName, C.coverPostId
    from schedule as SC
    left join staff as S on SC.staff=S.id
    left join account as A on S.account=A.id
    left join shift as SH on SC.shift=SH.id
    left join 
      (
        select CI.id as coverId, CI.approver as approverId, CAO.name as approverName, CI.requester as requesterId, CRRO.name as requesterName, CI.recipient as recipientId, CRTO.name as recipientName, CI.post as coverPostId
        from 
        cover as CI,
        (select CA.id, AA.name from cover as CA, account as AA, manager as MA where CA.approver=MA.id and MA.account=AA.id) as CAO,
        (select CRR.id, ARR.name from cover as CRR, account as ARR, staff as SRR where CRR.requester=SRR.id and SRR.account=ARR.id) as CRRO,
        (select CRT.id, ART.name from cover as CRT, account as ART, staff as SRT where CRT.recipient=SRT.id and SRT.account=ART.id) as CRTO
        where CAO.id=CI.id and CRRO.id=CI.id and CRTO.id=CI.id
      ) as C
      on C.coverId=SC.cover
    where SC.date>="${times[0]}" and SC.date<="${
      times[1]
    }" and SC.staff in (${staffs.toString()}) and SC.shift in (${shifts.toString()})
     order by SC.date asc, SC.shift asc, SC.staff asc;;`
  );
};

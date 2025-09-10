import { useContext, useEffect } from "react";

import { MentorContext } from "../../context/MentorContext";

import { AppContext } from "../../context/AppContext";

import { assets } from "../../assets/assets";
import Loading from "../../components/Loading";


const MentorMeetings = () => {

  const { dToken, Meetings, getMeetings, cancelMeeting, completeMeeting } = useContext(MentorContext);

  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);


  useEffect(() => {
    if (dToken) {
      getMeetings();
    }
  }, [dToken]);


  return (Meetings.length > 0 ?
    <div className="w-full max-w-6xl m-5 ">

      <p className="mb-3 text-lg font-medium">All Meetings</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Students</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {Meetings.map((item, index) => (
          item && item.userId &&
          <div className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50" key={index}>
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img src={item.userId.image} className="w-8 rounded-full" alt="" /> <p>{item.userId.name}</p>
            </div>
            <div>
              <p className="text-xs inline border border-primary px-2 rounded-full">
                {item.payment ? "Online" : "CASH"}
              </p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userId.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p>{currency}{item.amount}</p>
            {item.cancelled
              ? <p className="text-red-400 text-xs font-medium">Cancelled</p>
              : item.isCompleted
                ? <p className="text-green-500 text-xs font-medium">Completed</p>
                : item.expired
                  ? <p className="text-yellow-600 text-xs font-medium bg-yellow-50 border border-yellow-400 rounded px-2 py-1">Expired (Not Completed)</p>
                  : <div className="flex">
                      <img onClick={() => cancelMeeting(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="" />
                      <img onClick={() => completeMeeting(item._id)} className="w-10 cursor-pointer" src={assets.tick_icon} alt="" />
                    </div>
            }
          </div>
        ))}
      </div>
    </div> : <div className="w-full m-5 flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default MentorMeetings;

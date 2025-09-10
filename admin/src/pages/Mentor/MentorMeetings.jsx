import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { MentorContext } from "../../context/MentorContext";

import { AppContext } from "../../context/AppContext";

import { assets } from "../../assets/assets";
import Loading from "../../components/Loading";


const MentorMeetings = () => {

  const { dToken, Meetings, getMeetings, cancelMeeting, completeMeeting } = useContext(MentorContext);

  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  const navigate = useNavigate();


  useEffect(() => {
    if (dToken) {
      getMeetings();
    }
  }, [dToken]);


  return (Meetings.length > 0 ?
    <div className="w-full max-w-6xl m-5 ">

      <p className="mb-3 text-lg font-medium">All Meetings</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr_1fr_1fr_1.2fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Students</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
          <p>Video Call</p>
        </div>
        {Meetings.map((item, index) => (
          item && item.userId &&
          <div className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr_1fr_1fr_1.2fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50" key={index}>
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
                  : <div className="flex gap-2 items-center">
                      <img onClick={() => cancelMeeting(item._id)} className="w-8 h-8 cursor-pointer" src={assets.cancel_icon} alt="" />
                      <img onClick={() => completeMeeting(item._id)} className="w-8 h-8 cursor-pointer" src={assets.tick_icon} alt="" />
                    </div>
            }
            <div className="flex justify-center">
              {(!item.isCompleted && !item.expired && !item.cancelled) && (
                <button
                  className="px-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all text-xs whitespace-nowrap"
                  onClick={() => navigate(`/mentor/meeting/${item._id}/video`)}
                >
                  Start Video Call
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div> : <div className="w-full m-5 flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default MentorMeetings;

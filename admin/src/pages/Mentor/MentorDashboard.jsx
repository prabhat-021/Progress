import { useContext, useEffect } from "react";
import { MentorContext } from "../../context/MentorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const MentorDashboard = () => {

  const { dToken, dashData, getDashData, cancelMeeting, completeMeeting } = useContext(MentorContext);
  const { slotDateFormat, currency } = useContext(AppContext);


  useEffect(() => {

    if (dToken) {
      getDashData();
    }

  }, [dToken]);

  return dashData && (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded-lg border border-gray-200 cursor-pointer hover:shadow-sm transition">
          <img className="w-12" src={assets.earning_icon} alt="" />
          <div>
            <p className="text-lg font-semibold text-gray-700">{currency} {dashData.earnings}</p>
            <p className="text-gray-400 text-sm">Earnings</p>
          </div>
        </div>
        <Link to={"/Mentor-Meetings"} className="flex items-center gap-2 bg-white p-4 min-w-52 rounded-lg border border-gray-200 cursor-pointer hover:shadow-sm transition">
          <img className="w-12" src={assets.Meetings_icon} alt="" />
          <div>
            <p className="text-lg font-semibold text-gray-700">{dashData.Meetings}</p>
            <p className="text-gray-400 text-sm">Meetings</p>
          </div>
        </Link>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded-lg border border-gray-200 cursor-pointer hover:shadow-sm transition">
          <img className="w-12" src={assets.students} alt="" />
          <div>
            <p className="text-lg font-semibold text-gray-700">{dashData.patients}</p>
            <p className="text-gray-400 text-sm">Students</p></div>
        </div>
      </div>

      <div className="bg-white rounded-lg border mt-8">
        <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border-b">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-2">
          {dashData.latestMeetings.slice(0, 5).map((item, index) => (
            item && item.userData && (
              <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-50 border-b last:border-b-0" key={index}>
                <img className="rounded-full w-10 h-10 object-cover" src={item.userData.image} alt="" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium truncate">{item.userData.name}</p>
                  <p className="text-gray-600 ">Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">Completed</p>
                ) : item.expired ? (
                  <p className="text-yellow-600 text-xs font-medium bg-yellow-50 border border-yellow-400 rounded px-2 py-1">Expired (Not Completed)</p>
                ) : (
                  <div className="flex">
                    <img onClick={() => cancelMeeting(item._id)} className="w-9 cursor-pointer" src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeMeeting(item._id)} className="w-9 cursor-pointer" src={assets.tick_icon} alt="" />
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;

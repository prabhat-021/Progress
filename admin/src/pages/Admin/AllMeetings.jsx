import { useEffect } from "react"
import { assets } from "../../assets/assets"
import { useContext } from "react"
import { AdminContext } from "../../context/AdminContext"
import { AppContext } from "../../context/AppContext"

const AllMeetings = () => {

  const { aToken, Meetings, cancelMeeting, getAllMeetings } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllMeetings()
    }
  }, [aToken]);

  console.log(Meetings);

  return (
    <div className="w-full m-5 ">

      <p className="mb-3 text-lg font-medium">All Meetings</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Users</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Mentor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {Meetings.map((item, index) => (
          <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50" key={index}>
            <p className="max-sm:hidden">{index+1}</p>
            <div className="flex items-center gap-2">
              <img src={item.userData.image} className="w-8 rounded-full" alt="" /> <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className="flex items-center gap-2">
              <img src={item.menData.image} className="w-8 rounded-full bg-gray-200" alt="" /> <p>{item.menData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {item.cancelled ? <p className="text-red-400 text-xs font-medium">Cancelled</p> : item.isCompleted ? <p className="text-green-500 text-xs font-medium">Completed</p> : <img onClick={() => cancelMeeting(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="" />}
          </div>
        ))}
      </div>

    </div>
  )
}

export default AllMeetings;

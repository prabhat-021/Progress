import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const MentorsList = () => {

  const { Mentors, changeAvailability, aToken, getAllMentors , deleteMentor} = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllMentors();
    }
  }, [aToken]);

  return (
    <div className="m-5">
      <h1 className="text-lg font-medium">All Mentors</h1>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-5">
        {Mentors.map((item, index) => (
          <div className="border border-gray-200 rounded-md overflow-hidden bg-white cursor-pointer group" key={index}>
            <div className="aspect-[3/4] bg-[#F4F6FF] overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform" src={item.image} alt="" />
            </div>
            <div className="p-3">
              <p className="text-[#262626] text-[13px] font-semibold truncate">{item.name}</p>
              <p className="text-[#5C5C5C] text-[11px] truncate">{item.speciality}</p>
              <div className="mt-2 flex items-center gap-2 text-[12px]">
                <input onChange={() => changeAvailability(item._id)} id={`avail-${index}`} type="checkbox" checked={item.available} />
                <label htmlFor={`avail-${index}`}>Available</label>
              </div>
              <button onClick={() => deleteMentor(item.email)} type="button" className="mt-3 w-full text-white bg-red-600 hover:bg-red-700 rounded-md text-sm px-3 py-2">Delete Mentor</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorsList;

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
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Mentors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {Mentors.map((item, index) => (
          <div className="border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group" key={index}>
            <img className="bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500 h-60" src={item.image} alt="" />
            <div className="p-4">
              <p className="text-[#262626] text-lg font-medium">{item.name}</p>
              <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
              <button onClick={() => deleteMentor(item.email)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete Mentor</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorsList;

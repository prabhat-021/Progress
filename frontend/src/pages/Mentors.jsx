import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Mentors = () => {

  const { speciality } = useParams();

  const [filterMen, setFilterMen] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const { mentors } = useContext(AppContext);
  // console.log(mentors);

  const applyFilter = () => {
    if (speciality) {
      setFilterMen(mentors.filter(men => men.speciality === speciality));
    } else {
      setFilterMen(mentors);
    }
  }

  useEffect(() => {
    applyFilter()
  }, [mentors, speciality]);

  const categories = ["General Mentor", "Engineering", "Doctor", "Fashion Design", "MNC", "MBA"];

  // console.log(filterMen);
  return (
    <>
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Mentors</h1>
          <p className="text-gray-600 text-sm">Browse mentors by speciality</p>
        </div>
      </div>

      {/* Horizontal Filters */}
      <div className="mt-4 -mx-1">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => speciality === cat ? navigate("/Mentors") : navigate(`/Mentors/${cat}`)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full border text-sm transition-colors ${
                speciality === cat ? "bg-[#E2E5FF] text-black border-primary" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {filterMen.map((item, index) => (
            <div onClick={() => { navigate(`/Meeting/${item._id}`); scrollTo(0, 0) }} className="group border border-gray-200 rounded-md overflow-hidden cursor-pointer bg-white hover:shadow-sm transition-all duration-150" key={index}>
              <div className="aspect-[3/4] bg-[#F4F6FF] overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform" src={item.image} alt={item.name} />
              </div>
              <div className="p-2">
                <div className={`flex items-center gap-1 text-[10px] ${item.available ? "text-green-600" : "text-gray-500"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${item.available ? "bg-green-500" : "bg-gray-400"}`}></span>
                  <span className="truncate">{item.available ? "Available" : "Not Available"}</span>
                </div>
                <p className="mt-0.5 text-[#262626] text-[13px] font-semibold truncate">{item.name}</p>
                <p className="text-[#5C5C5C] text-[11px] truncate">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Mentors;
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Colleges = () => {
  const { speciality } = useParams();
  const [filterCollege, setFilterCollege] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { colleges } = useContext(AppContext);

  // console.log(colleges, "colleges");

  const applyFilter = () => {
    if (speciality) {
      setFilterCollege(colleges.filter(col => col.speciality === speciality));
    } else {
      setFilterCollege(colleges);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [colleges, speciality]);

  // console.log(filterCollege, "filterCollege");

  const filters = [
    "Engineering",
    "Medical",
    "Business & Management",
    "Law",
    "Arts & Humanities",
    "Science & Technology",
    "Design & Architecture"
  ];
  

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Colleges</h1>
          <p className="text-gray-600 text-sm">Find colleges with custom filters</p>
        </div>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1.5 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : "bg-white"
          }`}
        >
          Filters
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">

        <div
          className={`flex-col gap-3 text-sm text-gray-700 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {filters.map((filterName, idx) => (
            <p
              key={idx}
              onClick={() =>
                speciality === filterName
                  ? navigate("/College")
                  : navigate(`/College/${filterName}`)
              }
              className={`w-[94vw] sm:w-56 pl-3 py-2 pr-4 border rounded cursor-pointer transition-all hover:bg-gray-50 ${
                speciality === filterName ? "bg-[#E2E5FF] text-black border-primary" : "border-gray-300"
              }`}
            >
              {filterName}
            </p>
          ))}
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterCollege.map((item, index) => (
            <div
              onClick={() => {
                navigate(`/CollegeDetails/${item._id}`);
                scrollTo(0, 0);
              }}
              className="group border border-gray-200 rounded-lg overflow-hidden cursor-pointer bg-white hover:shadow-sm transition-all duration-200"
              key={index}
            >
              <div className="aspect-[4/3] bg-[#F4F6FF] overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" src={item.image} alt={item.name} />
              </div>
              <div className="p-3">
                <p className="text-[#262626] text-base font-semibold truncate">{item.name}</p>
                <div className="mt-1 flex items-center gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 truncate">{item.speciality}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Colleges;

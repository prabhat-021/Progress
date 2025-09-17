import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import CardShimmer from "./CardShimmer";

const TopMentors = () => {

    const navigate = useNavigate()

    const { mentors } = useContext(AppContext)
    const isLoading = mentors.length === 0;

    return (
        <div className="flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10">
            <h1 className="text-2xl md:text-3xl font-semibold">Top Mentors to Book</h1>
            <p className="sm:w-1/2 text-center text-sm text-gray-600">Browse our trusted mentors and find the right guide for your goals.</p>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4 px-3 sm:px-0">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <CardShimmer key={index} />
                    ))
                ) : (
                    mentors.slice(0, 10).map((item, index) => (
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
                    ))
                )}
            </div>
            <button onClick={() => { navigate("/Mentors"); scrollTo(0, 0) }} className="bg-[#EAEFFF] border border-[#C9D8FF] text-gray-700 px-8 py-2 rounded-full mt-6 text-sm hover:bg-[#e1e8ff] transition">More</button>
        </div>

    )
}

export default TopMentors;
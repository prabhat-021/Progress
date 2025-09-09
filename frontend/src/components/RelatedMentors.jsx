import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const RelatedMentors = ({ speciality, menId }) => {

    const navigate = useNavigate()
    const { mentors } = useContext(AppContext)

    const [relMent, setRelMent] = useState([])

    useEffect(() => {
        if (mentors.length > 0 && speciality) {
            // console.log(menId);     
            const MentorsData = mentors.filter((men) => men.speciality === speciality && men._id !== menId);
            setRelMent(MentorsData);            
        }
    }, [mentors, speciality, menId]);

    return (
        <div className="flex flex-col items-center gap-4 my-16 text-[#262626]">
            <h1 className="text-2xl md:text-3xl font-semibold">Related Mentors</h1>
            <p className="sm:w-1/2 text-center text-sm text-gray-600">Browse trusted mentors with similar expertise.</p>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4 px-3 sm:px-0">
                {relMent.map((item, index) => (
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
            <Link to="/Mentors" className="bg-[#EAEFFF] border border-[#C9D8FF] text-gray-700 px-8 py-2 rounded-full mt-6 text-sm hover:bg-[#e1e8ff] transition">More</Link>
        </div>
    )
}

export default RelatedMentors;

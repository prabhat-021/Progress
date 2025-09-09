import { useContext, useEffect, useState } from "react";
import { MentorContext } from "../../context/MentorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "../../axiosInstance.js";

const MentorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(MentorContext);
    const { currency, backendUrl } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);

    const updateProfile = async () => {

        try {

            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            };

            const { data } = await axios.post(backendUrl + "/api/Mentor/update-profile", updateData, { headers: { dToken } });

            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                getProfileData();
            } else {
                toast.error(data.message);
            }

            setIsEdit(false);

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }

    };

    useEffect(() => {
        if (dToken) {
            getProfileData();
        }
    }, [dToken]);

    return profileData && (
        <div className="m-5 flex flex-wrap gap-4">
            <div className="flex-1 border border-gray-200 rounded-xl p-6 bg-white">

                {/* Header: Avatar + Basic Info */}
                <div className="flex items-start gap-4">
                    <img className="w-56 min-h-56  rounded-lg object-cover bg-gray-100" src={profileData.image} alt="" />
                    <div className="flex-1">
                        <p className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-gray-800">{profileData.name}</p>
                        <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
                            <p>{profileData.degree} - {profileData.speciality}</p>
                            <button className="py-0.5 px-2 border text-[11px] rounded-full">{profileData.experience}</button>
                        </div>
                    </div>
                </div>

                {/* ----- About ----- */}
                <div className="mt-5">
                    <p className="text-sm font-medium text-[#262626]">About</p>
                    {isEdit ? (
                        <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} className="w-full mt-1 border rounded-md p-2 outline-none focus:ring-2 focus:ring-primary/30" rows={6} value={profileData.about} />
                    ) : (
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{profileData.about}</p>
                    )}
                </div>

                {/* ----- Fees ----- */}
                <p className="text-gray-700 font-medium mt-4">
                    Meeting fee: <span className="text-gray-900">{currency} {isEdit ? (
                        <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} className="ml-2 w-28 border rounded px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                    ) : (
                        profileData.fees
                    )}</span>
                </p>

                {/* ----- Address ----- */}
                <div className="mt-4">
                    <p className="text-sm font-medium text-[#262626]">Address</p>
                    {isEdit ? (
                        <div className="mt-2 space-y-2">
                            <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} className="w-full bg-gray-50 border rounded px-2 py-1 outline-none focus:ring-2 focus:ring-primary/30" placeholder="Address line 1" />
                            <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} className="w-full bg-gray-50 border rounded px-2 py-1 outline-none focus:ring-2 focus:ring-primary/30" placeholder="Address line 2" />
                        </div>
                    ) : (
                        <p className="text-sm text-gray-600 mt-1">{profileData.address.line1}<br />{profileData.address.line2}</p>
                    )}
                </div>

                {/* ----- Availability ----- */}
                <div className="flex items-center gap-2 pt-4">
                    <input type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
                    <label className="text-sm">Available</label>
                </div>

                {/* ----- Actions ----- */}
                <div className="mt-5 flex items-center gap-3">
                    {isEdit ? (
                        <>
                            <button onClick={updateProfile} className="px-5 py-2 bg-primary text-white text-sm rounded-full hover:opacity-95">Save</button>
                            <button onClick={() => setIsEdit(false)} className="px-5 py-2 border text-sm rounded-full hover:bg-gray-50">Cancel</button>
                        </>
                    ) : (
                        <button onClick={() => setIsEdit(prev => !prev)} className="px-5 py-2 border border-primary text-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all">Edit</button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default MentorProfile;

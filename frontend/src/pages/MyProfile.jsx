import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "../axiosInstance.js";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import Loading from "../components/Loading.jsx";

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false);

    const [image, setImage] = useState(false);

    const { backendUrl, userData, loadUserProfileData } = useContext(AppContext);
    // console.log(token);
    // console.log(userData);


    const [userData1, setUserData] = useState(userData);
    // console.log(userData);
    // useEffect(() => {
    //     loadUserProfileData();
    // }, []);

    useEffect(() => {
        setTimeout(() => {
            if (userData) {
                setUserData({ ...userData });
            }
        }, 1000);
    }, [userData]);

    // console.log(userData1);

    // Function to update user profile data using API
    const updateUserProfileData = async () => {

        try {

            const formData = new FormData();

            formData.append("name", userData1.name);
            formData.append("phone", userData1.phone);
            formData.append("address", JSON.stringify(userData1.address));
            formData.append("gender", userData1.gender);
            formData.append("dob", userData1.dob);

            image && formData.append("image", image);

            const { data } = await axios.post(backendUrl + "/api/user/update-profile", formData, { withCredentials: true });

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    }

    return userData1 ? (
        <div className="mx-auto w-full flex flex-col gap-6 pt-6">

            {/* Avatar + Name card */}
            <div className="border rounded-xl p-6 bg-white">
                <div className="flex items-start gap-4 justify-between">
                    {isEdit
                        ? <label htmlFor="image" className="relative inline-block cursor-pointer group">
                            <img className="w-28 h-28 rounded-full object-cover opacity-90" src={image ? URL.createObjectURL(image) : userData1.image} alt="avatar" />
                            <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                <img className="w-7" src={image ? "" : assets.upload_icon} alt="upload" />
                            </div>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
                        </label>
                        : <img className="w-28 h-28 rounded-full object-cover" src={userData.image} alt="avatar" />
                    }

                    <div className="flex-1">
                        {isEdit
                            ? <input className="bg-gray-50 text-2xl md:text-3xl font-semibold max-w-md px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-primary/30" type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData1.name} />
                            : <p className="font-semibold text-2xl md:text-3xl text-[#262626]">{userData1.name}</p>
                        }
                        <p className="text-gray-500 text-sm mt-1">Keep your information up to date for a better experience.</p>
                    </div>

                    {!isEdit && (
                        <button onClick={() => setIsEdit(true)} className="h-9 px-4 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all">Edit Profile</button>
                    )}
                </div>
            </div>

            {/* Contact Information */}
            <div className="border rounded-xl p-6 bg-white">
                <p className="text-gray-700 font-semibold mb-4">Contact Information</p>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-3 gap-x-4 text-[#363636] items-center">
                    <p className="font-medium">Email</p>
                    <p className="text-blue-600 break-all">{userData1.email}</p>

                    <p className="font-medium">Phone</p>
                    {isEdit
                        ? <input className="bg-gray-50 border rounded px-2 py-1 max-w-60 focus:outline-none focus:ring-2 focus:ring-primary/30" type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData1.phone} />
                        : <p className="text-blue-600">{userData1.phone}</p>
                    }

                    <p className="font-medium">Address</p>
                    {isEdit
                        ? <div className="space-y-2">
                            <input className="bg-gray-50 border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-primary/30" type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData1.address.line1} placeholder="Address line 1" />
                            <input className="bg-gray-50 border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-primary/30" type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData1.address.line2} placeholder="Address line 2" />
                        </div>
                        : <p className="text-gray-600">{userData1.address.line1} <br /> {userData1.address.line2}</p>
                    }
                </div>
            </div>

            {/* Basic Information */}
            <div className="border rounded-xl p-6 bg-white">
                <p className="text-gray-700 font-semibold mb-4">Basic Information</p>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-3 gap-x-4 text-gray-700 items-center">
                    <p className="font-medium">Gender</p>
                    {isEdit
                        ? <select className="max-w-28 bg-gray-50 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/30" onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData1.gender} >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p className="text-gray-600">{userData1.gender}</p>
                    }

                    <p className="font-medium">Birthday</p>
                    {isEdit
                        ? <input className="max-w-40 bg-gray-50 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/30" type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData1.dob} />
                        : <p className="text-gray-600">{userData1.dob}</p>
                    }
                </div>
            </div>

            {/* Actions */}
            {isEdit && (
                <div className="flex items-center gap-3">
                    <>
                        <button onClick={updateUserProfileData} className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-95 transition-all">Save changes</button>
                        <button onClick={() => { setIsEdit(false); setImage(false); setUserData({ ...userData }); }} className="border px-6 py-2 rounded-full hover:bg-gray-50">Cancel</button>
                    </>
                </div>
            )}
        </div>
    ) : <Loading />
}

export default MyProfile;

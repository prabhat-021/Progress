import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import Loading from "../../components/Loading";

const UsersList = () => {

    const { Users, aToken, getAllUsers } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllUsers();
        }
    }, [aToken]);

    return (
        Users ?
            <div className="m-5 max-h-[90vh] overflow-y-scroll">
                <h1 className="text-lg font-medium">All Users</h1>
                <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
                    {Users.map((item, index) => (
                        <div className="border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group" key={index}>
                            <img className="bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500 h-60 w-full" src={item.image} alt="" />
                            <div className="p-4">
                                <p className="text-[#262626] text-lg font-medium">{item.name}</p>
                                <p className="text-[#5C5C5C] text-sm">{item.email}</p>
                                <div className="mt-2 flex items-center gap-1 text-sm">
                                    <input type="checkbox" checked={item.verified} />
                                    <p>{item.verified ? "Verified" : "Not Verified"}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> : <Loading />
    );
};

export default UsersList;

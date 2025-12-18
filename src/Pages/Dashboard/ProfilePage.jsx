import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  const [editable, setEditable] = useState(false);

  // Fetch Single User Data
  const { data: userData = {}, refetch } = useQuery({
    queryKey: ["users-profile", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users-profile?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  // React Hook Form
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (editable && userData?._id) {
      reset({
        displayName: userData?.displayName || "",
        bloodGroup: userData?.bloodGroup || "",
        district: userData?.district || "",
        upazila: userData?.upazila || "",
      });
    }
  }, [editable, userData, reset]);

  // Update Profile
  const onSubmit = (data) => {
    const updatedData = {
      displayName: data.displayName,
      bloodGroup: data.bloodGroup,
      district: data.district,
      upazila: data.upazila,
    };
    console.log(updatedData);
    axiosSecure
      .patch(`/user-profile/${userData?._id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast.success("Profile updated successfully");
          setEditable(false);
        }
      });
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-red-500">My Profile</h2>

        {!editable ? (
          <button className="btn btn-warning" onClick={() => setEditable(true)}>
            Edit
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleSubmit(onSubmit)}>
            Save
          </button>
        )}
      </div>

      {/* CARD */}
      <div className="card shadow-lg p-8 bg-gray-500">
        <div className="flex justify-center mb-4">
          <img
            src={userData?.photoURL}
            alt="avatar"
            className="w-28 h-28 rounded-full border"
          />
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <input
            type="text"
            {...register("displayName")}
            defaultValue={userData.displayName}
            disabled={!editable}
            className="input input-bordered w-full"
            placeholder="Full Name"
          />

          {/* Email (fixed) */}
          <input
            type="email"
            value={userData?.email || ""}
            disabled
            className="input input-bordered w-full"
          />

          {/* Blood Group */}
          <select
            {...register("bloodGroup")}
            defaultValue={userData.bloodGroup}
            disabled={!editable}
            className="select select-bordered w-full"
          >
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((grp) => (
              <option key={grp} value={grp}>
                {grp}
              </option>
            ))}
          </select>

          {/* District */}
          <input
            type="text"
            {...register("district")}
            defaultValue={userData.district}
            disabled={!editable}
            className="input input-bordered"
            placeholder="District"
          />

          {/* Upazila */}
          <input
            type="text"
            {...register("upazila")}
            defaultValue={userData.upazila}
            disabled={!editable}
            className="input input-bordered"
            placeholder="Upazila"
          />
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

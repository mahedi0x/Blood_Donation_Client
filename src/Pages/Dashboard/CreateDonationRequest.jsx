import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const CreateDonationRequest = () => {
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const { user } = useAuth();
  // console.log("user--------", user);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const realData = useLoaderData();

  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log("upazila data", data);
        setUpazilas(data); //upazilas একটি array
      })
      .catch((err) => console.log(err));
  }, []);

  const selectedDistrict = useWatch({ control, name: "recipientDistrict" });

  const upazilaByDistrictId = (districtId) => {
    const districtUpazilas = upazilas.filter(
      (u) => u.district_id === districtId
    );
    const upazilasName = districtUpazilas.map((u) => u.name);
    return upazilasName;
  };

  const onSubmit = (data) => {
    // get district name from id (important)
    const districtName = realData.find((d) => d.id === data.recipientDistrict);

    const requestData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: data.recipientName,
      recipientDistrict: districtName?.name,
      recipientUpazila: data.recipientUpazila,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      donationStatus: "pending",
    };

    axiosSecure
      .post("/donation-requests?status=active", requestData)
      .then((res) => {
        try {
          if (res.data.insertedId) {
            toast.success("donation request create successfully");
            reset();
          }
        } catch (error) {
          const message = error.response?.data?.message; //alert কাজ করতেছে না
          toast.error(message);
        }
      });
  };

  return (
    <div className="bg-gray-500">
      <div className="max-w-7xl mx-auto px-4 py-6 bg-gray-500">
        <div className="bg-white shadow-md rounded-lg p-6 ">
          <h2 className="text-red-400 text-3xl font-bold mb-6 text-center md:text-left">
            Make a New Request
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5"
          >
            {/* Requester Name */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Requester Name</label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className=" bg-gray-300 p-2 rounded-md bg-gray-100"
              />
            </div>

            {/* Requester Email */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Requester Email</label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className=" bg-gray-300 p-2 rounded-md bg-gray-100"
              />
            </div>

            {/* Recipient Name */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Recipient Name</label>
              <input
                type="text"
                {...register("recipientName", { required: true })}
                className=" bg-gray-300 p-2 rounded-md"
                placeholder="Recipient Name"
              />
              {errors.recipientName && (
                <p className="text-red-500 text-sm mt-1">Recipient Name</p>
              )}
            </div>

            {/* Blood Group */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Blood Group</label>
              <select
                {...register("bloodGroup", { required: true })}
                className=" bg-gray-300 p-2 rounded-md"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((bg, i) => (
                  <option key={i} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
              {errors.bloodGroup && (
                <p className="text-red-500 text-sm mt-1">Blood Group Require</p>
              )}
            </div>

            {/* Recipient District */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Recipient District</label>
              <select
                {...register("recipientDistrict", { required: true })}
                className=" bg-gray-300 p-2 rounded-md"
                defaultValue="pick a District"
              >
                <option disabled value="pick a District">
                  Select District
                </option>
                {realData.map((d, i) => (
                  <option key={i} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              {errors.recipientDistrict && (
                <p className="text-red-500 text-sm mt-1">Select District</p>
              )}
            </div>

            {/* Recipient Upazila */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Recipient Upazila</label>
              <select
                {...register("recipientUpazila", { required: true })}
                className=" bg-gray-300 p-2 rounded-md"
                defaultValue="Pick a Upazila"
              >
                <option value="pick a Upazila">Select Recipient Upazila</option>
                {upazilaByDistrictId(selectedDistrict).map((u, i) => (
                  <option key={i} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              {errors.recipientUpazila && (
                <p className="text-red-500 text-sm mt-1">
                  Select Recipient Upazila
                </p>
              )}
            </div>

            {/* Donation Date */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Donation Date</label>
              <input
                type="date"
                {...register("donationDate", { required: true })}
                className=" bg-gray-300 p-2 rounded-md"
              />
              {errors.donationDate && (
                <p className="text-red-500 text-sm mt-1">donationDate</p>
              )}
            </div>

            {/* Donation Time */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Donation Time</label>
              <input
                type="time"
                {...register("donationTime", { required: true })}
                className=" bg-gray-300 p-2 rounded-md"
              />
              {errors.donationTime && (
                <p className="text-red-500 text-sm mt-1">donationTime</p>
              )}
            </div>

            {/* Hospital Name */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Hospital Name</label>
              <input
                type="text"
                {...register("hospitalName", { required: true })}
                className=" bg-gray-300 p-2 rounded-md"
              />
              {errors.hospitalName && (
                <p className="text-red-500 text-sm mt-1">hospitalName</p>
              )}
            </div>

            {/* Full Address */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Full Address</label>
              <input
                type="text"
                {...register("fullAddress", { required: true })}
                className=" bg-gray-300 p-2 rounded-md"
              />
              {errors.fullAddress && (
                <p className="text-red-500 text-sm mt-1">fullAddress</p>
              )}
            </div>

            {/* Request Message (Full Width) */}
            <div className="md:col-span-2 flex flex-col">
              <label className="font-medium mb-1">Request Message</label>
              <textarea
                {...register("requestMessage", { required: true })}
                rows="4"
                className="bg-gray-300 p-2 rounded-md"
                placeholder="Why Need Blood?"
              />
              {errors.requestMessage && (
                <p className="text-red-500 text-sm mt-1">requestMessage</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center md:justify-end">
              <button
                type="submit"
                className="font-semibold w-full md:w-auto bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
              >
                Make A Donation Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
  //     <h2 className="text-2xl font-bold mb-4">
  //       নতুন ডোনেশন রিকোয়েস্ট তৈরি করুন
  //     </h2>
  //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  //       {/* Requester Name */}
  //       <div>
  //         <label className="block font-medium">রিকোয়েস্টার নাম</label>
  //         <input
  //           type="text"
  //           value={user?.displayName}
  //           readOnly
  //           className="w-full border bg-gray-300 p-2 rounded-md bg-gray-100"
  //         />
  //       </div>

  //       {/* Requester Email */}
  //       <div>
  //         <label className="block font-medium">রিকোয়েস্টার ইমেইল</label>
  //         <input
  //           type="email"
  //           value={user?.email}
  //           readOnly
  //           className="w-full border bg-gray-300 p-2 rounded-md bg-gray-100"
  //         />
  //       </div>

  //       {/* Recipient Name */}
  //       <div>
  //         <label className="block font-medium">প্রাপকের নাম</label>
  //         <input
  //           type="text"
  //           {...register("recipientName", { required: true })}
  //           className="w-full border bg-gray-300 p-2 rounded-md"
  //         />
  //         {errors.recipientName && (
  //           <p className="text-red-500">প্রাপকের নাম প্রয়োজন।</p>
  //         )}
  //       </div>

  //       {/* Recipient District */}
  //       <div>
  //         <label className="block font-medium">প্রাপকের জেলা</label>
  //         <select
  //           {...register("recipientDistrict", { required: true })}
  //           className="w-full border bg-gray-300 p-2 rounded-md"
  //           defaultValue="pick a District"
  //         >
  //           <option disabled={true} value="pick a District">
  //             জেলা নির্বাচন করুন
  //           </option>
  //           {realData.map((d, i) => (
  //             <option key={i} value={d.id}>
  //               {d.name}
  //             </option>
  //           ))}
  //         </select>
  //         {errors.recipientDistrict && (
  //           <p className="text-red-500">জেলা নির্বাচন করুন।</p>
  //         )}
  //       </div>

  //       {/* Recipient Upazila */}
  //       <div>
  //         <label className="block font-medium">প্রাপকের উপজেলা</label>
  //         <select
  //           {...register("recipientUpazila", { required: true })}
  //           className="w-full border bg-gray-300 p-2 rounded-md"
  //           defaultValue="Pick a Upazila"
  //         >
  //           <option value="pick a Upazila">উপজেলা নির্বাচন করুন</option>
  //           {upazilaByDistrictId(selectedDistrict).map((u, i) => (
  //             <option key={i} value={u}>
  //               {u}
  //             </option>
  //           ))}
  //         </select>
  //         {errors.recipientUpazila && (
  //           <p className="text-red-500">উপজেলা নির্বাচন করুন।</p>
  //         )}
  //       </div>

  //       {/* Hospital Name */}
  //       <div>
  //         <label className="block font-medium">হাসপাতালের নাম</label>
  //         <input
  //           type="text"
  //           {...register("hospitalName", { required: true })}
  //           className="w-full border bg-gray-300 p-2 rounded-md"
  //         />
  //         {errors.hospitalName && (
  //           <p className="text-red-500">হাসপাতালের নাম প্রয়োজন।</p>
  //         )}
  //       </div>

  //       {/* Full Address */}
  //       <div>
  //         <label className="block font-medium">পূর্ণ ঠিকানা</label>
  //         <input
  //           type="text"
  //           {...register("fullAddress", { required: true })}
  //           className="w-full border bg-gray-300 p-2 rounded-md"
  //         />
  //         {errors.fullAddress && (
  //           <p className="text-red-500">পূর্ণ ঠিকানা প্রয়োজন।</p>
  //         )}
  //       </div>

  //       {/* Blood Group */}
  //       <div>
  //         <label className="block font-medium">রক্তের গ্রুপ</label>
  //         <select
  //           {...register("bloodGroup", { required: true })}
  //           className="w-full border bg-gray-300 p-2 rounded-md"
  //         >
  //           <option value="">রক্তের গ্রুপ নির্বাচন করুন</option>
  //           {bloodGroups.map((bg, i) => (
  //             <option key={i} value={bg}>
  //               {bg}
  //             </option>
  //           ))}
  //         </select>
  //         {errors.bloodGroup && (
  //           <p className="text-red-500">রক্তের গ্রুপ প্রয়োজন।</p>
  //         )}
  //       </div>

  //       {/* Donation Date */}
  //       <div>
  //         <label className="block font-medium">ডোনেশন তারিখ</label>
  //         <input
  //           type="date"
  //           {...register("donationDate", { required: true })}
  //           className="w-full border bg-gray-300 p-2 rounded-md"
  //         />
  //         {errors.donationDate && (
  //           <p className="text-red-500">তারিখ প্রয়োজন।</p>
  //         )}
  //       </div>

  //       {/* Donation Time */}
  //       <div>
  //         <label className="block font-medium">ডোনেশন সময়</label>
  //         <input
  //           type="time"
  //           {...register("donationTime", { required: true })}
  //           className="w-full border bg-gray-300 p-2 rounded-md"
  //         />
  //         {errors.donationTime && <p className="text-red-500">সময় প্রয়োজন।</p>}
  //       </div>

  //       {/* Request Message */}
  //       <div>
  //         <label className="block font-medium">রিকোয়েস্ট মেসেজ</label>
  //         <textarea
  //           {...register("requestMessage", { required: true })}
  //           rows="4"
  //           className="w-full border bg-gray-300 p-2 rounded-md"
  //           placeholder="কেন রক্তের প্রয়োজন তা বিস্তারিত লিখুন"
  //         ></textarea>
  //         {errors.requestMessage && (
  //           <p className="text-red-500">রিকোয়েস্ট মেসেজ প্রয়োজন।</p>
  //         )}
  //       </div>

  //       {/* Submit Button */}
  //       <div className="text-right">
  //         <button
  //           type="submit"
  //           className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
  //         >
  //           Make A Donation Request
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );
};

export default CreateDonationRequest;

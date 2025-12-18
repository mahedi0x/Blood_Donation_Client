import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ManageDonationRequest = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  //get the donation request details using the id param and allow admin to manage it
  const { data: realData = {} } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    },
  });
  const {
    recipientName,
    recipientDistrict,
    recipientUpazila,
    hospitalName,
    fullAddress,
    donationStatus,
  } = realData || {};
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (realData && Object.keys(realData).length > 0) {
      reset({
        recipientName: realData.recipientName,
        recipientDistrict: realData.recipientDistrict,
        recipientUpazila: realData.recipientUpazila,
        hospitalName: realData.hospitalName,
        fullAddress: realData.fullAddress,
      });
    }
  }, [realData, reset]);

  //update request data
  const onSubmit = (data) => {
    const updatedInfo = {
      recipientName: data.recipientName,
      recipientDistrict: data.recipientDistrict,
      recipientUpazila: data.recipientUpazila,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      donationStatus: donationStatus,
    };
    console.log("eije data", updatedInfo);
    axiosSecure
      .patch(`/update-donation-request/${id}`, updatedInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Requested Data Updated");
        }
      });
  };
  return (
    <div
      className={`min-h-screen bg-linear-to-b from-red-400  to-red-300 flex items-center justify-center px-4`}
    >
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-8">
        <h2 className="text-3xl font-semibold text-center text-red-600 mb-8">
          Edit Donation Request
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* recipientName */}
            <div className="flex flex-col">
              <label className="label font-medium">Recipient Name</label>
              <input
                type="text"
                defaultValue={recipientName}
                {...register("recipientName")}
                className="input input-bordered w-full focus:border-red-500"
                placeholder="Recipient Name"
              />
            </div>

            {/* recipientDistrict */}
            <div className="flex flex-col">
              <label className="label font-medium">Recipient District</label>
              <input
                type="text"
                defaultValue={recipientDistrict}
                {...register("recipientDistrict")}
                className="input input-bordered w-full focus:border-red-500"
                placeholder="Recipient District"
              />
            </div>

            {/* recipientUpazila */}
            <div className="flex flex-col">
              <label className="label font-medium">Recipient Upazila</label>
              <input
                type="text"
                defaultValue={recipientUpazila}
                {...register("recipientUpazila")}
                className="input input-bordered w-full focus:border-red-500"
                placeholder="Recipient Upazila"
              />
            </div>

            {/* hospitalName */}
            <div className="flex flex-col">
              <label className="label font-medium">Hospital Name</label>
              <input
                type="text"
                defaultValue={hospitalName}
                {...register("hospitalName")}
                className="input input-bordered w-full focus:border-red-500"
                placeholder="Hospital Name"
              />
            </div>

            {/* fullAddress - full width */}
            <div className="flex flex-col md:col-span-2">
              <label className="label font-medium">Full Address</label>
              <input
                type="text"
                defaultValue={fullAddress}
                {...register("fullAddress")}
                className="input input-bordered w-full focus:border-red-500"
                placeholder="Full Address"
              />
            </div>

            {/* submit */}
            <div className="md:col-span-2 flex justify-center">
              <button className="btn btn-error px-10 mt-4 text-lg text-white">
                Update Request
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>

    // ------------
    // <div>
    //   <h2 className="text-2xl font-semibold mb-4">Edit Donation Request</h2>
    //   {/* --------------------------------------------- */}
    //   <form
    //     onSubmit={handleSubmit(onSubmit)}
    //     className="flex items-center justify-center"
    //   >
    //     <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    //       {/* recipientName */}
    //       <label className="label">recipientName</label>
    //       <input
    //         type="text"
    //         defaultValue={recipientName}
    //         {...register("recipientName")}
    //         className="input"
    //         placeholder="recipientName"
    //       />
    //       {/* recipientDistrict */}
    //       <label className="label">recipientDistrict</label>
    //       <input
    //         type="text"
    //         defaultValue={recipientDistrict}
    //         {...register("recipientDistrict")}
    //         className="input"
    //         placeholder="recipientDistrict"
    //       />
    //       {/* recipientUpazila */}
    //       <label className="label">recipientUpazila</label>
    //       <input
    //         type="text"
    //         defaultValue={recipientUpazila}
    //         {...register("recipientUpazila")}
    //         className="input"
    //         placeholder="recipientUpazila"
    //       />

    //       {/* hospitalName */}
    //       <label className="label">hospitalName</label>
    //       <input
    //         type="text"
    //         defaultValue={hospitalName}
    //         {...register("hospitalName")}
    //         className="input"
    //         placeholder="hospitalName"
    //       />
    //       {/* fullAddress */}
    //       <label className="label">fullAddress</label>
    //       <input
    //         type="text"
    //         defaultValue={fullAddress}
    //         {...register("fullAddress")}
    //         className="input"
    //         placeholder="fullAddress"
    //       />

    //       <button className="btn btn-neutral mt-4">Submit</button>
    //     </fieldset>
    //   </form>
    // </div>
  );
};

export default ManageDonationRequest;

import React from 'react';
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";

const DonorSearch = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, control } = useForm(); //এখানে এর ভূমিকা সব থেকে বেশি react hook form
    const [donors, setDonors] = useState([]);
    const realData = useLoaderData();
    //   console.log("realdata", realData);
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
  
    const selectedDistrict = useWatch({ control, name: "district" });
  
    const upazilaByDistrictId = (districtId) => {
      const districtUpazilas = upazilas.filter(
        (u) => u.district_id === districtId
      );
      const upazilasName = districtUpazilas.map((u) => u.name);
      return upazilasName;
    };
  
    const onSearch = async (data) => {
      const districtName = realData.find((d) => d.id === data.district);
  
      try {
        const res = await axiosSecure.get("/search-donors", {
          params: {
            bloodGroup: data.bloodGroup,
            district: districtName?.name,
            upazila: data.upazila,
            role: "donor",
          },
        });
        setDonors(res.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    return (
        <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-5">Search Blood Donors</h2>
  
        {/* Search Form */}
        <form
          onSubmit={handleSubmit(onSearch)}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-100 p-4 rounded-lg"
        >
          {/* Blood Group */}
          <select {...register("bloodGroup")} className="border p-2 rounded">
            <option value="">Select Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
  
          {/* District */}
          <select
            {...register("district", { required: true })}
            className="w-full border p-2 rounded-md"
            defaultValue="pick a District"
          >
            <option disabled={true} value="pick a District">
              Select District
            </option>
            {realData.map((d, i) => (
              <option key={i} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
  
          {/* Upazila */}
          <select
            {...register("upazila", { required: true })}
            className="border p-2 rounded"
            defaultValue="Pick a Upazila"
            placeholder="Upazila"
          >
            <option value="pick a Upazila">Select Upazila</option>
            {upazilaByDistrictId(selectedDistrict).map((u, i) => (
              <option key={i} value={u}>
                {u}
              </option>
            ))}
          </select>
  
          {/* Search Button */}
          <button className="btn bg-red-500 text-white py-2 rounded hover:bg-red-600">
            Search
          </button>
        </form>
  
        {/* Donors List */}
        <div className="mt-8">
          {donors.length === 0 ? (
            <p className="text-gray-500 text-center">
              No donors found. Search to see results.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {donors.map((donor) => (
                <div key={donor._id} className="shadow p-4  rounded">
                  <h3 className="font-bold text-lg">{donor.name}</h3>
                  <p>Blood Group: {donor.bloodGroup}</p>
                  <p>District: {donor.district}</p>
                  <p>Upazila: {donor.upazila}</p>
                  <p>Email: {donor.email}</p>
                  <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
                    Contact Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
};

export default DonorSearch;
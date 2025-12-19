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
        <div>
            <h2>Donation search page..</h2>
        </div>
    );
};

export default DonorSearch;
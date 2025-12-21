import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  //1. First get the all doctors from the context file.
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  // 2. After that create one state variable where we will store doctors data.
  const [relDoc, setRelDoc] = useState([]);
  console.log(relDoc);
  // 3. After that in parameters we passing props.
  // Now using both props filter the related doctors and store in the "relDoc" state variable.
  // 4.
  useEffect(() => {
    // first check if doctors length greater than 0 and also check specality
    if (doctors.length > 0 && speciality) {
      // then store in one variable
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id != docId
      );
      // doc.speciality===speciality ->>>> Here we are checking if doc.specilaty === specility that we are getting from the props then we are going to store this doctors in " doctorsData" variable.
      //We already open doctor profile so expect of those id , we need to display other doctors. So we can write " && doc._id!=docId" , this one. In that case current doctor removed from the doctors data.

      // After that we need to set "doctorsData" in our "relDoc" state variable.
      setRelDoc(doctorsData);
      // After that check in console.
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 ">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Discover the most trusted and experienced doctors available for online
        appointment booking
      </p>

      <div className="w-full custom-grid  grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appoinment/${item._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="border border-blue-300 rounded-2xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img className="bg-blue-100 w-full" src={item.image} alt="doc" />
            <div className="p-4">
              {/* <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div> */}
                <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.available ? "text-green-500" : "text-red-500"
                } `}
              >
                <p
                  className={`w-2 h-2 ${
                    item.available ? "bg-green-500" : "bg-red-500"
                  } rounded-full`}
                ></p>
                {/* <p>Available</p> */}
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-100 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        More
      </button>
    </div>
  );
};

export default RelatedDoctors;

import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets_admin/assets";

const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } =
    useContext(AdminContext);
  console.log(dashData);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-300 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>

          {/* ano */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-300 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointmemts}
              </p>
              <p className="text-gray-400">Appointmemts</p>
            </div>
          </div>
          {/* ano */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-300 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    )
  );
};

export default Dashboard;

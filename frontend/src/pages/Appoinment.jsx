import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appoinment = () => {
  const { docId } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  // console.log(docInfo);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const navigate = useNavigate();

  // Doctor slot logic
  //1.
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  // So, here we created three state variables, where we are going to store these all Slots data and we are going to calculate using the function.

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);

    setDocInfo(docInfo);
  };

  //2.  To calculate slot data logic
  const getAvailableSlots = async () => {
    // In this function we will write the logic to calculate the available slots of the particular doctor.

    // First we have to clear the previous slot.
    setDocSlots([]);

    // getting current date.
    let today = new Date(); // This is called Data constructor.
    // by using "today" variable we will calculate date from seven date from today.
    for (let i = 0; i < 7; i++) {
      // getting date with index.
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      // (today.getDate()+i) - by using this we will get future 7 day date from now(today).

      // setting and time of the date with index.
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      // (today.getDate()+ i) - By using this we will get different Date with different end time.
      endTime.setHours(21, 0, 0, 0);
      // three 0 means, hours, mint, and second.

      // setting hours.
      if (today.getDate() === currentDate.getDate()) {
        // today.getDate()=== currentDate.getDate() - we are in the current date.
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        // if currentDate.getHours() > 10 then our currentDate and hours (currentDate.getHours() + 1) will get started from current hours + 1, else we are going to use 10.

        //  after that set the minute also.
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0); // by using this we will get 30 minute intervals.
      } else {
        // if date is not today, it means we are in futures date.
        // so here we will start the hour from 10'o clock.
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      // After that add while loop
      // store data
      let timeSlots = [];
      while (currentDate < endTime) {
        //if our cuttent date is less the end time then we are going to create slot every 30 minutes intervals.
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Logic to hidden booked slot
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        // so in this while loop we created these variables so if our current date will be changed then in case here we will check doctor has book any slot on these date or not if it book then we will not push those date in the timeSlots array.
        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;
        //After that check doctor data
        const isSlotAvailable =
          docInfo?.slots_booked[slotDate] &&
          docInfo?.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;
        // docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) - If both statement is true then in that case we will not add in slotTime , and any of these satement were false then we will know slot is available that why we provided true.

        if (isSlotAvailable) {
          // store this data in the variable
          //add slot to array.
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // After saving the time and date we will increment time by 30 minute
        // Increment current time by 30 minute.
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      // When the while loop ended in that case we will save the time slots.
      setDocSlots((prev) => [...prev, timeSlots]);
      // now our function is ready to create slots.
    }
  };

  // Function for book appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    try {
      // First we will store the selected date in the date variable
      const date = docSlots[slotIndex][0].datetime;
      const day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      //After getting the day, month, year, we will create the different format.
      const slotDate = day + "_" + month + "_" + year;
      //console.log(slotDate) // in console we get this ->  7_12_2025
      // After  that make the API call
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      console.log(data);

      //After that add the check
      if (data.success) {
        toast.success(data.message);
        //After that we need to fetch the doctor data again, so doctor data will get upated.
        getDoctorsData();
        //Doing above thing we successfully book the appointment
        //Then we need to render user to the "my appointment" page.
        navigate("/my-appoinment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  // 3.
  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]); // so whenever docInfo get updated or change then our "getAvailableSlots" will be excauted.

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <div>
        {/* ---- Doctor Details -------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            {/* img */}
            <img
              className="bg-[var(--color-primary)] sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt="img"
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* Doctor info -   name, degree, exp */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            {/* Doctor about */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol} {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
        {/* ---------------- Booking slots section ------------ */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-[var(--color-primary)] text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  {/*here we will check, if item[0] is available then we will display  daysOfWeek and datetime */}
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  {/* if item[0] is available then we will display  */}
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          {/* display time section */}
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {
              //  docSlots.length &&  - if this is avaliable then next do process
              docSlots.length &&
                docSlots[slotIndex].map((item, index) => (
                  <p
                    onClick={() => setSlotTime(item.time)}
                    className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                      item.time === slotTime
                        ? "bg-[var(--color-primary)] text-white"
                        : "text-gray-400 border border-gray-300 "
                    }`}
                    key={index}
                  >
                    {item.time.toLowerCase()}
                  </p>
                ))
            }
          </div>
          {/* button */}
          <button
            onClick={bookAppointment}
            className="bg-[var(--color-primary)] text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book an appointment
          </button>
        </div>
        {/* Booking slot end here  */}
        {/* Listing Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appoinment;

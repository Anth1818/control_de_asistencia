import { useState, useEffect } from "react";
import { date } from "../utils/date";
import configApi from "../api/configApi";

const useWorker = (workerIdentity, searchWorkerBtn, checkInBtn, checkOutBtn, setSearchWorkerBtn) => {
  const [worker, setWorker] = useState(null);
  const [loader, setLoader] = useState(false);
  const [checkInSuccess, setCheckInSuccess] = useState(false);
  const [checkOutSuccess, setCheckOutSuccess] = useState(false);

  const apiEndPointGetWorkerByid = configApi.apiBaseUrl + configApi.endpoints.searchWorkerById;
  const apiEndPointGetAttendance = configApi.apiBaseUrl + configApi.endpoints.getAttendance;

  const handleSearchWorker = (e) => {
    e.preventDefault();
    if (workerIdentity.trim() === '') {
      console.error('Worker identity is empty');
      return;
    }
    setSearchWorkerBtn(false); // Reset the state before setting it to true
    setSearchWorkerBtn(true);
  };

  useEffect(() => {
    if (workerIdentity && searchWorkerBtn) {
      setLoader(true);
      fetch(`${apiEndPointGetWorkerByid}/${workerIdentity}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.ok && response.json())
        .then((data) => setWorker(data.data[0]))
        .catch((error) => console.error("Error:", error))
        .finally(() => {
          setSearchWorkerBtn(false);
          setLoader(false);
        });
    }
  }, [searchWorkerBtn]);

  useEffect(() => {
    if (checkInBtn) {
      fetch(apiEndPointGetAttendance, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: worker?.worker_id }),
      })
        .then((response) => response.ok && response.json())
        .then((data) => {
          setCheckInSuccess(true);
          setWorker({
            ...worker,
            date_attendance_string: date,
            date_attendance: date,
            check_in_string: data.data.check_in_string,
          });
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [checkInBtn]);

  useEffect(() => {
    if (checkOutBtn && !worker?.check_out) {
      fetch(apiEndPointGetAttendance, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: worker.worker_id }),
      })
        .then((response) => response.ok && response.json())
        .then((data) => {
          setCheckOutSuccess(true);
          setWorker({
            ...worker,
            check_out_string: data.data.check_out_string,
          });
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [checkOutBtn]);

  useEffect(() => {
    if (checkInSuccess) {
      const timer = setTimeout(() => setCheckInSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [checkInSuccess]);

  useEffect(() => {
    if (checkOutSuccess) {
      const timer = setTimeout(() => setCheckOutSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [checkOutSuccess]);

  return { worker, loader, checkInSuccess, checkOutSuccess, handleSearchWorker };
};

export default useWorker;
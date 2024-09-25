import { useState, useEffect } from "react";
import { toNumber } from "lodash";
import configApi from "../api/configApi";
import convertDateFormat from "../utils/convertDateFormat";

const useAttendance = (dataInitial, applyFilter, pageDB, filterId, date_start, date_end, department, holdResults, setApplyFilter, setHoldResults) => {
    const [attendance, setAttendance] = useState([]);
    const [dateNoValid, setDateNoValid] = useState(false);
    const [disabledBtnNewResults, setDisabledBtnNewResults] = useState(true);
    const [disableHoldResults, setDisableHoldResults] = useState(false);

    const apiEndPointGetAttendanceByFilter = `${configApi.apiBaseUrl}${configApi.endpoints.getAttendanceByfilter}${pageDB}/lim/${1000}`;

    useEffect(() => {
        setAttendance(dataInitial);
    }, [dataInitial]);

    useEffect(() => {
        if (applyFilter || pageDB > 1) {
            const data = {
                date_start,
                date_end,
                department,
                ic: toNumber(filterId),
                dateStartMilliseconds: new Date(
                    convertDateFormat(date_start)
                ).getTime(),
                dateEndMilliseconds: new Date(convertDateFormat(date_end)).getTime(),
            };
            console.log(data);
            fetch(apiEndPointGetAttendanceByFilter, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((error) => {
                            setDateNoValid(true);
                            throw new Error(error.error);
                        });
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data.data);
                    setAttendance(data.data);
                    // Verificar si se deben habilitar nuevos resultados
                    if (holdResults) {
                        console.log(data.data.length);
                        const combinedData = [...attendance, ...data.data];
                        const uniqueData = combinedData.filter((item, index) => {
                            return (
                                combinedData.findIndex((item2) => item2.id === item.id) ===
                                index
                            );
                        });
                        setAttendance(uniqueData);
                    }
                    if (data.data.length >= 1000) {
                        setDisabledBtnNewResults(false);
                        setHoldResults(true);
                        setDisableHoldResults(true);
                    } else {
                        setDisabledBtnNewResults(true);

                        console.log("Success:", data);
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setApplyFilter(false);
                });
        }
    }, [applyFilter, pageDB]);

    return { attendance, dateNoValid, disabledBtnNewResults, disableHoldResults, setDateNoValid, setAttendance, setDisabledBtnNewResults, setDisableHoldResults };
};

export default useAttendance;
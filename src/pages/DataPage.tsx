import React, { useState, useEffect } from "react";
import "./DashboardPage.css";
import Graph from "../components/Graph";
import { SensorType, SENSOR_SYMBOL, StatusType, SENSOR_ENDPOINT } from "../types/SensorTypeEnums";
import { useParams, useNavigate } from "react-router-dom";
import { DataPanel } from "../components/DataPanel";
import { ObservationPanel } from "../components/ObservationPanel";
import BackArrow from "../assets/BackArrow.svg";
import { fetchJson, ApiError } from "../utils/FetchUtil";
import { dateToSqlTimestamp } from "../utils/SQLUtils";
import { GenericData, SensorDataResponseType } from "../types/JSONTypes";
import { getUser } from "../utils/AuthStore";
import { MessagePopup, MessageType } from "../components/MessagePopup";
import { useCacheStore } from "../utils/CacheHandler";
import { useSettingsStore } from "../utils/SettingsStore";

/**
 * THIS PAGE IS A CATCHALL FOR EVERY SINGLE DATA PAGE WE HAVE
 * TEMPERATURE, HUMIDITY, VOLUME, ETC
 *
 * MUST PASS IN SENSORTYPE PROP, AND THEN THE API CALL SHOULD BE MADE BASED ON THAT
 */

interface DataPageProps {
    sensorType: SensorType;
}

const DataPage = ({ sensorType }: DataPageProps) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user] = useState(getUser());
    const [error, setError] = useState("");
    const [startDate, setStartDate] = useState<Date>(() => {
        const d = new Date(2026, 3, 1);
        d.setHours(0, 0, 0, 0);
        return d;
    });
    const [endDate, setEndDate] = useState<Date>(() => {
        const d = new Date(2026, 3, 14);
        d.setHours(23, 59, 59, 999);
        return d;
    });
    const [data, setData] = useState<any[]>([]);
    const { getCache } = useCacheStore();
    const { celsius } = useSettingsStore();

    function getResponseDataKey(currentSensorType: SensorType): string {
        if (currentSensorType === SensorType.CARBON_DIOXIDE) {
            return "Carbon_Dioxide_Data";
        }
        return `${currentSensorType}_Data`;
    }

    function getRecordValueKey(currentSensorType: SensorType): string {
        if (currentSensorType === SensorType.CARBON_DIOXIDE) {
            return "Carbon_Dioxide";
        }
        return String(currentSensorType);
    }

    function getOutsideValueKey(currentSensorType: SensorType): string {
        if (currentSensorType === SensorType.CARBON_DIOXIDE) {
            return "Outside_Carbon_Dioxide";
        }
        return `Outside_${currentSensorType}`;
    }

    function getDisplayTitle(currentSensorType: SensorType): string {
        if (currentSensorType === SensorType.CARBON_DIOXIDE) {
            return "Beehive CO₂";
        }
        return `Beehive ${currentSensorType}`;
    }

    function getCurrentPanelTitle(currentSensorType: SensorType): string {
        if (currentSensorType === SensorType.CARBON_DIOXIDE) {
            return "Current CO₂";
        }
        return `Current ${currentSensorType}`;
    }

    function getDataFromRange(startDate: Date, endDate: Date) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (startDate > endDate) {
            setError("ERROR: Start date must be before end date.");
            return;
        }

        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        if (endDate > endOfToday) {
            setError("ERROR: End date cannot be in the future.");
            return;
        }

        if (startDate.getTime() === endDate.getTime()) {
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
        }

        setStartDate(start);
        setEndDate(end);
        setError("");
        fetchDataFromRange(start, end);
    }

    function fetchDataFromRange(startDate: Date, endDate: Date) {
        console.log("Fetching data for range:\n", startDate, "\n", endDate);

        fetchJson<SensorDataResponseType>(SENSOR_ENDPOINT[sensorType], {
            method: "POST",
            body: {
                Hive_ID: id,
                StartDate: dateToSqlTimestamp(startDate),
                EndDate: dateToSqlTimestamp(endDate),
                User: {
                    User_ID: user?.userID,
                    Organization_ID: user?.organizationID,
                },
            },
        })
            .then((response) => {
                const responseDataKey = getResponseDataKey(sensorType);
                const recordValueKey = getRecordValueKey(sensorType);
                const outsideValueKey = getOutsideValueKey(sensorType);

                const genericDataRaw = (response as Record<string, unknown>)[responseDataKey];
                const genericData = Array.isArray(genericDataRaw) ? (genericDataRaw as GenericData[]) : undefined;

                if (!genericData) {
                    console.log("sensorType:", sensorType);
                    console.log("responseDataKey:", responseDataKey);
                    console.log("response:", response);
                    setData([]);
                    setError(`No data returned for ${sensorType}.`);
                    return;
                }

                const fetchedData = genericData.map((entry: GenericData) => {
                    const record = entry as Record<string, number | string | undefined>;

                    const mainValueRaw = record[recordValueKey];
                    const outsideValueRaw = record[outsideValueKey];

                    const mainValue =
                        mainValueRaw === undefined || mainValueRaw === null || mainValueRaw === ""
                            ? null
                            : Number(mainValueRaw);

                    const outsideValue =
                        outsideValueRaw === undefined || outsideValueRaw === null || outsideValueRaw === ""
                            ? null
                            : Number(outsideValueRaw);

                    return {
                        TimeStamp: record["TimeStamp"],
                        [recordValueKey]: Number.isNaN(mainValue) ? null : mainValue,
                        [outsideValueKey]: Number.isNaN(outsideValue) ? null : outsideValue,
                    };
                });

                console.log(fetchedData);
                setData(fetchedData);
            })
            .catch((err: ApiError) => {
                setData([]);

                if (err.status === 400) {
                    setError("400: There is no data for inputted range");
                } else {
                    setError(err.message);
                }
            });
    }

    const tempObservations = [
        {
            Observation_ID: "1",
            Tags: [],
            Description:
                "The hive's temperature is holding steady around 95°F, which tells me the colony is regulating the brood nest well. I’ve noticed plenty of bright yellow and orange pollen coming in, suggesting a strong forage nearby and healthy brood rearing. Toward late afternoon, some bearding forms on the landing board — likely just the bees cooling off and ventilating the hive in the warm weather.",
            TimeStamp: "2024-06-15T14:00:00Z",
        },
        {
            Observation_ID: "2",
            Tags: [],
            Description:
                "The hive's temperature is holding steady around 95°F, which tells me the colony is regulating the brood nest well. I’ve noticed plenty of bright yellow and orange pollen coming in, suggesting a strong forage nearby and healthy brood rearing. Toward late afternoon, some bearding forms on the landing board — likely just the bees cooling off and ventilating the hive in the warm weather.",
            TimeStamp: "2024-06-15T13:30:00Z",
        },
    ];

    const title = getDisplayTitle(sensorType);
    const recordValueKey = getRecordValueKey(sensorType);

    const dataPanelRowStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        gap: "1em",
        justifyContent: "space-between",
    };

    useEffect(() => {
        console.log("Cache data for hive " + id + ": ", getCache(String(id)));

        const defaultStart = new Date(2026, 3, 1);
        defaultStart.setHours(0, 0, 0, 0);

        const defaultEnd = new Date(2026, 3, 14);
        defaultEnd.setHours(23, 59, 59, 999);

        getDataFromRange(defaultStart, defaultEnd);
    }, [id, sensorType]);

    const backToDashboard = () => {
        navigate("/", { replace: true });
    };

    function getSortedData() {
        if (!data || data.length === 0) return [];

        return [...data].sort(
            (a, b) => new Date(a.TimeStamp).getTime() - new Date(b.TimeStamp).getTime()
        );
    }

    function getCurrentReading() {
        const sorted = getSortedData();
        if (sorted.length === 0) return null;
        return sorted[sorted.length - 1];
    }

    function getDataTrend() {
        const sorted = getSortedData();
        if (sorted.length === 0) return 0;

        const values = sorted
            .map((entry: any) => parseFloat(entry[recordValueKey]))
            .filter((value: number) => !Number.isNaN(value));

        if (values.length === 0) return "No data selected";

        const firstValue = values[0];
        const lastValue = values[values.length - 1];
        const trend = (lastValue - firstValue).toFixed(1);

        return parseFloat(trend) >= 0 ? `+${trend}` : `${trend}`;
    }

    return (
        <div>
            <div className="data-page-responsive">
                <div>
                    <div
                        style={{ display: "flex", alignItems: "center", gap: "0.5em", marginBottom: "1em", cursor: "pointer" }}
                        onClick={backToDashboard}
                    >
                        <img src={BackArrow} alt="Back to Dashboard" />
                        <p>Back to Dashboard</p>
                    </div>
                    <h1 style={{ fontWeight: 600, fontSize: "clamp(1.8rem, 4vw, 3rem)", margin: 0 }}>{title}</h1>
                </div>

                <div style={dataPanelRowStyle}>
                    <DataPanel
                        title={getCurrentPanelTitle(sensorType)}
                        dataSnapshot={getCurrentReading()?.[recordValueKey] ?? "--"}
                        unit={SENSOR_SYMBOL[sensorType]}
                        lastUpdated={`Last updated ${getCurrentReading()?.TimeStamp
                            ? new Date(getCurrentReading().TimeStamp).toLocaleTimeString()
                            : "N/A"
                            }`}
                        status={StatusType.NORMAL}
                    />

                    <DataPanel
                        title="Trend"
                        dataSnapshot={getDataTrend()}
                        unit={SENSOR_SYMBOL[sensorType]}
                    />
                </div>

                <div>
                    <ObservationPanel observations={tempObservations} sensorType={sensorType} />
                </div>

                <div>
                    <Graph
                        title={sensorType}
                        dataObject={data}
                        dateRange={{ start: startDate, end: endDate }}
                        sensorType={sensorType}
                        getDateRange={getDataFromRange}
                        allowDateSelection={true}
                    />
                </div>
            </div>

            {error && <MessagePopup type={MessageType.ERROR} message={error} onClose={() => setError("")} />}
        </div>
    );
};

export { DataPage };
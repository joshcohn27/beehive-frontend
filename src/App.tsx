import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { DashboardPage } from "./pages/DashboardPage";
import { DataPage } from "./pages/DataPage";
import { SensorType } from "./types/SensorTypeEnums";
import { SettingsPage } from "./pages/SettingsPage";
import { InspectionPage } from "./pages/InspectionPage";
import { ObservationPage } from "./pages/ObservationPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/landing" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Navigate to="/" replace />} />

        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/temperature/:id"
          element={<DataPage sensorType={SensorType.TEMPERATURE} />}
        />
        <Route
          path="/humidity/:id"
          element={<DataPage sensorType={SensorType.HUMIDITY} />}
        />
        <Route
          path="/carbondioxide/:id"
          element={<DataPage sensorType={SensorType.CARBON_DIOXIDE} />}
        />
        <Route
          path="/weight/:id"
          element={<DataPage sensorType={SensorType.WEIGHT} />}
        />
        <Route
          path="/volume/:id"
          element={<DataPage sensorType={SensorType.VOLUME} />}
        />
        <Route path="/inspections/:id" element={<InspectionPage />} />
        <Route path="/observations/:id" element={<ObservationPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
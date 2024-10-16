import { BrowserRouter, Routes, Route } from "react-router-dom";
import ZonePrivate from './componentes/zone_app/zonePrivate';
import ZonePublic from './componentes/zone_app/zonePublic';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ZonePublic />}></Route>
          <Route path="radica-solicitud" element={<ZonePublic />} />
          <Route path="privateZone" element={<ZonePrivate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

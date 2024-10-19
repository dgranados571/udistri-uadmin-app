import { BrowserRouter, Routes, Route } from "react-router-dom";
import ZonePrivate from './componentes/zone_app/zonePrivate';
import RadicaSolitudIndex from "./componentes/zone_app/radicaSolitudIndex";
import LoginIndex from "./componentes/zone_app/loginIndex";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RadicaSolitudIndex />}></Route>
          <Route path="radica-solicitud" element={<RadicaSolitudIndex />} />
          <Route path="login" element={<LoginIndex />} />
          <Route path="privateZone" element={<ZonePrivate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

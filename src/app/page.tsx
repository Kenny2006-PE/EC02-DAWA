import Navbar from "./components/Navbar";
import MedicamentosTable from "./components/MedicamentosTable";
import TiposMedicamentoTable from "./components/TiposMedicamentoTable";


export default function Home() {
  return (
    <>
      <Navbar />
      <MedicamentosTable />
      <TiposMedicamentoTable />
    </>
  );
}
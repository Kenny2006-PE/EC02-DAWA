import Navbar from "../components/Navbar";
type TipoMedic = {
  CodTipoMed: number;
  descripcion: string;
};

type Medicamento = {
  CodMedicamento: number;
  descripcionMed: string;
  presentacion: string;
  stock: number;
  precioVentaUni: number;
  marca: string;
  tipoMedic: TipoMedic;
};

async function getMedicamentos(): Promise<Medicamento[]> {
  const res = await fetch("http://localhost:3000/api/medicamento", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const medicamentos = await getMedicamentos();

  return (
    <>
      <Navbar />
      <main style={{ padding: 32 }}>
        <h2>Lista de Medicamentos</h2>
        {medicamentos.length === 0 ? (
          <p>No hay medicamentos registrados.</p>
        ) : (
          <table border={1} cellPadding={8} cellSpacing={0}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Presentación</th>
                <th>Stock</th>
                <th>Precio Unitario</th>
                <th>Marca</th>
                <th>Tipo de Medicamento</th>
              </tr>
            </thead>
            <tbody>
              {medicamentos.map((med) => (
                <tr key={med.CodMedicamento}>
                  <td>{med.CodMedicamento}</td>
                  <td>{med.descripcionMed}</td>
                  <td>{med.presentacion}</td>
                  <td>{med.stock}</td>
                  <td>{med.precioVentaUni}</td>
                  <td>{med.marca}</td>
                  <td>{med.tipoMedic?.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
// pages/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState([]);

  // Função para buscar tipos de veículos
  const fetchVehicleTypes = async () => {
    const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
    const data = await response.json();
    setVehicleTypes(data.Results);
  };

  // Buscar tipos de veículos ao montar o componente
  useEffect(() => {
    fetchVehicleTypes();
  }, []);

  // Verifica se o botão "Next" deve estar habilitado
  const isNextButtonDisabled = !selectedType || !selectedYear;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Filtro de Veículos</h1>
      <div className="mb-4">
        <label htmlFor="vehicle-type" className="block text-sm font-medium text-gray-700">Tipo de Veículo</label>
        <select
          id="vehicle-type"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Selecione um tipo</option>
          {vehicleTypes.map((type) => (
            <option key={type.Name} value={type.Name}>{type.Name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="model-year" className="block text-sm font-medium text-gray-700">Ano do Modelo</label>
        <select
          id="model-year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Selecione um ano</option>
          {Array.from({ length: new Date().getFullYear() - 2014 }, (_, i) => 2015 + i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <Link href={`/result/${selectedType}/${selectedYear}`}>
        <a>
          <button
            disabled={isNextButtonDisabled}
            className={`bg-blue-500 text-white py-2 px-4 rounded ${isNextButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            Próximo
          </button>
        </a>
      </Link>
    </div>
  );
}

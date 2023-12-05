import { useState, useEffect } from "react"
import Error from "./Error";

function Formulario({ pacientes, setPacientes, paciente, setPaciente }) {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {

    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }

  }, [paciente])

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36)

    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //validacion del formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log('Alguno vacio')

      setError(true);
      return;
    }
    setError(false);

    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if(paciente.id){
      //Editar registro
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
      setPacientes(pacientesActualizados)
      setPaciente({})

    }else{
      //Agregar Registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente])
    }


    //Reiniciar Form

    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y {''} <span className="text-indigo-600 font-bold">Administralos</span></p>

      <form onSubmit={handleSubmit} autoComplete="off" className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" action="">
        {error && <Error> <p>Todos los campos son obligatorios</p> </Error>}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input onChange={(e) => setNombre(e.target.value)} value={nombre} id="mascota" type="text" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre de la mascota" />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input onChange={(e) => setPropietario(e.target.value)} value={propietario} id="propietario" type="text" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre del Propietario" />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} value={email} id="email" type="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Email contacto propietario" />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
          <input onChange={(e) => setFecha(e.target.value)} value={fecha} id="alta" type="date" className="border-2 w-full p-2 mt-2 rounded-md" />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
          <textarea placeholder="Describe los sintomas" id="sintomas" className="border-2 w-full p-2 mt-2 rounded-md"
            onChange={(e) => setSintomas(e.target.value)} value={sintomas}
          ></textarea>
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={paciente.id ? 'Editar paciente': 'Agregar Paciente'}
        />
      </form>
    </div>
  )
}

export default Formulario
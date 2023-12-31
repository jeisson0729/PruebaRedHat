﻿import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react"
import ModalTarea from "./componentes/ModalTarea"
// import { Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, ModalFooter, Button } from "reactstrap"



const App = () => {

    //1.- Crear useState
    const [tareas, setTareas] = useState([]);

    //7.- Crear useState descripcion
    const [descripcion, setDescripcion] = useState("");

    const [estado, setEstado] = useState("");

    const [busqueda, setBusqueda] = useState("");

    const [filtroEstado, setFiltroEstado] = useState("Todas"); 

    const [tareasFiltradas, setTareasFiltradas] = useState([]);


    const [editar, setEditar] = useState(null);
    

    const [mostrarModal, setMostrarModal] = useState(false);





    //2.- Metodo Obtener
    const mostrarTareas = async () => {

        const response = await fetch("api/tarea/Lista");

        if (response.ok) {
            const data = await response.json();
            setTareas(data)
        } else {
            console.log("status code:" + response.status)
        }

    }
    

    //4.- Insertar datos
    useEffect(() => {
        mostrarTareas();
    }, [])




    //Guardar Tarea A La BD 
    const guardarTarea = async (e) => {


        const response = await fetch("api/tarea/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                descripcion: descripcion,
                estado: estado
            })
        })

        if (response.ok) {
            setDescripcion("");
            await mostrarTareas();
        }
    }


    const editarTarea = async (tarea) => {

        const response = await fetch("api/tarea/Editar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(tarea)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal); 
            mostrarTareas();
        }
    }

    //Seccion Eliminar Tarea De La BD y De La Lista
    const cerrarTarea = async (id) => {

        const response = await fetch("api/tarea/Cerrar/" + id, {
            method: "DELETE"
        })

        if (response.ok)
            await mostrarTareas();
    }

    // Conversion De Fecha
    const formatDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = new Date(string).toLocaleDateString("es-PE", options);
        let hora = new Date(string).toLocaleTimeString();
        return fecha + " | " + hora
    }

    const filtrarTareas = (busqueda) => {
        const tareasFiltradas = tareas.filter((tarea) => {
            return tarea.descripcion.toLowerCase().includes(busqueda.toLowerCase());
        });
        setTareasFiltradas(tareasFiltradas);
    };

    const filtrarTareasPorEstado = (estado) => {
        if (estado === "Todas") {
            setTareasFiltradas(tareas);
        } else {
            const tareasFiltradas = tareas.filter((tarea) => tarea.estado === estado);
            setTareasFiltradas(tareasFiltradas);
        }
    };

    
          
    
    





        return (
            //5.- Dise�ar pagina
            /*
             <div className="container bg-dark p-4 vh-100">
                
                <h2 className="text-white">Lista de tareas</h2>
                <div className="row">
                    <div className="col-sm-12"></div>
                </div>
               
                <div className="row mt-4">
                    <div className="col-sm-12"></div>
                </div>
             </div>
              */

            <div>

                {/*Formulario*/}
                <h2 className="text-white bg-success text-center" >Lista de tareas</h2>
                <div className="row">

                    <div className="">
                        {/*9.- Crear Formulario*/}
                        <form onSubmit={guardarTarea}> {/*   <form></form>   */}
                            <div className="input-group"> {/*  <div class="input-group"></div>    */}
                                <input type="text" className="form-control"
                                    style={{ maxWidth: '200px' }}
                                    placeholder="Ingrese La Descripcion"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)} />
                               <select
                                    className="form-control"
                                    style={{ maxWidth: '200px' }}
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                >
                                    <option value="">Selecciona un Estado</option>
                                    <option value="En Progreso">En Progreso</option>
                                    <option value="Completado">Completado</option>
                                    <option value="No Completado">No Completado</option>
                                </select>
                                <button className="btn btn-primary">Agregar Nueva Tarea</button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                </svg>
                                <select
                                    className="form-control right"
                                    style={{ maxWidth: '200px' }}
                                    value={filtroEstado}
                                    onChange={(e) => {
                                        setFiltroEstado(e.target.value);
                                        filtrarTareasPorEstado(e.target.value);
                                    }}
                                >
                                    <option value="Todas">Todas</option>
                                    <option value="En Progreso">En Progreso</option>
                                    <option value="Completado">Completado</option>
                                    <option value="No Completado">No Completado</option>
                                </select>
                            </div>
                        </form>


                    </div>

                </div>

                {/*Lista*/}

                <div className="row mt-4">
                    <div className="col-sm-12">

                        {/*6.- Listar Tareas*/}
                        <div className="list-group" data={tareas}>    {/* <div className="list-group"></div>  */}
                            {
                                tareasFiltradas.map((item) => (
                                    <div key={item.idTarea} className="list-group-item list-group-item-action">
                                        <h5 className="text-primary">{item.descripcion}</h5>
                                        <p>{item.estado}</p>
                                        <div className="d-flex justify-content-between">
                                            <small className="text-muted">Fecha Publicada:
                                                {formatDate(item.fechaRegistro)}</small>
                                        <div className="button-group">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-success"
                                                onClick={() => setMostrarModal(!mostrarModal)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => cerrarTarea(item.idTarea)}
                                            >
                                                Borrar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }



                        </div>

                    </div>
                </div>
                <ModalTarea
                    mostrarModal={mostrarModal}
                    guardarTarea={guardarTarea}
                    setMostrarModal={setMostrarModal}
                    editar={editar}
                    setEditar={setEditar}
                    editarTarea={editarTarea}
                />
               
            </div>










        )
    
}

export default App;
import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, ModalFooter, Button } from "reactstrap"



const modeloTarea = {
    IdTarea: 0,
    Descripcion: "",
    Estado: "",
    FechaRegistro: ""

}


const ModalTarea = ({ mostrarModal, setMostrarModal, guardarTarea,  editar, setEditar,  editarTarea }) => {

    const [tarea, setTarea] = useState(modeloTarea);

  
    const actualizarDato = (e) => {

        console.log(e.target.name + " : " + e.target.value)
        setTarea(
            {
                ...tarea,
                [e.target.name]: e.target.value
            }
        )
    }


    const enviarDatos = () => {

        if (tarea.IdTarea === 0) {
            guardarTarea(tarea)
        } else {
            editarTarea(tarea)
        }

        setTarea(modeloTarea)

    }

    useEffect(() => {
        if (editar != null) {
            setTarea(editar)
        } else {
            setTarea(modeloTarea)
        }
    }, [editar])


    
   

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }

    const formatDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = new Date(string).toLocaleDateString("es-PE", options);
        let hora = new Date(string).toLocaleTimeString();
        return fecha + " | " + hora
    }
    return (

        <Modal isOpen={mostrarModal}>
            <ModalHeader>

                {tarea.IdTarea == 0 ? "Nueva Tarea" : "Editar Tarea"}

            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Descripcion De La Tarea:</Label>
                        <Input name="Descripcion" onChange={(e) => actualizarDato(e)} value={tarea.Descripcion} />
                    </FormGroup>
                    <select
                        name="Estado"
                        className="form-control"
                        style={{ maxWidth: '200px' }}
                        value={tarea.Estado}
                        hange={(e) => actualizarDato(e)}
                    >
                        <option value="">Selecciona un Estado</option>
                        <option value="En Progreso">En Progreso</option>
                        <option value="Completado">Completado</option>
                        <option value="No Completado">No Completado</option>
                    </select>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDatos}>Editar</Button>
                <Button color="danger" size="sm" onClick={cerrarModal} >Cerrar</Button>
            </ModalFooter>
        </Modal>

    )
}

export default ModalTarea;
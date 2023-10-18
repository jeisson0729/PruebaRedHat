import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, ModalFooter, Button } from "reactstrap"



const modeloTarea = {
    IdTarea: 0,
    Descripcion: "",
    Etsado: ""

}


const ModalTarea = ({ mostrarModal, setMostrarModal, guardarTarea,  editar,  editarTarea }) => {

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


    const enviarTarea = () => {

        if (tarea.IdTarea <= 0) {
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
    }

    return (

        <Modal isOpen={mostrarModal}>
            <ModalHeader>

                {tarea.IdTarea == 0 ? "Editar Tarea" : "Editar Tarea"}

            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Descripcion De La Tarea:</Label>
                        <Input name="Descripcion" onChange={(e) => actualizarDato(e)} value={tarea.Descripcion} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Seleccionar Un Estado:</Label>
                        <select
                            className="form-control"
                            style={{ maxWidth: '200px' }}
                            value={tarea.Estado}
                            onChange={(e) => actualizarDato(e)}
                        >
                            <option value="">Selecciona un Estado</option>
                            <option value="En Progreso">En Progreso</option>
                            <option value="Completado">Completado</option>
                            <option value="No Completado">No Completado</option>
                        </select>
                    </FormGroup>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarTarea}>Editar</Button>
                <Button color="danger" size="sm" onClick={cerrarModal} >Cerrar</Button>
            </ModalFooter>
        </Modal>

    )
}

export default ModalTarea;
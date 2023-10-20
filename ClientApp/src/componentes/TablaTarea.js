
import { Button, Table } from "reactstrap"

const TablaTarea = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarTarea }) => {

    const enviarDatos = (tarea) => {
        setEditar(tarea)
        setMostrarModal(!mostrarModal)

    }


    return (

        <Table striped responsive>
            <thead>
                <tr>
                    <th>Descripcion Tarea:</th>
                    <th>Estado</th>
                    <th>Fecha Publicada</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="4">Sin registros</td>
                        </tr>
                    ) : (
                        data.map((item) => (

                            <tr key={item.IdTarea}>
                                <td>{item.Descripcion}</td>
                                <td>{item.Estado}</td>
                                <td>{item.FechaRegistro}</td>
                                <td>
                                    <Button color="primary" size="sm" className="me-2"
                                        onClick={() => enviarDatos(item)}
                                    >Editar</Button>
                                    <Button color="danger" size="sm"
                                        onClick={() => eliminarTarea(item.IdTarea)}
                                    >Eliminar</Button>
                                </td>
                            </tr>

                        ))

                    )

                }
            </tbody>
        </Table>

    )

}

export default TablaTarea;
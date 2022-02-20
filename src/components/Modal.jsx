import { useState, useEffect} from 'react';
import Mensaje from './Mensaje';
import CerrarBtn from '../img/cerrar.svg';

const Modal = ({
        setModal, 
        animarModal, 
        setAnimarModal, 
        guardaGasto,
        gastoEditar,
        setGastoEditar
    }) => {

    const [mensaje, setMensaje] = useState('')

    // useState para el formurlario 
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    // editar 
    const [fecha, setFecha] = useState('')
    const [id, setIdi] = useState('');

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setIdi(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [gastoEditar])

    // function para desactivar el modal con la animacion 
    const handleCerraBtn = () => {
        setAnimarModal(false);
        // resetea el formulario
        setGastoEditar({});
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios');
            
            setTimeout(() => {
                setMensaje('');
            },2000);
            return;
        }

        guardaGasto({nombre, cantidad, categoria, fecha, id});
        handleCerraBtn();
    }

    return ( 
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn} 
                    alt="Cerrar_Modal"
                    onClick={handleCerraBtn}
                />
            </div>

            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className='campo'>
                    <label htmlFor="nombre">
                        Nombre Gasto
                    </label>

                    <input 
                        id='nombre'
                        type="text" 
                        placeholder='Añade Nombre del Gasto'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">
                        Cantidad
                    </label>

                    <input 
                        type="number" 
                        placeholder="Añade Cantidad" 
                        id="cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))} 
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">
                        Categoría
                    </label>

                    <select 
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gasto">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>

                    <input 
                        type="submit" 
                        value={gastoEditar.nombre ? 'Editar Gasto' : 'Añadir Gasto'}
                    />

                </div>
            </form>
        </div>
     );
}
 
export default Modal;
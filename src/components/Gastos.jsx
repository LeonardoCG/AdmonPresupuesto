import React from 'react';
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatearFecha } from '../helpers';
 
import IconoAhorro from '../img/icono_ahorro.svg';
import IconoCasa from '../img/icono_casa.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoGastosV from '../img/icono_gastos.svg';
import IconoOcio from '../img/icono_ocio.svg';
import IconoSalud from '../img/icono_salud.svg';
import IconoSuscripciones from '../img/icono_suscripciones.svg';

const dicionarioIconos = {
    ahorro : IconoAhorro,
    comida : IconoComida, 
    casa : IconoCasa, 
    gasto : IconoGastosV, 
    ocio : IconoOcio, 
    salud : IconoSalud, 
    suscripciones : IconoSuscripciones
}

const Gastos = ({gasto, setGastoEditar, eliminarGasto}) => {

    const { nombre, categoria, cantidad, fecha, id } = gasto;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => eliminarGasto(id)}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return ( 
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className='gasto sombra'>
                    <div className='contenido-gasto'>
                        <img 
                            src={dicionarioIconos[categoria]} 
                            alt="list_iconos" 
                        />
                        <div className='descripcion-gasto'>
                            <p className='categoria'>{categoria}</p>
                            <p className='nombre-gasto'>{nombre}</p>                    
                            <p className='fecha-gasto'>
                                Agredado: {''}
                                <span>{formatearFecha(fecha)}</span>
                            </p>
                        </div>

                        <p className='cantidad-gasto'>$ {cantidad}</p>
                    </div>
                </div>
            </SwipeableListItem>
        </SwipeableList>
     );
}
 
export default Gastos;
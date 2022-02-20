import { object } from 'prop-types';
import { useState, useEffect } from 'react';
import Filtro from './components/Filtros';
import Header from './components/Header';
import ListGastos from './components/ListGastos';
import Modal from './components/Modal';
import { generarId } from './helpers/index';
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0);

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect( () => {
    if( Object.keys(gastoEditar).length > 0) {
      setModal(true);
  
      setTimeout(() => {
          setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  // usar localStorage 
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0 ) {
      setIsValidPresupuesto(true);
    }
  }, []);

  useEffect(() => {
    // fitrar datos
    if(filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro);
    
      setGastosFiltrados((gastosFiltrados))
    }
  }, [filtro]);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
        setAnimarModal(true);
    }, 500);
  }

  const guardaGasto = (gasto) => {
    if(gasto.id) {
        // actualizar 
        const gastoActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
        setGastos(gastoActualizados);
        // resetea el formulario
        setGastoEditar({})
    } else {
      // nuevo gasto 
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
} 

const eliminarGasto = (id) => {
  const gastosActualizados = gastos.filter( gasto => gasto.id !== id );

  setGastos(gastosActualizados);
}

  return (
    <div className={ modal ? 'fijar' : '' }>
      <Header 
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
          <img 
            src={IconoNuevoGasto} 
            alt="icono_nuevo_gasto" 
            onClick={handleNuevoGasto}
          />
        </div>
        </>
      )}

        {modal && 
          <Modal
            setModal={setModal}
            animarModal={animarModal}
            setAnimarModal={setAnimarModal}
            guardaGasto={guardaGasto}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
          />
        }
    </div>
  )
}

export default App

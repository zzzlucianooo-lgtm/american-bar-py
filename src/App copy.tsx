import { useState } from "react";
import './App.css'

function App() {
  
  const fotosAmerican = [
    "/images/american-1.png",
    "/images/american-2.png",
    "/images/american-3.png",
    "/images/american-4.png",
    "/images/american-5.png",
    "/images/american-6.png",
  ];

  const [fotoActual, setFotoActual] = useState(0);

const [carrito, setCarrito] = useState<
  { nombre: string; precio: number; cantidad: number }[]
>([]);

const [carritoAbierto, setCarritoAbierto] = useState(false);

const [productoAgregado, setProductoAgregado] = useState("");

const agregarAlCarrito = (nombre: string, precio: number) => {
  
  setCarrito((carritoActual) => {
    const productoExistente = carritoActual.find(
      (producto) => producto.nombre === nombre
    );

    if (productoExistente) {
      return carritoActual.map((producto) =>
        producto.nombre === nombre
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto
      );
    }

    return [...carritoActual, { nombre, precio, cantidad: 1 }];
  });
};

const aumentarCantidad = (nombre: string) => {
  setCarrito((carritoActual) =>
    carritoActual.map((producto) =>
      producto.nombre === nombre
        ? { ...producto, cantidad: producto.cantidad + 1 }
        : producto
    )
  );
};

const disminuirCantidad = (nombre: string) => {
  setCarrito((carritoActual) =>
    carritoActual
      .map((producto) =>
        producto.nombre === nombre
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      )
      .filter((producto) => producto.cantidad > 0)
  );
};

  const siguienteFoto = () => {
    setFotoActual((actual) => (actual + 1) % fotosAmerican.length);
  };

  const anteriorFoto = () => {
    setFotoActual(
      (actual) => (actual - 1 + fotosAmerican.length) % fotosAmerican.length
    );
  };

const cantidadCarrito = carrito.reduce(
  (total, producto) => total + producto.cantidad,
  0
);

  return (
  <div className="site">
    

<button
  className="carrito-flotante"
  type="button"
  onClick={() => setCarritoAbierto(true)}
>

  🛒
  <span className="carrito-contador">
    {cantidadCarrito}
  </span>
</button>

<div
  className={`carrito-overlay ${
    carritoAbierto ? "carrito-visible" : "carrito-oculto"
  }`}
>
  
    <div
      className="carrito-fondo"
      onClick={() => setCarritoAbierto(false)}
    />

    <aside className="carrito-panel">
      <div className="carrito-header">
        <h2>🛒 TU PEDIDO</h2>
        <button
          type="button"
          onClick={() => setCarritoAbierto(false)}
        >
          ✕
        </button>
      </div>

      <div className="carrito-contenido">
        {carrito.length === 0 ? (
          <p className="carrito-vacio">
            Todavía no agregaste productos 🍔
          </p>
        ) : (
          carrito.map((producto) => (
            <div className="carrito-item" key={producto.nombre}>
              
<div>
  <strong>{producto.nombre}</strong>

  <div className="carrito-controles">
    <button
      type="button"
      onClick={() => disminuirCantidad(producto.nombre)}
      aria-label={`Quitar una unidad de ${producto.nombre}`}
    >
      −
    </button>

    <span>{producto.cantidad}</span>

    <button
      type="button"
      onClick={() => aumentarCantidad(producto.nombre)}
      aria-label={`Agregar una unidad de ${producto.nombre}`}
    >
      +
    </button>
  </div>
</div>


              <span>
                Gs.{" "}
                {(producto.precio * producto.cantidad)
                  .toLocaleString("es-PY")}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="carrito-footer">
        <div className="carrito-total">
          <strong>TOTAL</strong>
          <strong>
            Gs.{" "}
            {carrito
              .reduce(
                (total, producto) =>
                  total + producto.precio * producto.cantidad,
                0
              )
              .toLocaleString("es-PY")}
          </strong>
        </div>
      </div>
    </aside>
  </div>


  <header className="navbar">
<a className="brand" href="#inicio">
  <img
    src="/images/logo-american.png"
    alt="American Bar Py"
    className="brand-logo"
  />
</a>


        <nav className="nav-links">
          <a href="#inicio">INICIO</a>
          <a href="#menu">MENÚ</a>
          <a href="#experiencia">EXPERIENCIA</a>
          <a href="#ubicacion">UBICACIÓN</a>
        </nav>

        <a className="nav-button" href="#contacto">
          CONTACTANOS
        </a>
      </header>

      <main>
        <section className="hero" id="inicio">
          

<div className="hero-art" aria-hidden="true">
  <img
    src="/images/estatua-paraguay.png"
    alt=""
    className="hero-statue"
  />

  <img
    src="/images/grafiti-hamburguesa.png"
    alt=""
    className="hero-burger-graffiti"
  />

<img
  src="/images/grafiti-cerveza.png"
  alt=""
  className="hero-beer-graffiti"
/>

  <div className="comic-shape comic-red" />
  <div className="comic-shape comic-blue" />
</div>


          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="eyebrow-line" />
              THE AMERICAN EXPERIENCE IN ASUNCIÓN
            </div>

            <h1>
              <span>AMERICAN</span>
              <span className="title-yellow">BAR PY</span>
            </h1>

            <p className="hero-subtitle">
              SPORTS <span>★</span> POOL <span>★</span> FOOD
              <span> ★ </span> DRINKS <span>★</span> MUSIC
            </p>

            <p className="hero-description">
              El auténtico espíritu americano se vive acá.
              Buena comida, tragos, deportes y noches inolvidables.
            </p>

            <div className="hero-actions">
              <a className="btn btn-yellow" href="#contacto">
                CONTACTANOS ↗
              </a>
              <a className="btn btn-outline" href="#menu">
                VER MENÚ →
              </a>
            </div>
          </div>

          
<div className="hero-bottom">
  <img
    src="/images/barra-experiencias.png"
    alt="Eventos deportivos, mesas de billar, comidas y picadas, tragos y cervezas, música en vivo"
    className="barra-experiencias"
  />
</div>

        </section>
        

<section className="experiencia" id="experiencia">
  <div className="vegas-cartel">
    <div className="vegas-estrella">★</div>

    <div className="vegas-cartel-interior">
      <span className="vegas-bienvenida">WELCOME TO</span>
      <span className="vegas-american">AMERICAN</span>
      <span className="vegas-bar">BAR PY</span>
      <span className="vegas-ciudad">ASUNCIÓN · PARAGUAY</span>
    </div>
  </div>

<div className="sticker-broadway" aria-hidden="true">
  <span className="broadway-small">NEW YORK CITY</span>
  <span className="broadway-main">BROADWAY</span>
  <span className="broadway-small">STREET</span>
</div>
<div className="sticker-diner" aria-hidden="true">
  <span className="diner-estrellas">★ ★ ★</span>
  <span className="diner-newyork">NEW YORK</span>
  <span className="diner-titulo">DINER</span>
  <span className="diner-desde">EST. 1950 · USA</span>
</div>
<div className="american-galeria">
  <button
    type="button"
    className="galeria-flecha galeria-anterior"
    onClick={anteriorFoto}
    aria-label="Foto anterior"
  >
    ❮
  </button>

 <div key={fotoActual} className="galeria-transicion">
<img
  src={fotosAmerican[fotoActual]}
  alt={`American Bar Py - Foto ${fotoActual + 1}`}
  className={`galeria-imagen ${
    fotoActual === 4 ? "galeria-imagen-vertical" : ""
  }`}
/></div> 


  <button
    type="button"
    className="galeria-flecha galeria-siguiente"
    onClick={siguienteFoto}
    aria-label="Foto siguiente"
  >
    ❯
  </button>

  <div className="galeria-contador">
    {fotoActual + 1} / {fotosAmerican.length}
  </div>
</div>

<div className="sticker-taxi" aria-hidden="true">
  <span className="taxi-ciudad">NEW YORK CITY</span>
  <span className="taxi-icono">🚕</span>
  <span className="taxi-texto">NYC TAXI</span>
  <span className="taxi-numero">NO. 1977 · USA</span>
</div>

<div className="sticker-route66" aria-hidden="true">
  <span className="route66-us">U.S.</span>
  <span className="route66-numero">66</span>
  <span className="route66-texto">ROUTE</span>
</div>



  <div className="experiencia-contenido">
    <span className="experiencia-etiqueta">
      CONOCÉ AMERICAN BAR PY
    </span>

    <h2>
      NO ES SOLO UN BAR.
      <span> ES EL AFTER QUE TE MERECES.</span>
    </h2>

    <p>
      Un espacio para juntarte con amigos, disfrutar de buena
      comida, compartir unos tragos y vivir cada partido con
      toda la emoción. En American Bar Py, cada encuentro
      se convierte en una experiencia.
    </p>
    
<div className="experiencia-video">
  <video
   src="/images/american-bar.mp4"
    controls
    playsInline
    preload="metadata"
  >
    Tu navegador no admite videos.
  </video>
</div>

  </div>
</section>

<section className="menu-american" id="menu">
  
<img
  src="/images/nyc-ilustracion.png"
  alt="Estatua de la Libertad, Broadway y taxi de Nueva York"
  className="menu-decoracion-nyc"
/>

<img
  src="/images/nyc-derecha.png"
  alt="New York City, rascacielos y hamburguesa"
  className="menu-decoracion-derecha"
/>

{/* DECORACIONES INFERIORES DEL MENÚ */}

<img
  src="/images/nyc-puente-brooklyn.png"
  alt="Puente de Brooklyn y edificios de Nueva York"
  className="menu-decoracion-puente"
/>

<img
  src="/images/nyc-pizza-gaseosa.png"
  alt="Pizza y gaseosa estilo New York"
  className="menu-decoracion-pizza"
/>

  <div className="menu-american-encabezado">
    <span>THE ORIGINAL AMERICAN BAR PY</span>
    <h2>NUESTRO MENÚ</h2>
    <p>EL SABOR DE NEW YORK EN ASUNCIÓN</p>
  </div>
  
<div className="menu-american-columnas">
  <div className="menu-american-columna">
    
<div className="menu-categoria" id="hamburguesas">
  <h3>HAMBURGUESAS</h3>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>American Burger</h4>
      <p>
        Pan, mayo de la casa, lechuga, tomate, salsa barbacoa,
        hamburguesa de carne vacuna, panceta, huevo, doble queso
        cheddar. Opcional: cebolla morada y pepinillo.
      </p>
    </div>
    <span className="menu-precio">Gs. 40.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Premium Burger</h4>
      <p>
        Pan, mayo de la casa, ketchup, lechuga, tomate,
        hamburguesa de carne vacuna, huevo, jamón y queso.
      </p>
    </div>
    <span className="menu-precio">Gs. 36.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Cheese Burger</h4>
      <p>
        Pan, mayo de la casa, hamburguesa de carne vacuna,
        doble queso cheddar y mozzarella.
      </p>
    </div>
    <span className="menu-precio">Gs. 30.000</span>
    

<button
  className={`menu-boton-agregar ${
    productoAgregado === "Cheese Burger" ? "agregado" : ""
  }`}
  onClick={() => {
    agregarAlCarrito("Cheese Burger", 30000);
    setProductoAgregado("Cheese Burger");
  }}
  onAnimationEnd={() => setProductoAgregado("")}
>
  {productoAgregado === "Cheese Burger"
    ? "✓ AGREGADO"
    : "+ AGREGAR"}
</button>


  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Mini Classic Burger</h4>
      <p>
        Pan, mayo de la casa, hamburguesa de carne vacuna,
        queso cheddar, mozzarella, lechuga y tomate.
      </p>
    </div>
    <span className="menu-precio">Gs. 22.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Mini Cheese Burger</h4>
      <p>
        Pan, mayo de la casa, hamburguesa de carne vacuna,
        queso cheddar y mozzarella.
      </p>
    </div>
    <span className="menu-precio">Gs. 20.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Toppings (Agregados)</h4>
      <p>
        Queso cheddar, bacon, cebolla morada, pepinillo,
        cebolla caramelizada y huevo.
      </p>
    </div>
    <span className="menu-precio">Gs. 5.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Hamburguesa de carne adicional</h4>
    </div>
    <span className="menu-precio">Gs. 8.000</span>
  </div>
</div>


    
<div className="menu-categoria" id="lomitos">
  <h3>LOMITOS</h3>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Sándwich de Lomito de carne completo</h4>
      <p>
        Pan, mayo de la casa, ketchup, lomito, lechuga,
        tomate, huevo, jamón, queso y panceta.
        Opcional: cebolla morada.
      </p>
    </div>
    <span className="menu-precio">Gs. 40.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Sándwich de Lomito de carne simple</h4>
      <p>
        Pan, mayo de la casa, ketchup, lomito,
        lechuga, tomate, jamón y queso.
      </p>
    </div>
    <span className="menu-precio">Gs. 35.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Sándwich de Lomito de pollo completo</h4>
      <p>
        Pan, mayonesa de la casa, ketchup, pollo,
        lechuga, tomate, huevo, jamón, queso y panceta.
      </p>
    </div>
    <span className="menu-precio">Gs. 36.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Sándwich de Lomito de pollo simple</h4>
      <p>
        Pan, mayonesa de la casa, ketchup, pollo,
        lechuga, tomate, jamón y queso.
      </p>
    </div>
    <span className="menu-precio">Gs. 32.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Toppings (Agregados)</h4>
      <p>Lomito de carne adicional.</p>
    </div>
    <span className="menu-precio">Gs. 10.000</span>
  </div>
</div>


    
<div className="menu-categoria" id="arabes">
  <h3>ÁRABES</h3>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Árabe de Carne</h4>
      <p>
        Pan árabe, mayonesa de ajo, carne, repollo morado
        y blanco, tomate, panceta y huevo.
      </p>
    </div>
    <span className="menu-precio">Gs. 40.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Árabe de Pollo</h4>
      <p>
        Pan árabe, mayonesa de ajo, pollo, repollo morado
        y blanco, tomate, panceta y huevo.
      </p>
    </div>
    <span className="menu-precio">Gs. 35.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Árabe Mixto</h4>
      <p>
        Pan árabe, mayonesa de ajo, carne y pollo,
        repollo morado y blanco, tomate, panceta y huevo.
      </p>
    </div>
    <span className="menu-precio">Gs. 40.000</span>
  </div>
</div>

  </div>

  <div className="menu-american-columna">
    
<div className="menu-categoria" id="parrillita">
  <h3>PARRILLITA AMERICAN</h3>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Parrillita American</h4>
      <p>
        Mandioca Frita, Bolitas de Mandioca c/ queso,
        Sopa Paraguaya, Chorizos parrilleros picantes
        y no picantes, morcillitas, carne vacuna
        (para 3 o 4 Personas).
      </p>
      <p>
        Incluye mayonesa de ajo y Chimichurri.
      </p>
    </div>

    <span className="menu-precio">Gs. 150.000</span>
  </div>
</div>


    
<div className="menu-categoria" id="picadas">
  <h3>FRITAS Y PICADAS</h3>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Papas Fritas Pequeña 100 gr.</h4>
    </div>
    <span className="menu-precio">Gs. 14.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Papas Fritas Mediana 200 gr.</h4>
    </div>
    <span className="menu-precio">Gs. 20.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Papas Fritas Mediana 200 gr.</h4>
      <p>Con agregado de cheddar y bacon.</p>
    </div>
    <span className="menu-precio">Gs. 25.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Papas Noisette 200 gr.</h4>
      <p>Con agregado de cheddar.</p>
    </div>
    <span className="menu-precio">Gs. 25.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Bastoncitos de Mandioca 200 gr.</h4>
      <p>Con agregado de cheddar.</p>
    </div>
    <span className="menu-precio">Gs. 15.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Bolitas de Mandioca (12 unid.)</h4>
      <p>Rellenas de queso.</p>
    </div>
    <span className="menu-precio">Gs. 25.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Coxinhas rellenas (4 unid.)</h4>
      <p>De pollo y queso.</p>
    </div>
    <span className="menu-precio">Gs. 25.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Croquetitas de pollo (9 unid.)</h4>
      <p>Rellenas de queso.</p>
    </div>
    <span className="menu-precio">Gs. 35.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Cazuela de Choricitos al vino (12 unid.)</h4>
    </div>
    <span className="menu-precio">Gs. 40.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Toppings</h4>
      <p>Carga adicional de queso cheddar y bacon.</p>
    </div>
    <span className="menu-precio">Gs. 5.000</span>
  </div>
</div>


    
<div className="menu-categoria" id="pizzas">
  <h3>PIZZAS</h3>

  <p className="menu-pizzas-subtitulo">
    8 PORCIONES
  </p>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Muzzarella</h4>
    </div>
    <span className="menu-precio">Gs. 55.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Napolitana</h4>
    </div>
    <span className="menu-precio">Gs. 65.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Pepperoni</h4>
    </div>
    <span className="menu-precio">Gs. 65.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Catupiry con pollo</h4>
    </div>
    <span className="menu-precio">Gs. 65.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Palmito</h4>
    </div>
    <span className="menu-precio">Gs. 65.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>4 Quesos</h4>
    </div>
    <span className="menu-precio">Gs. 75.000</span>
  </div>

  <p className="menu-pizzas-extra">
    Con borde relleno, cualquiera de los sabores:
    <strong> + Gs. 10.000</strong>
  </p>
</div>


    
<div className="menu-categoria" id="helados">
  <h3>HELADOS</h3>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Palito sabores frutales</h4>
    </div>
    <span className="menu-precio">Gs. 5.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Palito sabores cremosos</h4>
    </div>
    <span className="menu-precio">Gs. 8.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>En vasitos 200 gr.</h4>
    </div>
    <span className="menu-precio">Gs. 12.000</span>
  </div>
</div>

  </div>
</div>

</section>

{/* SECCIÓN DE BEBIDAS */}
<section className="bebidas-american" id="bebidas">
  <div className="bebidas-encabezado">
    <span>AMERICAN BAR PY</span>
    <h2>BEBIDAS</h2>
    <p>REFRESCÁ TU EXPERIENCIA</p>
  </div>

  <div className="bebidas-contenido">
    
<div className="bebidas-categoria">
  <h3>BEBIDAS SIN ALCOHOL</h3>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Gaseosas</h4>
    </div>
    <span className="menu-precio">Gs. 10.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Agua Tónica</h4>
    </div>
    <span className="menu-precio">Gs. 10.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Monster</h4>
    </div>
    <span className="menu-precio">Gs. 20.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Agua Mineral</h4>
    </div>
    <span className="menu-precio">Gs. 8.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Del Valle 1 L</h4>
    </div>
    <span className="menu-precio">Gs. 12.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Del Valle 200 ml</h4>
    </div>
    <span className="menu-precio">Gs. 5.000</span>
  </div>
</div>


    
<div className="bebidas-categoria">
  <h3>CERVEZAS</h3>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Chopp Munich 330 ml</h4>
    </div>
    <span className="menu-precio">Gs. 10.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Chopp Munich 500 ml</h4>
    </div>
    <span className="menu-precio">Gs. 15.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Chopp Heineken 350 ml</h4>
    </div>
    <span className="menu-precio">Gs. 15.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Chopp Pilsen 330 ml</h4>
    </div>
    <span className="menu-precio">Gs. 10.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Chopp Pilsen 500 ml</h4>
    </div>
    <span className="menu-precio">Gs. 15.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Coronita 210 ml</h4>
    </div>
    <span className="menu-precio">Gs. 12.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Corona 710 ml</h4>
    </div>
    <span className="menu-precio">Gs. 25.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Heineken lata 250 ml</h4>
    </div>
    <span className="menu-precio">Gs. 10.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Heineken botella 250 ml</h4>
    </div>
    <span className="menu-precio">Gs. 12.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Heineken botella 660 ml</h4>
    </div>
    <span className="menu-precio">Gs. 25.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Sol 330 ml</h4>
    </div>
    <span className="menu-precio">Gs. 13.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Amstel lata 250 ml</h4>
    </div>
    <span className="menu-precio">Gs. 9.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Amstel botella 355 ml</h4>
    </div>
    <span className="menu-precio">Gs. 12.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Amstel botella 650 ml</h4>
    </div>
    <span className="menu-precio">Gs. 20.000</span>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Antarctica lata 269 ml</h4>
    </div>
    <span className="menu-precio">Gs. 8.000</span>
  </div>
</div>

  </div>
</section>

      </main>
    </div>
  )
}

export default App

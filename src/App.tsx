import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import './App.css'

function App() {
 useEffect(() => {
  AOS.init({
    duration: 850,
    easing: "ease-out-cubic",
    once: true,
    offset: 70,
  });

  const selectores = [
    ".menu-producto",
    ".visitanos-encabezado",
    ".visitanos-dato",
    ".visitanos-mapa",
    ".visitanos-whatsapp",
    ".separador-ubicacion",
    ".menu-categoria",
    ".menu-encabezado",
    ".bebidas-encabezado",
    ".bebidas-categoria",
    ".galeria img",
    ".galeria-item",
  ];

  document
    .querySelectorAll<HTMLElement>(selectores.join(", "))
    .forEach((elemento, indice) => {
      if (elemento.hasAttribute("data-aos")) return;

      elemento.setAttribute("data-aos", "fade-up");
      elemento.setAttribute("data-aos-duration", "850");
      elemento.setAttribute("data-aos-delay", String((indice % 3) * 90));
    });

  AOS.refreshHard();
}, []);
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
const realizarPedidoWhatsApp = () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Agregá productos primero.");
    return;
  }

  const detallePedido = carrito
    .map((producto) => {
      const subtotal = producto.precio * producto.cantidad;

      return `🍔 ${producto.cantidad}x ${producto.nombre} — Gs. ${subtotal.toLocaleString("es-PY")}`;
    })
    .join("\n");

  const total = carrito.reduce(
    (acumulado, producto) =>
      acumulado + producto.precio * producto.cantidad,
    0
  );

  const mensaje = `¡Hola, American Bar Py! 🇺🇸

Quiero realizar el siguiente pedido:

🛒 *MI PEDIDO*
${detallePedido}

💰 *TOTAL: Gs. ${total.toLocaleString("es-PY")}*

¿Me confirman mi pedido? ¡Muchas gracias!`;

  const enlace = `https://wa.me/595986764223?text=${encodeURIComponent(mensaje)}`;

  window.open(enlace, "_blank", "noopener,noreferrer");
};
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
  className={`carrito-flotante ${
    productoAgregado ? "carrito-rebote" : ""
  }`}
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
        <div className="carrito-footer">

  <div className="carrito-total">
    {/* ACÁ DEJÁS TU CÓDIGO ACTUAL DEL TOTAL */}
  </div>

  <button
    type="button"
    className="carrito-pedido-whatsapp"
    onClick={realizarPedidoWhatsApp}
    disabled={carrito.length === 0}
  >
    REALIZAR PEDIDO POR WHATSAPP ↗
  </button>

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


          <div
  className="hero-content"
  data-aos="fade-up"
  data-aos-duration="1200"
  data-aos-delay="200"
  data-aos-offset="0"
>
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
              <a className="btn btn-yellow" href="#experiencia">
                EXPLORAR ↗
              </a>
              <a className="btn btn-outline" href="#menu">
                VER MENÚ →
              </a>
            </div>
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

  <div className="menu-producto" data-aos="fade-up" data-aos-duration="800">
    <div className="menu-producto-info">
      <h4>American Burger</h4>
      <p>
        Pan, mayo de la casa, lechuga, tomate, salsa barbacoa,
        hamburguesa de carne vacuna, panceta, huevo, doble queso
        cheddar. Opcional: cebolla morada y pepinillo.
      </p>
    </div>
    <span className="menu-precio">Gs. 40.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "American Burger" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("American Burger", 40000);
        setProductoAgregado("American Burger");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "American Burger") setProductoAgregado("");
      }}
    >
      {productoAgregado === "American Burger" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
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
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Premium Burger" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Premium Burger", 36000);
        setProductoAgregado("Premium Burger");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Premium Burger") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Premium Burger" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
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
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Cheese Burger" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Cheese Burger", 30000);
        setProductoAgregado("Cheese Burger");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Cheese Burger") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Cheese Burger" ? "✓ AGREGADO" : "+ AGREGAR"}
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
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Mini Classic Burger" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Mini Classic Burger", 22000);
        setProductoAgregado("Mini Classic Burger");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Mini Classic Burger") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Mini Classic Burger" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
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
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Mini Cheese Burger" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Mini Cheese Burger", 20000);
        setProductoAgregado("Mini Cheese Burger");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Mini Cheese Burger") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Mini Cheese Burger" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
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
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Toppings hamburguesa (Agregados)" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Toppings hamburguesa (Agregados)", 5000);
        setProductoAgregado("Toppings hamburguesa (Agregados)");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Toppings hamburguesa (Agregados)") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Toppings hamburguesa (Agregados)" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Hamburguesa de carne adicional</h4>
    </div>
    <span className="menu-precio">Gs. 8.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Hamburguesa de carne adicional" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Hamburguesa de carne adicional", 8000);
        setProductoAgregado("Hamburguesa de carne adicional");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Hamburguesa de carne adicional") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Hamburguesa de carne adicional" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
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
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Sándwich de Lomito de carne completo" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Sándwich de Lomito de carne completo", 40000);
        setProductoAgregado("Sándwich de Lomito de carne completo");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Sándwich de Lomito de carne completo") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Sándwich de Lomito de carne completo" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
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
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Sándwich de Lomito de carne simple" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Sándwich de Lomito de carne simple", 35000);
        setProductoAgregado("Sándwich de Lomito de carne simple");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Sándwich de Lomito de carne simple") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Sándwich de Lomito de carne simple" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
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
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Sándwich de Lomito de pollo completo" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Sándwich de Lomito de pollo completo", 36000);
        setProductoAgregado("Sándwich de Lomito de pollo completo");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Sándwich de Lomito de pollo completo") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Sándwich de Lomito de pollo completo" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
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
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Sándwich de Lomito de pollo simple" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Sándwich de Lomito de pollo simple", 32000);
        setProductoAgregado("Sándwich de Lomito de pollo simple");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Sándwich de Lomito de pollo simple") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Sándwich de Lomito de pollo simple" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Toppings (Agregados)</h4>
      <p>Lomito de carne adicional.</p>
    </div>
    <span className="menu-precio">Gs. 10.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Toppings lomito (Agregados)" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Toppings lomito (Agregados)", 10000);
        setProductoAgregado("Toppings lomito (Agregados)");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Toppings lomito (Agregados)") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Toppings lomito (Agregados)" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
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
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Árabe de Carne" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Árabe de Carne", 40000);
        setProductoAgregado("Árabe de Carne");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Árabe de Carne") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Árabe de Carne" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
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
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Árabe de Pollo" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Árabe de Pollo", 35000);
        setProductoAgregado("Árabe de Pollo");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Árabe de Pollo") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Árabe de Pollo" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
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
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Árabe Mixto" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Árabe Mixto", 40000);
        setProductoAgregado("Árabe Mixto");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Árabe Mixto") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Árabe Mixto" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
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
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Parrillita American" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Parrillita American", 150000);
        setProductoAgregado("Parrillita American");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Parrillita American") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Parrillita American" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>
</div>


    
<div className="menu-categoria" id="picadas">
  <h3>FRITAS Y PICADAS</h3>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Papas Fritas Pequeña 100 gr.</h4>
    </div>
    <span className="menu-precio">Gs. 14.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Papas Fritas Pequeña 100 gr." ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Papas Fritas Pequeña 100 gr.", 14000);
        setProductoAgregado("Papas Fritas Pequeña 100 gr.");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Papas Fritas Pequeña 100 gr.") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Papas Fritas Pequeña 100 gr." ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Papas Fritas Mediana 200 gr.</h4>
    </div>
    <span className="menu-precio">Gs. 20.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Papas Fritas Mediana 200 gr." ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Papas Fritas Mediana 200 gr.", 20000);
        setProductoAgregado("Papas Fritas Mediana 200 gr.");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Papas Fritas Mediana 200 gr.") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Papas Fritas Mediana 200 gr." ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Papas Fritas Mediana 200 gr.</h4>
      <p>Con agregado de cheddar y bacon.</p>
    </div>
    <span className="menu-precio">Gs. 25.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Papas Fritas Mediana 200 gr. con cheddar y bacon" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Papas Fritas Mediana 200 gr. con cheddar y bacon", 25000);
        setProductoAgregado("Papas Fritas Mediana 200 gr. con cheddar y bacon");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Papas Fritas Mediana 200 gr. con cheddar y bacon") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Papas Fritas Mediana 200 gr. con cheddar y bacon" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Papas Noisette 200 gr.</h4>
      <p>Con agregado de cheddar.</p>
    </div>
    <span className="menu-precio">Gs. 25.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Papas Noisette 200 gr." ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Papas Noisette 200 gr.", 25000);
        setProductoAgregado("Papas Noisette 200 gr.");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Papas Noisette 200 gr.") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Papas Noisette 200 gr." ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Bastoncitos de Mandioca 200 gr.</h4>
      <p>Con agregado de cheddar.</p>
    </div>
    <span className="menu-precio">Gs. 15.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Bastoncitos de Mandioca 200 gr." ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Bastoncitos de Mandioca 200 gr.", 15000);
        setProductoAgregado("Bastoncitos de Mandioca 200 gr.");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Bastoncitos de Mandioca 200 gr.") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Bastoncitos de Mandioca 200 gr." ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Bolitas de Mandioca (12 unid.)</h4>
      <p>Rellenas de queso.</p>
    </div>
    <span className="menu-precio">Gs. 25.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Bolitas de Mandioca (12 unid.)" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Bolitas de Mandioca (12 unid.)", 25000);
        setProductoAgregado("Bolitas de Mandioca (12 unid.)");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Bolitas de Mandioca (12 unid.)") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Bolitas de Mandioca (12 unid.)" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Coxinhas rellenas (4 unid.)</h4>
      <p>De pollo y queso.</p>
    </div>
    <span className="menu-precio">Gs. 25.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Coxinhas rellenas (4 unid.)" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Coxinhas rellenas (4 unid.)", 25000);
        setProductoAgregado("Coxinhas rellenas (4 unid.)");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Coxinhas rellenas (4 unid.)") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Coxinhas rellenas (4 unid.)" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Croquetitas de pollo (9 unid.)</h4>
      <p>Rellenas de queso.</p>
    </div>
    <span className="menu-precio">Gs. 35.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Croquetitas de pollo (9 unid.)" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Croquetitas de pollo (9 unid.)", 35000);
        setProductoAgregado("Croquetitas de pollo (9 unid.)");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Croquetitas de pollo (9 unid.)") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Croquetitas de pollo (9 unid.)" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Cazuela de Choricitos al vino (12 unid.)</h4>
    </div>
    <span className="menu-precio">Gs. 40.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Cazuela de Choricitos al vino (12 unid.)" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Cazuela de Choricitos al vino (12 unid.)", 40000);
        setProductoAgregado("Cazuela de Choricitos al vino (12 unid.)");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Cazuela de Choricitos al vino (12 unid.)") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Cazuela de Choricitos al vino (12 unid.)" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Toppings</h4>
      <p>Carga adicional de queso cheddar y bacon.</p>
    </div>
    <span className="menu-precio">Gs. 5.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Toppings" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Toppings", 5000);
        setProductoAgregado("Toppings");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Toppings") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Toppings" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
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
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Muzzarella" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Muzzarella", 55000);
        setProductoAgregado("Muzzarella");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Muzzarella") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Muzzarella" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Napolitana</h4>
    </div>
    <span className="menu-precio">Gs. 65.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Napolitana" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Napolitana", 65000);
        setProductoAgregado("Napolitana");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Napolitana") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Napolitana" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Pepperoni</h4>
    </div>
    <span className="menu-precio">Gs. 65.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Pepperoni" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Pepperoni", 65000);
        setProductoAgregado("Pepperoni");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Pepperoni") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Pepperoni" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Catupiry con pollo</h4>
    </div>
    <span className="menu-precio">Gs. 65.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Catupiry con pollo" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Catupiry con pollo", 65000);
        setProductoAgregado("Catupiry con pollo");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Catupiry con pollo") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Catupiry con pollo" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Palmito</h4>
    </div>
    <span className="menu-precio">Gs. 65.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Palmito" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Palmito", 65000);
        setProductoAgregado("Palmito");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Palmito") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Palmito" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>4 Quesos</h4>
    </div>
    <span className="menu-precio">Gs. 75.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "4 Quesos" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("4 Quesos", 75000);
        setProductoAgregado("4 Quesos");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "4 Quesos") setProductoAgregado("");
      }}
    >
      {productoAgregado === "4 Quesos" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
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
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Palito sabores frutales" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Palito sabores frutales", 5000);
        setProductoAgregado("Palito sabores frutales");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Palito sabores frutales") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Palito sabores frutales" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Palito sabores cremosos</h4>
    </div>
    <span className="menu-precio">Gs. 8.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Palito sabores cremosos" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Palito sabores cremosos", 8000);
        setProductoAgregado("Palito sabores cremosos");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Palito sabores cremosos") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Palito sabores cremosos" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>En vasitos 200 gr.</h4>
    </div>
    <span className="menu-precio">Gs. 12.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "En vasitos 200 gr." ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("En vasitos 200 gr.", 12000);
        setProductoAgregado("En vasitos 200 gr.");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "En vasitos 200 gr.") setProductoAgregado("");
      }}
    >
      {productoAgregado === "En vasitos 200 gr." ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
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
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Gaseosas" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Gaseosas", 10000);
        setProductoAgregado("Gaseosas");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Gaseosas") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Gaseosas" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Agua Tónica</h4>
    </div>
    <span className="menu-precio">Gs. 10.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Agua Tónica" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Agua Tónica", 10000);
        setProductoAgregado("Agua Tónica");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Agua Tónica") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Agua Tónica" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Monster</h4>
    </div>
    <span className="menu-precio">Gs. 20.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Monster" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Monster", 20000);
        setProductoAgregado("Monster");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Monster") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Monster" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Agua Mineral</h4>
    </div>
    <span className="menu-precio">Gs. 8.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Agua Mineral" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Agua Mineral", 8000);
        setProductoAgregado("Agua Mineral");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Agua Mineral") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Agua Mineral" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Del Valle 1 L</h4>
    </div>
    <span className="menu-precio">Gs. 12.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Del Valle 1 L" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Del Valle 1 L", 12000);
        setProductoAgregado("Del Valle 1 L");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Del Valle 1 L") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Del Valle 1 L" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Del Valle 200 ml</h4>
    </div>
    <span className="menu-precio">Gs. 5.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Del Valle 200 ml" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Del Valle 200 ml", 5000);
        setProductoAgregado("Del Valle 200 ml");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Del Valle 200 ml") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Del Valle 200 ml" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>
</div>


    
<div className="bebidas-categoria">
  <h3>CERVEZAS</h3>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Chopp Munich 330 ml</h4>
    </div>
    <span className="menu-precio">Gs. 10.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Chopp Munich 330 ml" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Chopp Munich 330 ml", 10000);
        setProductoAgregado("Chopp Munich 330 ml");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Chopp Munich 330 ml") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Chopp Munich 330 ml" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Chopp Munich 500 ml</h4>
    </div>
    <span className="menu-precio">Gs. 15.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Chopp Munich 500 ml" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Chopp Munich 500 ml", 15000);
        setProductoAgregado("Chopp Munich 500 ml");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Chopp Munich 500 ml") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Chopp Munich 500 ml" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Chopp Heineken 350 ml</h4>
    </div>
    <span className="menu-precio">Gs. 15.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Chopp Heineken 350 ml" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Chopp Heineken 350 ml", 15000);
        setProductoAgregado("Chopp Heineken 350 ml");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Chopp Heineken 350 ml") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Chopp Heineken 350 ml" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Chopp Pilsen 330 ml</h4>
    </div>
    <span className="menu-precio">Gs. 10.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Chopp Pilsen 330 ml" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Chopp Pilsen 330 ml", 10000);
        setProductoAgregado("Chopp Pilsen 330 ml");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Chopp Pilsen 330 ml") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Chopp Pilsen 330 ml" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Chopp Pilsen 500 ml</h4>
    </div>
    <span className="menu-precio">Gs. 15.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Chopp Pilsen 500 ml" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Chopp Pilsen 500 ml", 15000);
        setProductoAgregado("Chopp Pilsen 500 ml");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Chopp Pilsen 500 ml") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Chopp Pilsen 500 ml" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Coronita 210 ml</h4>
    </div>
    <span className="menu-precio">Gs. 12.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Coronita 210 ml" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Coronita 210 ml", 12000);
        setProductoAgregado("Coronita 210 ml");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Coronita 210 ml") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Coronita 210 ml" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Corona 710 ml</h4>
    </div>
    <span className="menu-precio">Gs. 25.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Corona 710 ml" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Corona 710 ml", 25000);
        setProductoAgregado("Corona 710 ml");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Corona 710 ml") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Corona 710 ml" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Heineken lata 250 ml</h4>
    </div>
    <span className="menu-precio">Gs. 10.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Heineken lata 250 ml" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Heineken lata 250 ml", 10000);
        setProductoAgregado("Heineken lata 250 ml");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Heineken lata 250 ml") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Heineken lata 250 ml" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Heineken botella 250 ml</h4>
    </div>
    <span className="menu-precio">Gs. 12.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Heineken botella 250 ml" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Heineken botella 250 ml", 12000);
        setProductoAgregado("Heineken botella 250 ml");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Heineken botella 250 ml") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Heineken botella 250 ml" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Heineken botella 660 ml</h4>
    </div>
    <span className="menu-precio">Gs. 25.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Heineken botella 660 ml" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Heineken botella 660 ml", 25000);
        setProductoAgregado("Heineken botella 660 ml");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Heineken botella 660 ml") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Heineken botella 660 ml" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Sol 330 ml</h4>
    </div>
    <span className="menu-precio">Gs. 13.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Sol 330 ml" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Sol 330 ml", 13000);
        setProductoAgregado("Sol 330 ml");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Sol 330 ml") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Sol 330 ml" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Amstel lata 250 ml</h4>
    </div>
    <span className="menu-precio">Gs. 9.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Amstel lata 250 ml" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Amstel lata 250 ml", 9000);
        setProductoAgregado("Amstel lata 250 ml");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Amstel lata 250 ml") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Amstel lata 250 ml" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Amstel botella 355 ml</h4>
    </div>
    <span className="menu-precio">Gs. 12.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Amstel botella 355 ml" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Amstel botella 355 ml", 12000);
        setProductoAgregado("Amstel botella 355 ml");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Amstel botella 355 ml") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Amstel botella 355 ml" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Amstel botella 650 ml</h4>
    </div>
    <span className="menu-precio">Gs. 20.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Amstel botella 650 ml" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Amstel botella 650 ml", 20000);
        setProductoAgregado("Amstel botella 650 ml");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Amstel botella 650 ml") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Amstel botella 650 ml" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>

  <div className="menu-producto">
    <div className="menu-producto-info">
      <h4>Antarctica lata 269 ml</h4>
    </div>
    <span className="menu-precio">Gs. 8.000</span>
    <button
      type="button"
      className={`menu-boton-agregar ${productoAgregado === "Antarctica lata 269 ml" ? "agregado" : ""}`}
      onClick={() => {
        agregarAlCarrito("Antarctica lata 269 ml", 8000);
        setProductoAgregado("Antarctica lata 269 ml");
      }}
      onAnimationEnd={() => {
        if (productoAgregado === "Antarctica lata 269 ml") setProductoAgregado("");
      }}
    >
      {productoAgregado === "Antarctica lata 269 ml" ? "✓ AGREGADO" : "+ AGREGAR"}
    </button>
  </div>
</div>

  </div>
</section>

{/* SECCIÓN: VENÍ A VISITARNOS */}
{/* SEPARADOR ENTRE BEBIDAS Y UBICACIÓN */}
<div className="separador-ubicacion">
  <span>★</span>
  <p>AMERICAN BAR PY</p>
  <span>★</span>
</div>
<section className="visitanos" id="ubicacion">
  <div className="visitanos-encabezado">
    <span>AMERICAN BAR PY · ASUNCIÓN</span>
    <h2>VENÍ A VISITARNOS</h2>
    <p>¡Te esperamos para vivir la experiencia americana!</p>
  </div>

  <div className="visitanos-contenido">
    <div className="visitanos-informacion">
      <div className="visitanos-dato">
        <h3>📍 DIRECCIÓN</h3>
        <p>
          Atilio Peña Machain N.º 1259<br />
          Entre Florida y San Antonio<br />
          Asunción, Paraguay
        </p>
      </div>

      <div className="visitanos-dato">
        <h3>🕒 HORARIOS</h3>
        <p>Martes a jueves: 18:00 a 00:00 hs</p>
        <p>Viernes y sábados: 18:00 a 01:00 hs</p>
      </div>

      <div className="visitanos-dato">
        <h3>📱 CONTACTO</h3>
        <a
          href="https://wa.me/595986764223"
          target="_blank"
          rel="noopener noreferrer"
        >
          0986 764 223
        </a>
      </div>

      <a
        className="visitanos-whatsapp"
        href="https://wa.me/595986764223"
        target="_blank"
        rel="noopener noreferrer"
      >
        ESCRIBINOS POR WHATSAPP ↗
      </a>
    </div>

    <div className="visitanos-mapa">
      
      <iframe
        title="Ubicación de American Bar Py"
       src="https://www.google.com/maps?q=Atilio%20Pe%C3%B1a%20Machain%201259%2C%20Asunci%C3%B3n%2C%20Paraguay&output=embed"
        width="100%"
        height="420"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        href="https://maps.app.goo.gl/B8MYUZf5p5JTERun9"
        target="_blank"
        rel="noopener noreferrer"
      >
        ABRIR EN GOOGLE MAPS ↗
      </a>
    </div>
  </div>
</section>
      </main>
    </div>
  )
}

export default App

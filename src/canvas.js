import React, { useRef, useEffect } from "react";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const num = 200;
  const tamaño = 3;
  const elementos = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Configuración inicial del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Inicializa los elementos de la nevada
    inicio();

    // Dibuja la nevada de forma estática
    nevada();

    function inicio() {
      for (let i = 0; i < num; i++) {
        elementos[i] = {
          x: Math.ceil(Math.random() * canvas.width),
          y: Math.ceil(Math.random() * canvas.height),
          tamaño: Math.random() * tamaño,
        };
      }
    }

    function nevada() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < num; i++) {
        const e = elementos[i];
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(e.x, e.y, e.tamaño, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }, [num, tamaño]); // Ejecuta el efecto cada vez que cambian `num` o `tamaño`

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;

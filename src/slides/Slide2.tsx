import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Slide2 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const fps = 30;

    class Wave {
      constructor(
        public amplitude: number,
        public period: number,
        public phase: number,
        public verticalShift: number,
        public color: string
      ) {}

      draw(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        time: number
      ) {
        ctx.beginPath();
        ctx.moveTo(0, height / 2);

        for (let x = 0; x < width; x++) {
          const y =
            Math.sin((x / width) * this.period + this.phase + time * 0.2) *
              this.amplitude +
            Math.sin(time * 0.1) * this.verticalShift +
            height / 2;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = this.color;
        ctx.stroke();
      }
    }

    const waves = [
      new Wave(30, 4, 0, 10, "rgba(0, 255, 0, 0.2)"),
      new Wave(20, 6, 1, 15, "rgba(0, 200, 0, 0.2)"),
      new Wave(40, 3, 2, 5, "rgba(0, 150, 0, 0.2)"),
    ];

    let time = 0;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave) =>
        wave.draw(ctx, canvas.width, canvas.height, time)
      );

      time += 0.05;
      setTimeout(() => requestAnimationFrame(animate), 1000 / fps);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-900 filter blur-3xl opacity-50"></div>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <motion.div
        className="relative z-10 max-w-5xl w-full mx-auto px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row">
            <motion.div variants={itemVariants} className="flex-grow pr-8">
              <h2 className="text-4xl font-bold mb-6 text-white">Tuz Ruhu</h2>
              <p className="text-xl text-gray-300 mb-6">
                Tuz ruhu, kimyasal adıyla hidroklorik asit (HCl), özellikle
                evlerde kireç ve pas çözmek için kullanılan güçlü ve korozif bir
                asittir. Metal yüzeylerle temas ettiğinde aşındırıcı etki yapar
                ve hidrojen gazı açığa çıkar. Suya karıştığında asidik yapısı
                nedeniyle pH seviyesini düşürür. Solunduğunda akciğerlere zarar
                verebilir, astım gibi solunum hastalıklarını tetikleyebilir,
                ciltle temasında ise ciddi yanıklara neden olur. Evde
                kullanırken mutlaka koruyucu ekipmanlar kullanılmalıdır. Çevreye
                zarar verip su ve toprak kirliliğine yol açabileceği için
                dikkatle kullanılmalıdır.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0"
            >
              <img
                src="/kimya-sunumu/tuz-ruhu.jpg"
                alt="Muriatic Salt"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
          <motion.div
            variants={itemVariants}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Özellikleri
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Yüksek Derecede Asidik (pH &lt; 1)</li>
                <li>Renksiz</li>
                <li>Güçlü Ve Keskin Koku</li>
                <li>Metallerle yüksek seviyede etkileşim</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Sıklıkla Kullanıldığı Yerler
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Metal Yüzey Temizleme</li>
                <li>Yüzme Havuzlarında PH değerini düzenleme</li>
                <li>Diğer Pek Çok Kimyasalın Üretimi</li>
                <li>Ev Temizleme</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Slide2;

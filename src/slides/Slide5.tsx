import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const sources = [
  {
    id: 1,
    title: "Çamaşır Sodası Ne İşe Yarar | Trendyol",
    url: "https://www.trendyol.com/s/camasir-sodasi-ne-ise-yarar-kullanim-alanlari-nelerdir-blog",
  },
  {
    id: 2,
    title: "Sabah Gazetesi | Çamaşır Sodası",
    url: "https://www.sabah.com.tr/egitim/camasir-sodasi-asit-mi-baz-mi-camasir-sodasinin-ph-degeri-nedir-e1-5464147#:~:text=Sodyum%20karbonat%20yani%20%C3%A7ama%C5%9F%C4%B1r%20sodas%C4%B1,%C4%B1%2011%20olarak%20kar%C5%9F%C4%B1m%C4%B1za%20%C3%A7%C4%B1kar.",
  },

  {
    id: 3,
    title: "MedicalPark | Limon Tuzu",
    url: "https://www.medicalpark.com.tr/limon-tuzunun-faydalari/hg-4634#:~:text=Sitrik%20asit%20olarak%20da%20bilinir,ve%20temizlik%20gibi%20alanlarda%20kullan%C4%B1l%C4%B1r.",
  },
  {
    id: 4,
    title: "Wikipedia | Limon Tuzu",
    url: "https://tr.wikipedia.org/wiki/Sitrik_asit",
  },
  {
    id: 5,
    title: "Sabah Gazetesi | Tuz Ruhu",
    url: "https://www.sabah.com.tr/egitim/tuz-ruhu-nedir-tuz-ruhu-asit-mi-baz-mi-e1-5442164#:~:text=Tuz%20ruhunun%20kimyasal%20yap%C4%B1s%C4%B1%20asittir,)%20de%C4%9Feri%20%2D6.3%20olarak%20bilinir.&text=Tuz%20ruhunun%20pH%20de%C4%9Feri%201.08%20olarak%20belirlenmi%C5%9Ftir.",
  },
  {
    id: 6,
    title: "Wikipedia | Tuz Ruhu",
    url: "https://tr.wikipedia.org/wiki/Hidroklorik_asit",
  },
  { id: 7, title: "EPA", url: "https://www.epa.gov/" },
];

const itemsPerPage = 3;

const Slide5 = () => {
  const [currentPage, setCurrentPage] = useState(1);
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
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const paginatedSources = sources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="relative h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-black opacity-50"></div>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-[10px] rounded-3xl p-8 shadow-lg border border-white border-opacity-30"
        >
          <h2 className="text-4xl font-bold mb-8 text-white text-center">
            Kaynakça
          </h2>
          <ul className="space-y-4">
            {paginatedSources.map((source) => (
              <motion.li key={source.id} variants={itemVariants}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-green-300 hover:text-green-100 transition-colors"
                >
                  {source.title}
                </a>
              </motion.li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              Önceki
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(sources.length / itemsPerPage))
                )
              }
              disabled={
                currentPage === Math.ceil(sources.length / itemsPerPage)
              }
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              Sonraki
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide5;

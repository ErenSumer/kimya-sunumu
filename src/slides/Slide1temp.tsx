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
      new Wave(30, 4, 0, 10, "rgba(255, 165, 0, 0.2)"),
      new Wave(20, 6, 1, 15, "rgba(255, 140, 0, 0.2)"),
      new Wave(40, 3, 2, 5, "rgba(255, 69, 0, 0.2)"),
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
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900 to-gray-900 filter blur-3xl opacity-50"></div>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <motion.div
        className="relative z-10 max-w-5xl w-full mx-auto px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl font-bold mb-6 text-white">
              Son Dakika: Ev Temizliği Kazası
            </h2>
            <h3 className="text-2xl font-semibold text-orange-300 mb-4">
              Karışan Kimyasallar Apartmanı Tahliye Ettirdi
            </h3>
            <p className="text-xl text-gray-300 mb-6">
              Ankara'nın Çankaya ilçesinde, bir apartman dairesinde meydana
              gelen kimyasal reaksiyon sonucu 20 kişi hastaneye kaldırıldı.
              Olay, ev temizliği sırasında tuz ruhu ve çamaşır sodasının
              karıştırılması sonucu ortaya çıkan zehirli gazlar nedeniyle
              meydana geldi.
            </p>
            <p className="text-xl text-gray-300 mb-6">
              Görgü tanıklarına göre, 3. kattaki dairede temizlik yapan Ayşe K.
              (45), banyodaki inatçı lekeleri çıkarmak için tuz ruhu ve çamaşır
              sodasını karıştırdı. Oluşan yoğun ve keskin kokulu gaz kısa sürede
              tüm binaya yayıldı. Nefes darlığı ve gözlerde yanma şikayetiyle
              komşular durumu yetkililere bildirdi.
            </p>
            <p className="text-xl text-gray-300 mb-6">
              Olay yerine gelen itfaiye ekipleri, binayı tahliye ederken AFAD
              ekipleri de kimyasal ölçümler yaptı. Uzmanlar, tuz ruhu (HCl) ve
              çamaşır sodası (Na₂CO₃) karışımının tehlikeli klor gazı
              oluşturduğunu belirtti. Ayrıca, olayda kullanılan limon tuzunun
              (sitrik asit) da metal borularda aşınmaya neden olabileceği
              vurgulandı.
            </p>
            <div className="bg-orange-800 bg-opacity-30 p-4 rounded-lg">
              <p className="text-lg text-orange-200 font-semibold">
                Uyarı: Ev temizliğinde kullanılan kimyasalları asla
                karıştırmayın. Tuz ruhu, limon tuzu ve çamaşır sodası gibi
                ürünleri ayrı ayrı ve üreticinin talimatlarına uygun şekilde
                kullanın. Yeterli havalandırma sağlayın ve şüpheli durumlarda
                hemen 112'yi arayın.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Slide2;

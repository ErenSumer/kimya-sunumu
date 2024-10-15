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
      new Wave(30, 4, 0, 10, "rgba(0, 0, 0, 0.2)"),
      new Wave(20, 6, 1, 15, "rgba(200, 0, 0, 0.2)"),
      new Wave(40, 3, 2, 5, "rgba(150, 0, 0, 0.2)"),
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
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900 to-gray-900 filter blur-3xl opacity-50"></div>
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
              <h2 className="text-4xl font-bold mb-6 text-white">
                Çamaşır Sodası
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Sodyum karbonat (Na₂CO₃), halk arasında çamaşır sodası olarak
                bilinir ve güçlü bir bazik yapıya sahiptir. Özellikle
                çamaşırların temizlenmesinde deterjanların etkisini artıran
                çamaşır sodası, yağ ve kir çözme özellikleriyle öne çıkar.
                Kimyasal özellikleri bakımından, suyla karıştığında bazik bir
                çözelti oluşturur ve pH seviyesini artırarak asidik kirlere
                karşı etkili olur. Yağ lekeleri gibi organik kirlerin çözülmesi
                bu bazik ortamda kolaylaşır. Çamaşır sodası cilde temas
                ettiğinde hafif tahriş yapabilir, bu nedenle eldivenle
                kullanılmalıdır. Toplum sağlığı açısından değerlendirildiğinde,
                çamaşır sodası, diğer güçlü temizlik maddelerine göre daha
                güvenli bir alternatiftir. Ancak doğrudan solunduğunda veya
                gözle temas ettiğinde tahriş edici olabilir. Çevre açısından da
                doğada kolayca çözünebilen bir yapıya sahip olduğu için çevre
                dostu kabul edilir.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0"
            >
              <img
                src="https://iasbh.tmgrup.com.tr/87cbc5/650/344/0/0/752/395?u=https://isbh.tmgrup.com.tr/sbh/2023/10/31/camasir-sodasi-formulu-camasir-sodasi-kimyasal-formulu-nedir-nasil-gosterilir-e1-1698758111632.jpg"
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
                <li>Yüksek Derecede Bazik (pH = 11)</li>
                <li>Beyaz Renkli</li>
                <li>Mermer Yüzeyler İle Etkileşim</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Sıklıkla Kullanıldığı Yerler
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Çamaşır Temizliği</li>
                <li>Su Yumuşatma</li>
                <li>Koku Giderici</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Slide2;

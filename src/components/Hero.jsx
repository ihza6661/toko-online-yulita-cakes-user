// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const slides = [
//   {
//     title: "",
//     description: "",
//     image:
//       "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     title: "",
//     description: "",
//     image:
//       "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=2850&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     title: "",
//     description: "",
//     image:
//       "https://images.unsplash.com/photo-1602630209855-dceac223adfe?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
// ];

// export default function HeroSlider() {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
//   const prevSlide = () =>
//     setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

//   return (
//     <div className="relative w-full h-[300px] sm:h-[560px] overflow-hidden rounded-lg">
//       <AnimatePresence>
//         <motion.div
//           key={current}
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -50 }}
//           transition={{ duration: 0.5 }}
//           className="absolute inset-0 w-full h-full flex items-center justify-center"
//           style={{
//             backgroundImage: `url(${slides[current].image})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="bg-white/10 text-brown-800 p-8 rounded-2xl shadow-lg backdrop-blur-md text-center">
//             <h1 className="text-4xl font-extrabold font-serif">
//               {slides[current].title}
//             </h1>
//             <p className="text-lg font-light mt-2">
//               {slides[current].description}
//             </p>
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       <button
//         onClick={prevSlide}
//         className="absolute left-5 top-1/2 transform -translate-y-1/2 p-3 bg-pink-500/80 text-white rounded-full shadow-md hover:bg-pink-600 transition"
//       >
//         <ChevronLeft size={24} />
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-5 top-1/2 transform -translate-y-1/2 p-3 bg-pink-500/80 text-white rounded-full shadow-md hover:bg-pink-600 transition"
//       >
//         <ChevronRight size={24} />
//       </button>
//     </div>
//   );
// }

const HeroSection = () => {
  return (
    <div className="relative w-full h-[80vh] bg-cover bg-center rounded-2xl"
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1602630209855-dceac223adfe?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6 rounded-2xl">
        <h1 className="text-5xl md:text-6xl text-white font-bold mb-4">Kue Lezat & Segar</h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl">
        Nikmati kelezatan kue terbaik yang dibuat dengan cinta dan bahan segar, cocok untuk setiap momen spesial.
        </p>
        <button className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white text-lg font-semibold rounded-full shadow-lg">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;

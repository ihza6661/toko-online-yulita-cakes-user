import React from "react";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <>
      {/* Call to Action */}
      <section className="section-padding bg-pink-50 dark:accent">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 dark:text-white mb-6">
              Siap Pesan Kue Impian Anda?
            </h2>
            <p className="text-lg text-gray-600 dark:text-pink-100 max-w-2xl mx-auto mb-8">
              Cari koleksi kue buatan tangan kami atau pesan desain kustom untuk
              acara spesial Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/collection"
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Belanja Sekarang
              </a>
              <a
                href="/contact"
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Kontak Kami
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;

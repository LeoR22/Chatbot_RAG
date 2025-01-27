// src/app/page.js

import Image from 'next/image';
import Chatbot from './components/Chatbot';  

export default function Home() {
  return (
    //<div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] w-full">
      <main className="flex flex-col items-center gap-8">
        {/* Ajustar el tamaño del logo */}
        <Image
          className="dark:invert"
          src="/log.png"
          alt="Next.js logo"
          width={240} // Aumentar el ancho del logo
          height={80} // Aumentar la altura del logo
          priority
        />
        {/* Centrar el texto y darle un estilo más llamativo */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          Bienvenido a DataGenie
        </h1>
        <Chatbot />
      </main>
    </div>
  );
}


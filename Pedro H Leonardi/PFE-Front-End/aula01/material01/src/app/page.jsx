import Image from "next/image";

export default function Home() {
  return (
    <>
    {/* contiener - Base */}
    {/* svh - SVH é uma medida que calcula com base no display da tela responsiva */}

      <div className="container mx-auto bg-red-500 px-2 py-[20px]">{/* py-[calc[100svh-20px]] */}
        <div className="bg-emerald-900">
        <h2 className="text-2xl ms-4 bg-amber-400">Volta Pudim.com.br</h2>
        <p className="text-xs text-end">texto muito pequeno</p>
        <p className="text-sm text-center">texto pequeno</p>
        <p className="text-base text-start">texto normal</p>
        <p className="text-lg"> texto maior</p>
        <p className="text-lg">Texto<span className="font-bold"> muito </span>grande</p>

        </div>
      </div>

      <h2>Testando Cores</h2>
      <div className="bg-[#ff45] hover:bg-blue-500/60 w-auto h-[100svh]"></div>
      <div className="bg-[var(--color-error)]">chamando variavel</div>
      <section className="container mx-auto">
        <h2 className="text-5xl font-bold text-red-500">Aprendendo Flex do tailwindo Css</h2>
        
      {/* FLEX */}
          <div className="flex flex-collum gap-2 justify-center items-center">
            <div className="h-15 w-10 bg-blue-400 rounded-xl"></div>
            <div className="h-10 w-10 bg-blue-400 rounded-xl"></div>
            <div className="h-15 w-10 bg-blue-400 rounded-xl"></div>
            <div className="h-10 w-10 bg-blue-400 rounded-xl"></div>
          </div>

{/* Grid */}
          <div className="grid grid-cols-4 gap-5">
            <div className="h-15 bg-blue-400 rounded-xl col-span-2"></div>
            <div className="h-10 bg-blue-400 rounded-xl"></div>
            <div className="h-15 bg-blue-400 rounded-xl"></div>
            <div className="h-10 bg-blue-400 rounded-xl"></div>
          </div>
      </section>

      <button className="bg-red-500 houver:bg-red-600:active:bg-green-500 text-white">Clique Me</button>
    
    </>
  );
}

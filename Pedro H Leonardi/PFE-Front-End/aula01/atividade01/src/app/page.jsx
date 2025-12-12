import Image from "next/image";


export default function Home() {
  return (
    <>
      <nav className="grid grid-cols-12 bg-white text-black h-15 items-center text-md">

        <div className="flex justify-center items-center">

          <Image
            src="/letter-g.png"
            alt="Logo do site"
            width={50}
            height={50}
          />


          <div className="font-bold font-size-xl">Grammarly</div>
        </div>

        <div className="col-span-9 pe-60">
          <ul className="flex flex-row ">
            <li className="mx-auto cursor-pointer hover:text-gray-500 hover:scale-105">Why Grammarly</li>
            <li className="mx-auto cursor-pointer hover:text-gray-500 hover:scale-105">For Work</li>
            <li className="mx-auto cursor-pointer hover:text-gray-500 hover:scale-105">For Education</li>
            <li className="mx-auto cursor-pointer hover:text-gray-500 hover:scale-105">Compare Plans</li>
            <li className="mx-auto cursor-pointer hover:text-gray-500 hover:scale-105">Tools & Guides</li>
          </ul>
        </div>

        <div className="flex flex-row gap-5 col-span-2">
          <div className="gap-5 mx-auto font-bold items-center flex flex-row hover:text-gray-500 hover:scale-105">My gramaty</div>
          <div className="gap-5 mx-auto bg-green-600 rounded-xl p-2 text-white font-bold cursor-pointer hover:scale-105 transition duration-300 ease-in-out" >Start a free trial</div>
        </div>
      </nav>

      <div className="flex flex-row gap-5 bg-gray-300 text-black h-10 items-center text-size-xl" >
        <div className="font-bold ms-5 hover:text-gray-500 hover:scale-105">Business</div>
        <div>
          <div className="flex flex-row gap-10 ms-15">
            <div className="mx-auto cursor-pointer hover:text-gray-500 hover:scale-105">Pricing</div>
            <div className="mx-auto cursor-pointer hover:text-gray-500 hover:scale-105">Solution</div>
            <div className="mx-auto cursor-pointer hover:text-gray-500 hover:scale-105">Leans</div>
            <div className="mx-auto cursor-pointer hover:text-gray-500 hover:scale-105">Security</div>
          </div>
        </div>
      </div>

      <div className="h-200 bg-gray-900 flex">
  <div className="container flex gap-5 mx-auto">
    <div className="w-1/2">
      <div className="h-full flex flex-col justify-center gap-10 text-2xl items-start">
        <div className="text-4xl font-bold">
          All Your Business Can Run With
        </div>
        <div className="w-150">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit debitis non
          Miguel Foda necessitatibus eligendi? Porro explicabo molestiae, totam
          pariatur cum facere non amet? Id corrupti deserunt recusandae saepe sint
          nisi architecto.
        </div>
        <div className="bg-white rounded-xl p-2 text-black font-bold cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
          Start Free Trial
        </div>
      </div>
    </div>

    <div className="w-1/2">
      <div className="flex justify-center items-center h-full">
        <div className="w-120 h-120 flex justify-center">
          <img src="/banner-removebg-preview.png" alt="banner imagem" />
        </div>
      </div>
    </div>
  </div>



      </div>
      <footer className="h-50 bg-gray-300 flex items-center">
        <div className="w-full">
          <div className="flex flex-col items-center justify-center text-black text-lg ">
            <div>Nome empresa Ficticica </div>
            <div>empresa.ficticia@email.com</div>
            <div>(11) 0000 0000</div>
            <div className="mt-5">© 2025 Todos os direitos reservados</div>
          </div>
        </div>

      </footer>

    </>
  );
}

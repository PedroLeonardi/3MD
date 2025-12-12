import Image from "next/image";




export default function Home() {

  const itens = [
    {
      id: 1,
      url: "/16x9.png",
      titulo: "Chatbot Inteligente para Atendimento",
      descricao: "Assistente virtual com IA treinada para responder clientes 24/7, reduzindo custos de suporte.",
      tags: ["IA", "chatbot", "atendimento", "automação"]
    },
    {
      id: 2,
      url: "/16x9.png",
      titulo: "Análise Preditiva de Dados",
      descricao: "Modelo de IA que identifica tendências e gera previsões para apoiar decisões estratégicas.",
      tags: ["IA", "análise de dados", "previsão", "business intelligence"]
    },
    {
      id: 3,
      url: "/16x9.png",
      titulo: "Digitalização Inteligente de Documentos",
      descricao: "Sistema OCR com IA que converte PDFs e imagens em texto editável, organizando automaticamente.",
      tags: ["IA", "OCR", "documentos", "automação"]
    },
    {
      id: 4,
      url: "/16x9.png",
      titulo: "Classificação Automática de E-mails",
      descricao: "Ferramenta que organiza e-mails, priorizando os mais importantes e sugerindo respostas rápidas.",
      tags: ["IA", "e-mail", "produtividade", "automação"]
    },
    {
      id: 5,
      url: "/16x9.png",
      titulo: "Marketing Personalizado com IA",
      descricao: "Plataforma que gera campanhas segmentadas automaticamente com base no perfil do cliente.",
      tags: ["IA", "marketing", "segmentação", "vendas"]
    },
    {
      id: 6,
      url: "/16x9.png",
      titulo: "Seleção Automatizada de Currículos",
      descricao: "IA que analisa currículos e destaca candidatos mais alinhados com as vagas abertas.",
      tags: ["IA", "RH", "recrutamento", "automação"]
    },
    {
      id: 7,
      url: "/16x9.png",
      titulo: "Controle Financeiro Inteligente",
      descricao: "Sistema que detecta padrões em despesas, gera relatórios automáticos e alerta sobre riscos.",
      tags: ["IA", "finanças", "gestão", "eficiência"]
    },
    {
      id: 8,
      url: "/16x9.png",
      titulo: "Monitoramento de Segurança com IA",
      descricao: "Análise em tempo real de câmeras e logs para detectar atividades suspeitas.",
      tags: ["IA", "segurança", "monitoramento", "prevenção"]
    },
    {
      id: 9,
      url: "/16x9.png",
      titulo: "Geração Automática de Relatórios",
      descricao: "Ferramenta que cria relatórios executivos completos a partir de dados brutos em segundos.",
      tags: ["IA", "relatórios", "automação", "produtividade"]
    }
  ];

  const cores = ["text-amber-400", "text-green-500", "text-gray-100"];

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
            <li className="mx-auto cursor-pointer hover:text-gray-500 hover:scale-105 bg-">Why Grammarly</li>
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
                Grammarly Business combines AI communication assistence with the knowleedge of
                your entire organization to achive results. Experience work with the intelligence
                you need, wher you need it, where you're already working.
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
      <div className="bg-[#303136] w-full py-15">


        {/* grid card */}
        <div className=" mx-5 md:mx-20 lg:mx-10 2xl:mx-10 grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 ">  {/* GRID */}

          {/*MAP */}
          {itens.map(item => (

            <div key={item.id} className="w-full h-full bg-cardPrimary rounded-sm hover:scale-101">{/*CARD */}
              <div className="py-5 min-h-70 w-full flex flex-col sm:flex-row lg:flex-col 2xl:flex-row sm:px-5 sm:py-7 lg:py-5 sm:min-h-70"> {/* CONTENT CARD */}
                <div className=" sm:flex sm:justify-center sm:items-center"> {/* IMG-CONTENT CARD */}
                  <div className="min-w-75 min-h-50  max-w-[75%] max-h-100  bg-amber-200 mx-auto sm:flex ">
                    <img src={item.url} className="w-full"/>
                  </div>
                </div>

                <div className="px-5 sm:flex sm:flex-col  w-full"> {/* TEXT-CONTENT CARD */}

                  <p className="text-start text-4xl ">{item.titulo}</p>
                  <p className="mt-5 mb-5">{item.descricao}</p>
                  <div className="flex flex-col h-full justify-between gap-1"> {/*Espaçamento butoes */}
                    <div className="flex gap-5 flex-wrap max-w-100 ">


                      {item.tags.map((tag, index) => (
                        <div key={index}>
                          <p className={`border-2  p-1 rounded ${cores[index % cores.length]}`}>
                            {tag}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="w-full flex justify-end md:pe-15 md:gap-15 gap-5 mt-2">
                      <button className=" px-2 hover:bg-blue-300 active:bg-gray-500 bg-blue-500 rounded-2xl text-lg">carinho</button>
                      <button className=" px-2 hover:bg-green-300 active:bg-gray-500 bg-green-500  rounded-2xl text-lg">compar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          ))}

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

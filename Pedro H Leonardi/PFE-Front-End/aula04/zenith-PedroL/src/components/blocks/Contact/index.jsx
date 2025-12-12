import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const Contact7 = ({
  title = "Contato",
  description = "Entre em contato conosco por meios dos nossos canais de atendimento ou fale com um de nossos colaboradores.",
  emailLabel = "Email",
  emailDescription = "Respondemos todos em até 24 hrs.",
  email = "example@shadcnblocks.com",
  officeLabel = "Escritório",
  officeDescription = "Compareça em nossa sede.",
  officeAddress = "1 Eagle St, Brisbane, QLD, 4000",
  phoneLabel = "Telefone",
  phoneDescription = "Segunda a Sexta, das 9hr as 18hr",
  phone = "+123 456 7890",
//   chatLabel = "Live Chat",
//   chatDescription = "Get instant help from our support team.",
//   chatLink = "Start Chat",
}) => {
  return (
    <section className="bg-background py-32">
      <div className="container">
        <div className="mb-14">
          <h1 className="mb-3 mt-2 text-balance text-3xl font-semibold md:text-4xl">
            {title}
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg">
            {description}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gray-200 rounded-lg p-6">
            <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
              <Mail className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{emailLabel}</p>
            <p className="text-muted-foreground mb-3">{emailDescription}</p>
            <a
              href={`mailto:${email}`}
              className="font-semibold hover:underline"
            >
              {email}
            </a>
          </div>
          <div className="bg-gray-200 rounded-lg p-6">
            <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
              <MapPin className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{officeLabel}</p>
            <p className="text-muted-foreground mb-3">{officeDescription}</p>
            <a href="#" className="font-semibold hover:underline">
              {officeAddress}
            </a>
          </div>
          </div>

          <div className="bg-gray-200 rounded-lg p-6 mx-auto w-1/2 mt-15">
            <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
              <Phone className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{phoneLabel}</p>
            <p className="text-muted-foreground mb-3">{phoneDescription}</p>
            <a href={`tel:${phone}`} className="font-semibold hover:underline">
              {phone}
            </a>
          {/* <div className="bg-muted rounded-lg p-6">
            <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
              <MessageCircle className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{chatLabel}</p>
            <p className="text-muted-foreground mb-3">{chatDescription}</p>
            <a href="#" className="font-semibold hover:underline">
              {chatLink}
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export { Contact7 };

// -----------------------------------------------------------------------
// Descricao: Biblioteca para utilizar o DHT11
//
// Autor: Cleisson
// Data: 01/09/2025
// Rev: 1.0
// -----------------------------------------------------------------------

// -----------------------------------------------------------------------
// Vetor para armazenamento dos valores do DHT11 de cada pino
// -----------------------------------------------------------------------
let values = []
for (i = 0; i <= 39; ++i)
{
	let info = {t: 0, h: 0};
	values.push(info);
}
// -----------------------------------------------------------------------


// -----------------------------------------------------------------------
// Construtor
// -----------------------------------------------------------------------
function dht11 (pin)
{
	this.pin = pin;
	this.readTemperature = () => readTemperature(pin);
	this.readHumidity = () => readHumidity(pin);

	setInterval (function ()
	{
		read(pin);
	}, 100);
}
// -----------------------------------------------------------------------


// -----------------------------------------------------------------------
// Função: Realiza a leitura dos valores do DHT11 do respectivo pino
// -----------------------------------------------------------------------
function read (pin)
{
	let r = ""

	digitalWrite(pin, 1);
	pinMode(pin, "output");
	digitalWrite(pin, 0);

	let watch = setWatch(function (i)
	{
		r = r + 1*(i.time - i.lastTime > 0.000065);
	}, pin, {edge: "falling", repeat: true});

	setTimeout(function ()
	{
		pinMode(pin, "input_pullup");
	}, 18);

	setTimeout(function ()
	{
		if (watch != null)
		{
			clearWatch(watch);
			watch = null;
		}

		if (r.length == 42)
		{
			let t = parseInt(r.substr(18, 8), 2);
			let h = parseInt(r.substr(2, 8), 2);
			let checksum = parseInt(r.substr(34, 8), 2);
			let checksumCalc = (t + h + parseInt(r.substr(10, 8), 2) + parseInt(r.substr(26, 8), 2)) & 0xFF;

			if (checksumCalc == checksum)
			{
				values[pin].t = t;
				values[pin].h = h;
			}
		}
	}, 50);
}
// -----------------------------------------------------------------------


// -----------------------------------------------------------------------
// Função: Realiza a leitura de temperatura do respectivo DHT11
// -----------------------------------------------------------------------
function readTemperature (pin)
{
	return values[pin].t;
}
// -----------------------------------------------------------------------


// -----------------------------------------------------------------------
// Função: Realiza a leitura de umidade do respectivo DHT11
// -----------------------------------------------------------------------
function readHumidity (pin)
{
	return values[pin].h;
}
// -----------------------------------------------------------------------


// -----------------------------------------------------------------------
// Exportando os Métodos
// -----------------------------------------------------------------------
module.exports =
{
	connect: (pin) => {return new dht11(pin)}
};
// -----------------------------------------------------------------------

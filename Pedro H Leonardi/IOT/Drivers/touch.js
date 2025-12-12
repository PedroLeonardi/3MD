// -----------------------------------------------------------------------
// Descricao: Biblioteca para utilizar o Touch Sensor
//
// Autor: Cleisson
// Data: 08/08/2025
// Rev: 1.0
// -----------------------------------------------------------------------


// -----------------------------------------------------------------------
// Endereco dos registradores
// -----------------------------------------------------------------------
const RTC_BASE = 0x3FF48000;
const RTC_IO_MUX_OFFSET = 0x0400;
const RTC_SENSOR_OFFSET = 0x0800;
// -----------------------------------------------------------------------


// -----------------------------------------------------------------------
// RTC IO Mux Registers
// -----------------------------------------------------------------------
const RTCIO_TOUCH_CFG_REG = RTC_BASE + RTC_IO_MUX_OFFSET + 0x0090;
	const RTCIO_TOUCH_XPD_BIAS = 31;		// 1 bit

const RTCIO_TOUCH_PAD0_REG = RTC_BASE + RTC_IO_MUX_OFFSET + 0x0094 + 4*0;
const RTCIO_TOUCH_PAD1_REG = RTC_BASE + RTC_IO_MUX_OFFSET + 0x0094 + 4*1;
const RTCIO_TOUCH_PAD2_REG = RTC_BASE + RTC_IO_MUX_OFFSET + 0x0094 + 4*2;
const RTCIO_TOUCH_PAD3_REG = RTC_BASE + RTC_IO_MUX_OFFSET + 0x0094 + 4*3;
const RTCIO_TOUCH_PAD4_REG = RTC_BASE + RTC_IO_MUX_OFFSET + 0x0094 + 4*4;
const RTCIO_TOUCH_PAD5_REG = RTC_BASE + RTC_IO_MUX_OFFSET + 0x0094 + 4*5;
const RTCIO_TOUCH_PAD6_REG = RTC_BASE + RTC_IO_MUX_OFFSET + 0x0094 + 4*6;
const RTCIO_TOUCH_PAD7_REG = RTC_BASE + RTC_IO_MUX_OFFSET + 0x0094 + 4*7;
const RTCIO_TOUCH_PAD8_REG = RTC_BASE + RTC_IO_MUX_OFFSET + 0x00B4;
const RTCIO_TOUCH_PAD9_REG = RTC_BASE + RTC_IO_MUX_OFFSET + 0x00B8;
	const RTCIO_TOUCH_PAD_START = 22;		// 1 bit
	const RTCIO_TOUCH_PAD_XPD = 20;			// 1 bit
	const RTCIO_TOUCH_PAD_TO_GPIO = 12;		// 1 bit

const RTCIO_TOUCH_PAD_REG =
[
	RTCIO_TOUCH_PAD0_REG,
	RTCIO_TOUCH_PAD1_REG,
	RTCIO_TOUCH_PAD2_REG,
	RTCIO_TOUCH_PAD3_REG,
	RTCIO_TOUCH_PAD4_REG,
	RTCIO_TOUCH_PAD5_REG,
	RTCIO_TOUCH_PAD6_REG,
	RTCIO_TOUCH_PAD7_REG,
	RTCIO_TOUCH_PAD8_REG,
	RTCIO_TOUCH_PAD9_REG
];
// -----------------------------------------------------------------------


// -----------------------------------------------------------------------
// Sensor Registers
// -----------------------------------------------------------------------
const SENS_SAR_TOUCH_OUT1_REG = RTC_BASE + RTC_SENSOR_OFFSET + 0x0070;
	const SENS_TOUCH_MEAS_OUT0 = 16;		// 16 bit
	const SENS_TOUCH_MEAS_OUT1 = 0;			// 16 bit

const SENS_SAR_TOUCH_OUT2_REG = RTC_BASE + RTC_SENSOR_OFFSET + 0x0074;
	const SENS_TOUCH_MEAS_OUT2 = 16;		// 16 bit
	const SENS_TOUCH_MEAS_OUT3 = 0;			// 16 bit

const SENS_SAR_TOUCH_OUT3_REG = RTC_BASE + RTC_SENSOR_OFFSET + 0x0078;
	const SENS_TOUCH_MEAS_OUT4 = 16;		// 16 bit
	const SENS_TOUCH_MEAS_OUT5 = 0;			// 16 bit

const SENS_SAR_TOUCH_OUT4_REG = RTC_BASE + RTC_SENSOR_OFFSET + 0x007C;
	const SENS_TOUCH_MEAS_OUT6 = 16;		// 16 bit
	const SENS_TOUCH_MEAS_OUT7 = 0;			// 16 bit

const SENS_SAR_TOUCH_OUT5_REG = RTC_BASE + RTC_SENSOR_OFFSET + 0x0080;
	const SENS_TOUCH_MEAS_OUT8 = 16;		// 16 bit
	const SENS_TOUCH_MEAS_OUT9 = 0;			// 16 bit

const SENS_SAR_TOUCH_CTRL2_REG = RTC_BASE + RTC_SENSOR_OFFSET + 0x0084;
	const SENS_TOUCH_START_FORCE = 13;		// 1 bit
	const SENS_TOUCH_START_EN = 12;			// 1 bit
	const SENS_TOUCH_START_FSM_EN = 11;		// 1 bit
	const SENS_TOUCH_MEAS_DONE = 10			// 1 bit

const SENS_SAR_TOUCH_OUT_REG =
[
	SENS_SAR_TOUCH_OUT1_REG,
	SENS_SAR_TOUCH_OUT1_REG,
	SENS_SAR_TOUCH_OUT2_REG,
	SENS_SAR_TOUCH_OUT2_REG,
	SENS_SAR_TOUCH_OUT3_REG,
	SENS_SAR_TOUCH_OUT3_REG,
	SENS_SAR_TOUCH_OUT4_REG,
	SENS_SAR_TOUCH_OUT4_REG,
	SENS_SAR_TOUCH_OUT5_REG,
	SENS_SAR_TOUCH_OUT5_REG
];
// -----------------------------------------------------------------------


// -----------------------------------------------------------------------
// Funcoes
// -----------------------------------------------------------------------
function touchPins (pin)
{
	switch (pin)
	{
		case 4:  return 0;
		case 0:	 return 1;
		case 2:  return 2;
		case 15: return 3;
		case 13: return 4;
		case 12: return 5;
		case 14: return 6;
		case 27: return 7;
		case 32: return 8;
		case 33: return 9;
		default: return -1;
	}
}

function touchBegin (pin)
{
	let touchPin = touchPins(pin);

	if (touchPin <= -1)
	{
		print("Pino inválido!");
		return -1;
	}

	pinMode(pin, "input");

	// Realiza a alimentacao do Sensor Touch, para geracao do dente de serra
	let reg = 1 << RTCIO_TOUCH_XPD_BIAS;
	poke32(RTCIO_TOUCH_CFG_REG, reg);
	// console.log((reg >>> 0).toString(16)); // 0x8000 0000

	// Realiza a alimentacao do Sensor Touch do respectivo pino,
	// Inicializando-o e roteando os sinais para as funcoes analogicas
	reg = peek32(RTCIO_TOUCH_PAD_REG[touchPin])	|
		  1 << RTCIO_TOUCH_PAD_START	|
		  1 << RTCIO_TOUCH_PAD_XPD 		|
		  1 << RTCIO_TOUCH_PAD_TO_GPIO;
	poke32(RTCIO_TOUCH_PAD_REG[touchPin], reg);
	// console.log((reg >>> 0).toString(16)); // 0x5258 3000 ou 0x0258 0000

	// Habilitando a FSM do Sensor Touch e habilitando para que as conversoes
	// sejam realizadas via Software
	reg = peek32(SENS_SAR_TOUCH_CTRL2_REG)	|
		  1 << SENS_TOUCH_START_FORCE 		|
		  1 << SENS_TOUCH_START_FSM_EN;
	poke32(SENS_SAR_TOUCH_CTRL2_REG, reg);
	// console.log((reg >>> 0).toString(16));	// 0x0040 2800

	return 0;
}

function touchRead (pin)
{
	let touchPin = touchPins(pin);

	if (touchPin <= -1)
	{
		print("Pino inválido!");
		return -1;
	}

	// console.log("Pino: " + touchPin);

	// Iniciando a leitura do sensor Touch
	let reg = peek32(SENS_SAR_TOUCH_CTRL2_REG) | 1 << SENS_TOUCH_START_EN;
	poke32(SENS_SAR_TOUCH_CTRL2_REG, reg);
	// console.log((reg >>> 0).toString(16));	// 0x0040 3800 ou 0x0040 3C00

	let timeCurrent = getTime();
	while (getTime() - timeCurrent < 0.005);

	let value = peek32(SENS_SAR_TOUCH_OUT_REG[touchPin]);
	value = value >>> (!(touchPin % 2))*16;
	value = value & 0xFFFF;

	// Encerrando a leitura do sensor Touch
	reg = peek32(SENS_SAR_TOUCH_CTRL2_REG) & ~(1 << SENS_TOUCH_START_EN);
	poke32(SENS_SAR_TOUCH_CTRL2_REG, reg);
	// console.log((reg >>> 0).toString(16));	// 0x0040 2800 ou 0x0040 2C00

	return value;
}
// -----------------------------------------------------------------------


// -----------------------------------------------------------------------
// Classe
// -----------------------------------------------------------------------
function touchSensor (pin)
{
	if (touchPins(pin) <= -1)
		pin = -1;
	
	this.pin = pin;
	this.read = () => touchRead(pin);
	touchBegin(pin);
}
// -----------------------------------------------------------------------


// -----------------------------------------------------------------------
// Exportando os Métodos
// -----------------------------------------------------------------------
module.exports = 
{
	connect: (pin) => {return new touchSensor(pin)}
};
// -----------------------------------------------------------------------

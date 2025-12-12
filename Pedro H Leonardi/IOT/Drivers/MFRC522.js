/* Copyright (c) 2015 Gordon Williams, Pur3 Ltd. See the file LICENSE for copying permission. */
// -----------------------------------------------------------------------
// Descricao: Biblioteca para utilizar o MFRC522
// Adaptação da biblioteca do Gordon Williams (Espruino) para o ESP32
//
// Autor: Cleisson
// Data: 07/10/2025
// Rev: 1.0
// -----------------------------------------------------------------------

let R =
{
	// Command and Status Registers
	COMMAND     	: 0x01 << 1,
	COMIEN      	: 0x02 << 1,
	DIVIEN      	: 0x03 << 1,
	COMIRQ      	: 0x04 << 1,
	DIVIRQ      	: 0x05 << 1,
	ERROR       	: 0x06 << 1,
	STATUS1			: 0x07 << 1,
	STATUS2			: 0x08 << 1,
	FIFODATA    	: 0x09 << 1,
	FIFOLEVEL   	: 0x0A << 1,
	WATERLEVEL		: 0x0B << 1,
	CONTROL			: 0x0C << 1,
	BITFRAMING  	: 0x0D << 1,
	COLLISION   	: 0x0E << 1,

	// Command Registers
	TXMODE			: 0x12 << 1,
	RXMODE			: 0x13 << 1,
	TXCONTROL   	: 0x14 << 1,
	TXASK			: 0x15 << 1,
	TXSELECT		: 0x16 << 1,
	RXSELECT		: 0x17 << 1,
	RXTHRESHOLD		: 0x18 << 1,
	DEMODULATOR		: 0x19 << 1,
	TXMIFARE		: 0x1C << 1,
	RXMIFARE		: 0x1D << 1,
	UARTSPEED		: 0x1F << 1,

	// Configuration Registers
	CRCH			: 0x21 << 1,
	CRCL			: 0x22 << 1,
	MODWIDTH		: 0x24 << 1,
	RFCONFIG		: 0x26 << 1,
	GSN				: 0x27 << 1,
	CWGSP			: 0x28 << 1,
	MODGSP			: 0x29 << 1,
	TMODE       	: 0x2A << 1,
	TPRESCALER  	: 0x2B << 1,
	TRELOADH    	: 0x2C << 1,
	TRELOADL    	: 0x2D << 1,
	TCOUNTH			: 0x2E << 1,
	TCOUNTL			: 0x2F << 1,

	// Test Registers
	TESTSIGNAL1		: 0x31 << 1,
	TESTSIGNAL2		: 0x32 << 1,
	TESTPINENABLE	: 0x33 << 1,
	TESTPINVALUE	: 0x34 << 1,
	TESTBUS			: 0x35 << 1,
	TESTAUTO		: 0x36 << 1,
	VERSION     	: 0x37 << 1,
	TESTANALOG		: 0x38 << 1,
	TESTDAC1		: 0x39 << 1,
	TESTDAC2		: 0x3A << 1,
	TESTADC			: 0x3B << 1
};

let PICC =
{
	REQA : 0x26,
	SELECT1 : 0x93
};

let PCD =
{ 
	IDLE : 0x00,
	TRANSCIEVE : 0x0C
};

function MFRC522(spi, cs)
{
	this.spi = spi;

	if (spi == SPI1 && cs == undefined)
		this.cs = 15;
	else if (spi == SPI2 && cs == undefined)
		this.cs = 5;
	else
		this.cs = cs;
}

MFRC522.prototype.r = function(addr)
{
	return this.spi.send([addr | 0x80, 0x00], this.cs)[1];
};

MFRC522.prototype.ra = function(addr, c)
{
	let a = new Uint8Array(c + 1);
	a.fill(addr | 0x80);
	a[c] = 0x00;
	return this.spi.send(a, this.cs).slice(1);
};

MFRC522.prototype.w = function(addr, data)
{
	this.spi.send([addr & 0x7F, data], this.cs);
};

MFRC522.prototype.antenna = function(on)
{
	if (on)
		this.w(R.TXCONTROL, this.r(R.TXCONTROL) | 0x03);
	else
		this.w(R.TXCONTROL, this.r(R.TXCONTROL) & ~0x03);
};

MFRC522.prototype.init = function()
{
	// Soft Reset
	this.w(R.COMMAND, 0x0F);
	let lastTime = getTime();
	while ((this.r(R.COMMAND) & 0x10) && (getTime - lastTime < 0.1));

	this.w(R.TXMODE, 0x00);		// Reset value: 0x00
	this.w(R.RXMODE, 0x00);		// Reset value: 0x00
	this.w(R.MODWIDTH, 0x26);	// Reset value: 0x26
	
	this.w(R.TMODE, 0x80);
	this.w(R.TPRESCALER, 0xA9);
	this.w(R.TRELOADH, 0x00);	// 0x03
	this.w(R.TRELOADL, 0xFF);	// 0xE8
	this.w(R.TXASK, 0x40);
	this.w(R.TMODE, 0x3D);
	//this.w(R.RFCONFIG, 0x78);
	this.antenna(1);
};

MFRC522.prototype.req = function(data)
{  
	this.w(R.COMMAND, PCD.IDLE);
	this.w(R.COMIEN, 0x80 | 0x77);
	this.w(R.COMIRQ, 0x7F);			// clear IRQs
	this.w(R.FIFOLEVEL, 0x80);		// clear fifo
	this.w(R.FIFODATA, data);		// write request

	let lastTime = getTime();
	while (getTime() - lastTime < 0.005);

	this.w(R.COMMAND, PCD.TRANSCIEVE);
	this.w(R.BITFRAMING, this.r(R.BITFRAMING)|0x80);	// start TX
	this.w(R.BITFRAMING, this.r(R.BITFRAMING)&~0x80);	// stop TX

	// while (!(this.r(R.COMIRQ)&0x31)); // wait doesn't seem to be needed
	
	// let err = this.r(R.ERROR);
	// if (err)
	// 	throw new Error("MFRC522 Request Error " + err);
	
	let fifo = this.r(R.FIFOLEVEL);
	return this.ra(R.FIFODATA, fifo);
};

MFRC522.prototype.isNewCard = function()
{
	this.w(R.BITFRAMING, 0x07);		// TX only 7 bits in last byte (?)
	return (this.req(PICC.REQA).length > 0);
};

MFRC522.prototype.getCardSerial = function()
{
	// isNewCard must be called first
	this.w(R.BITFRAMING, 0x00);		// TX all bits in last byte
	let r = this.req([PICC.SELECT1, 0x20]);

	// if (r.length > 0)
	// 	return r.slice(0,-1);		// cut off CRC
	// else
	// 	return [];

	let uuid = "";
	if (r.length > 0)
	{
		r = r.slice(0, -1);			// cut off CRC
		for (let i = 0; i < r.length; ++i)
		{
			if (r[i] < 16)
				uuid = uuid + "0";

			uuid = uuid + r[i].toString(16);
		};
	}
	
	return uuid.toUpperCase();
};

MFRC522.prototype.readCard = function()
{
	let uuid = "";
	if (this.isNewCard())
		uuid = this.getCardSerial();

	return uuid;
};

MFRC522.prototype.findCards = function(callback)
{
	// TODO: We can do this better I think - and can detect multiple cards
	if (this.isNewCard())
		callback(this.getCardSerial());
};

exports.connect = function(spi, cs)
{
	let m = new MFRC522(spi, cs);
	m.init();

	return m;
};

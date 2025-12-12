async function traduzirTexto (texto, idiomaAlvo = "en") {
    const key = ''
    const endpoint = "https://api.cognitive.microsofttranslator.com/"
    const region = "eastus"
    const url = `${endpoint}/translate?api-version=3.0&to=${idiomaAlvo}`;
    const response = await fetch (url, {
        method : "POST",
        body: JSON.stringify([{Text: texto}]), 
        headers: {
            "Ocp-Apim-Subscription-Key": key,
            "Ocp-Apim-Subscription-Region": region,
            "Cotent-Type": "aaplication/json"
        }
    });
    const data = await response.json()
    const traduzido = data[0].translations[0].text;
    console.log(traduzido, '\n')
}
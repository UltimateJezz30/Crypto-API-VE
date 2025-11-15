import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 10000;

// API BCV existente del usuario
const BCV_API = "https://esjs-dolar-api.onrender.com/";

async function getBCV() {
  const r = await fetch(BCV_API);
  const j = await r.json();
  return parseFloat(j.dolar_BCV.replace(",", "."));
}

async function getCryptoUSD(crypto) {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`;
  const r = await fetch(url);
  const j = await r.json();
  return j[crypto]?.usd || null;
}

app.get("/", (req, res) => {
  res.json({ message: "Crypto API Venezuela Lista" });
});

// Ejemplo: /crypto/bitcoin
app.get("/crypto/:id", async (req, res) => {
  try {
    const id = req.params.id.toLowerCase();
    const usd = await getCryptoUSD(id);
    if (!usd) return res.status(404).json({ error: "Criptomoneda no encontrada" });

    const tasa = await getBCV();
    const bs = usd * tasa;

    res.json({
      crypto: id,
      precio_usd: usd,
      tasa_bcv: tasa,
      precio_bs: bs.toFixed(2)
    });
  } catch (err) {
    res.status(500).json({ error: "Error interno", detalle: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Crypto API VE corriendo en puerto ${PORT}`));

# API Cripto Venezuela (Gratis)

Convierte precios de criptomonedas a **Bolívares (Bs)** usando:
- CoinGecko API (gratis)
- Tu API BCV existente (USD → Bs)

## Endpoints

### GET /
Estado del servidor.

### GET /crypto/:id
Ejemplo:
- /crypto/bitcoin
- /crypto/ethereum
- /crypto/usdt

### Respuesta:
```
{
  "crypto": "bitcoin",
  "precio_usd": 68000,
  "tasa_bcv": 36.45,
  "precio_bs": 2470000.00
}
```

## Cómo desplegar en Render

### 1️⃣ Subir este ZIP a un repositorio GitHub  
Luego ir a Render → New Web Service

### 2️⃣ Configuración en Render
- Runtime: **Node**
- Build command:  
```
npm install
```
- Start command:  
```
node server.js
```
- Branch: main (o la que uses)

### 3️⃣ Deploy y probar:
Ejemplo de URL final:
```
https://tu-api-crypto.onrender.com/crypto/bitcoin
```

¡100% gratis, sin llaves, sin cuotas!

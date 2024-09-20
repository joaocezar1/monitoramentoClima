//server.mjs
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();//Repare que o arquivo .env foi ignorado pelo gitignore e agora será necessário que você use use sua própria chave privada para a API em https://home.openweathermap.org/ e obter acesso a API
const app = express();
const PORT = 3000;


app.use(express.static('public'));
app.get('/clima/:cidade', async (req, res) => {
    const cidade = req.params.cidade;
    const apiKey = process.env.API_KEY;
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;
    try {
        const response = await fetch(apiWeatherURL);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados do clima.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

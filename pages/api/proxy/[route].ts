import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AxiosResponse>,
) {
    const route = req.query.route as string;
    const stockData = req.body;
    const config = {
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    };
    const response = await axios.post('https://api.gols-synctree.com/getstockprice', {
        stockRegion: "US",
        stockName: stockData.body.stockName,
    }, config);
    try {
        res.status(200).json(response.data)
    }
    catch (error) {
        res.status(999)
    }
}
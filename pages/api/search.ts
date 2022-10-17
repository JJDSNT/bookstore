import type { NextApiRequest, NextApiResponse } from 'next';

const libgen = require('libgen');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    // Process a POST request
    console.clear();
    console.log("Requisição recebida: " + JSON.stringify(req.body));

    try {
      const urlString = await libgen.mirror();
      console.log(`${urlString} is currently fastest`);
      //http://gen.lib.rus.ec
      const options = {
        mirror: urlString,
        query: req.body.query
      }
      // reverse, count, order
      //console.log(req.body.query);
      //console.log(req.body.extension);
      //offset: 0 //pagination
      console.log(options);
      try {
        const data = await libgen.search(options);
        if (Object.keys(data).length < 1) {
          console.log('Retornou Empty');
          return res.status(200).json({ error: 'Empty response' })
        }
        console.log('Retornou: ' + data.length);
        const uniques = libgen.utils.clean.dups(data);
        console.log('Retornou ' + uniques.length + ' unicos');
        let resultado = data;
        if (req.body.extension) {
          resultado = data.filter(function (item) {
            return item.extension == req.body.extension;
          })
          console.log('Retornando ' + resultado.length + ' filtrados');
        }
        console.log('Retornando ' + resultado.length);
        return res.json(resultado);
      } catch (e) {
        console.log("Erro: " + e);
      };
    }
    catch (e) { console.log('erro: ' + e) }

  } else {
    return res.status(404).json({ error: 'Verb not allowed' })
  }
}

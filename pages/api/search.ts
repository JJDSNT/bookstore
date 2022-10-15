import type { NextApiRequest, NextApiResponse } from 'next';

const libgen = require('libgen');

class ApiClient {

  static async search(options) {
    try {
      const data = await libgen.search(options);
      console.log('Retornou: ' + data.length);
      const uniques = libgen.utils.clean.dups(data);
      console.log('Retornando ' + uniques.length + ' unicos');
      return uniques
    }
    catch (err) {
      console.log('erro: ' + err)
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    console.clear();
    console.log("Requisição recebida.")
    const urlString = await libgen.mirror()
    console.log(`${urlString} is currently fastest`)
    const options = {
      mirror: 'http://gen.lib.rus.ec',
      query: req.body.query,
      count: 50,
      sort_by: 'year',
      reverse: true
    }
    //console.log(req.body.extension);
    //offset: 0 //pagination
    //console.log(req.body.query);
    //console.log(options);
    try {
      const dados = await ApiClient.search(options);
      //console.log('dados: ' + dados);
      let resultado = dados;
      if (req.body.extension && dados.length > 0) {
        if (Array.isArray(dados)) {
          resultado = dados.filter(function (item) {
            return item.extension == req.body.extension;
          })
        };
      }
      res.json(resultado);
    } catch (e) {
      console.log(e);
    };
  } else {
    res.status(404).json({ error: 'Verb not allowed' })
  }
}

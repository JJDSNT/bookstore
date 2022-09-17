const libgen = require('libgen');

class ApiClient {
  async search(options) {
    try {
      const data = await libgen.search(options)
      return data
    }
    catch (err) {
      console.error(err)
    }
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    const options = {
      mirror: 'http://gen.lib.rus.ec',
      query: req.body.query,
      count: 50,
      sort_by: 'year',
      reverse: true
    }
    //offset: 0 //pagination
    //console.log(req.body.query);
    //console.log(options);
    try {
      const dados = await new ApiClient().search(options);
      //console.log("dados: "+dados);
      let resultado = dados;
      if (req.body.extension){
        resultado = dados.filter(function (item) {
          return item.extension == req.body.extension;
        });
      }
      res.json(resultado);
    } catch (e) {
      console.log(e);
    };
  } else {
    res.status(404).json({ error: 'Verb not allowed' })
  }
}

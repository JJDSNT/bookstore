const libgen = require('libgen');

class ApiClient {
  async search(options) {
    try {
      const data = await libgen.search(options)
      console.log(options)
      return data
    }
    catch (err) {
      console.error(err)
    }
  }
};



export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req);
    // Process a POST request
    const options = {
      mirror: 'http://gen.lib.rus.ec',
      query: 'religiao',
      count: 5,
      sort_by: 'year',
      reverse: true,
      extension: 'pdf'
    }
    console.log(options);
  } else {
    //res.status(200).json({ name: 'John Doe' })
    const options = {
      mirror: 'http://gen.lib.rus.ec',
      query: 'australia pdf',
      count: 5,
      sort_by: 'year',
      reverse: true,
      extension: 'pdf',
      res: 3
    }
    try {
      const dados = await new ApiClient().search(options)
      res.json(dados);
    } catch (e) {
      console.log(e);
    };
  }
}

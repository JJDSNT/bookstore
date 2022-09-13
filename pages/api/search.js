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
  } else {
    //res.status(200).json({ name: 'John Doe' })
    const options = {
      mirror: 'http://gen.lib.rus.ec',
      query: 'cats',
      count: 5,
      sort_by: 'year',
      reverse: true
    }
    try {
      const dados = await new ApiClient().search(options)
      res.json(dados);
    } catch (e) {
      console.log(e);
    };
  }
}

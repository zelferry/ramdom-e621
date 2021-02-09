const querystring = require('querystring');
const fetch = require('node-fetch');
const fs = require('fs');
const salvar = [];

class e621 {
  static e621DB (searchTerms) {
   const length = 10;
   const opts = {method: 'GET',headers: {'User-Agent': 'crosdid/1.0',},};
		const query = querystring.stringify({
			tags: searchTerms,
			limit: length,
		}).replace(/%20/gu, '+');
	fetch(`https://e621.net/posts.json?${query}`, opts).then((res) => res.json()).then((json) => {
				const { posts } = json;
				if (!posts.length) {
					return console.log(`nenhum resultado para: \`${searchTerms}\``);}
				const result = posts[Math.floor(Math.random() * posts.length)];
				console.log(result.file.url);
         salvar.push(result.file.url)
  fs.writeFile('file.json', JSON.stringify(salvar), function (err) {
     if (err) throw err
  });}).catch((err) => {console.error(err);});
			const retornar = `resultado encontrado para ${searchTerms} cheque no arquivo file.json ou aqui na area de logs`
			return retornar
  }
}
module.exports = e621;

const axios = require('axios');

(async () => {
  try {
    res = await axios.post('http://127.0.0.1:5000/update_entry/joke',
          {
            subtitle: 'A Fond Farewell to My Notebooks',
            img: 'https://www.pngrepo.com/png/183342/512/notebook.png',
            body: 'Today I say a not-so-sad, not-so-solemn goodbye to the old ways. Building this App will keep me organized and regimented.'
          }
        );
    console.log(res.data);
  } catch(err) {
    console.error({ERROR: err});
  }
})();

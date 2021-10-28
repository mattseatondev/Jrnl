
const axios = require('axios');

(async () => {
  try {
    res = await axios.post('http://127.0.0.1:5000/update_oneoff/duo',
          {
            val: 'Spanish: Narrative'
          }
        );
    console.log(res.data);
  } catch(err) {
    console.error({ERROR: err});
  }
  // try {
  //   res = await axios.get('http://127.0.0.1:5000/');
  //   console.log(res.data);
  // } catch(err) {
  //   console.error({ERROR: err});
  // }
})();

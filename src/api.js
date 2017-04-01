import * as DicClient from 'dic-client';

// const api = new DicClient.PostsApi();

var dicClient = DicClient.ApiClient.instance;


// var callback = function(error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('API called successfully. Returned data: ' + data);
//   }
// };
// api.estimatesPriceGet(startLatitude, startLongitude, endLatitude, endLongitude, callback);
const api = {
  getInstance() {
    const defaultClient = DicClient.ApiClient.instance;
    if (process.env.BASE_URL) {
      defaultClient.basePath = process.env.BASE_URL; // + '/dic/service/swagger';
    }
//     const Restricted = defaultClient.authentications.Restricted;
//     Restricted.apiKey = localStorage.token;
//     Restricted.apiKeyPrefix = 'Bearer';
    return dicClient;
  },
};

export default api;
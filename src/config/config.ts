import * as env from 'env-var';

export default {
  port: env.get('PORT', '3000').asPortNumber(),
  nbpUrl: env.get('NBP_URL', 'http://api.nbp.pl/api/exchangerates/tables/C').asUrlString(),
  zombieApiUrl: env.get('ZOMBIE_API_URL', 'https://zombie-items-api.herokuapp.com/api/items').asUrlString(),
};

const Axios = require('axios');
const { baseUrl } = require('../../config/env.config');
/* eslint-disable no-undef */

describe('Home PAGE: ', () => {
  data = {};
  describe('GET /', () => {
    beforeAll(done => {
      Axios.get(`${baseUrl}`)
        .then(response => {
          data.status = response.status;
        })
        .catch(e => {
          data.status = e.response.status;
        })
        .finally(() => {
          done();
        });
    });
    it('should return status  code 200', () => {
      expect(data.status).toBe(200);
    });
  });
});

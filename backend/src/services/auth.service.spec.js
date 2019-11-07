/* eslint-disable no-undef */

const { AuthService } = require('./auth.service');

describe('AUTH SERVICE: ', () => {
  let token;
  beforeAll(done => {
    token = AuthService.tokenForUSer({ id: 1 });
    done();
  });

  it('should have a fuction `tokenForUSer` that returns a value', () => {
    expect(token).toBeDefined();
  });
});

const chai = require('chai');
const request = require('supertest');
const app = require('../src/config/server/server').default;
const user = require('./fixtures/user.json');
const q = require('querystring');
const ClientModel = require('../src/config/oauth/clientModel').default;
const TokenModel = require('../src/config/oauth/tokenModel').default;
const OAuthClient = require('./fixtures/OAuthClient.json');
const OAuthToken = require('./fixtures/OAuthToken');
const UserModel = require('../src/components/User/model').default;
chai.should();

/**
 * storing globals to access them in API requests
 */
global.code = '';
global.accessToken = '';

/**
 * Creating default client
 */
before(async () => {
    try {
        await ClientModel.findOneAndUpdate({
                id: OAuthClient.id
            },
            OAuthClient, {
                upsert: true,
                new: true
            }
        );

    } catch (error) {
        throw new Error(error);
    }
});
/**
 * Authentication tests
 */
describe('Authentication', () => {
    it('sign up user with existing email', (done) => {
        request(app)
            .post('/auth/signup')
            .send(user)
            .expect('Content-type', /json/)
            .expect((res) => {
                res.body.status.should.equal(400);
            })
            .end(done);
    });
    it('login to app, redirects to your redirectUri with code', (done) => {
        request(app)
            .post('/auth/login?' +
                `client_id=${OAuthClient.id}&` +
                'state=randomstring&' +
                'response_type=code'
            )
            .send(user)
            .expect((res) => {
                res.status.should.equal(200);
            })
            .end(done);
    });
});

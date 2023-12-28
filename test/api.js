const chai = require('chai');
const request = require('supertest');
const app = require('../src/config/server/server').default;
const UserModel = require('../src/components/User/model').default;
const ClientModel = require('../src/config/oauth/clientModel').default;
const TokenModel = require('../src/config/oauth/tokenModel').default;
const AuthCodeModel = require('../src/config/oauth/authCodeModel').default;
chai.should();

/**
 * API tests
 */
describe('API', () => {
    it('get user all cars', (done) => {
        request(app)
            .get('/v1/cars')
            .set('Authorization', `Bearer ${global.accessToken}`)
            .expect((res) => {
                res.status.should.equal(200);
                res.body.should.be.an('array');
            })
            .end(done);
    });

    it('get availble cars for given set of dates', (done) => {
        const newUser = {
            "startDate": "2023-03-02",
            "endDate": "2023-03-04"
        }

        request(app)
            .post('/v1/availability/getCarAvailability')
            .send(newUser)
            .set('Authorization', `Bearer ${global.accessToken}`)
            .expect((res) => {
                res.status.should.equal(200);
                res.body.should.be.an('array');
            })
            .end(done);
    });
});

/**
 * clear database after tests
 */
after(async () => {
    try {
        
        await AuthCodeModel.collection.drop();
        await TokenModel.collection.drop();
        await ClientModel.collection.drop();
        await UserModel.collection.drop();
    } catch (error) {
        console.log('Something went wrong after tests, seems your database doesnt cleaned');
    }
});

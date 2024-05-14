const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const usedDb = process.env.NODE_ENV === "TEST" ? process.env.MONGO_URI_TEST : process.env.MONGO_URI


beforeAll(async () => {
    await mongoose.connect(usedDb);
});

let access_token
let user_id
let accountNumber
let identityNumber

describe('User API', () => {
    it('create a new user', async () => {
        const res = await request(app)
            .post('/create-user')
            .send({
                userName: 'JohnDoe',
                accountNumber: 1234567890,
                emailAddress: 'john@example.com',
                identityNumber: 'A12345678',
                password: "123123"
            })

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('status');
    });

    it('login user', async () => {
        const res = await request(app)
            .post('/login-user')
            .send({
                userName: 'JohnDoe',
                password: "123123"
            })

        access_token = res.body.token
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('status');
    });

    it('read user', async () => {
        const res = await request(app)
            .post('/read-user')
            .set('access_token', access_token)

        user_id = res.body.data[0]._id
        identityNumber = res.body.data[0].identityNumber
        accountNumber = res.body.data[0].accountNumber

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toBe(true);

        const data = res.body.data;
        expect(Array.isArray(data)).toBe(true);

        data.forEach(item => {
            expect(typeof item).toBe('object');
            expect(item).toHaveProperty('userName')
            expect(item).toHaveProperty('accountNumber')
            expect(item).toHaveProperty('emailAddress')
            expect(item).toHaveProperty('identityNumber')
        });

    });

    it('read user by', async () => {
        const res = await request(app)
            .post('/read-userby')
            .send({
                accountNumber,
                identityNumber
            })
            .set('access_token', access_token)

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toBe(true);

    });


    it('update user', async () => {
        const res = await request(app)
            .post('/update-user')
            .send({
                user_id,
                accountNumberUpdated: 15000
            })
            .set('access_token', access_token)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toBe('string')
        expect(typeof res.body.status).toBe('boolean')
    });


    it('delete user', async () => {
        const res = await request(app)
            .post('/delete-user')
            .send({
                user_id
            })
            .set('access_token', access_token)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toBe('string')
        expect(typeof res.body.status).toBe('boolean')
    });

});


afterAll(async () => {
    await mongoose.connection.close();
});
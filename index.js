const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const { sequelize } = require('./models/index.js');
const { response } = require('./config/response.js');
const { status } = require('./config/response.status.js');
const { BaseError } = require('./config/error.js');

// const userRouter = require('./routes/user.route.js');
const calsuleRouter = require('./routes/capsule.route.js');
const memberRouter = require('./routes/member.route.js');

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);
sequelize
    .sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/user', userRouter);
app.use('/capsule', calsuleRouter);
app.use('/member', memberRouter);

app.use((req, res, next) => {
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.err = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.data.status || status.INTERNAL_SERVER_ERROR).send(response(err.data));
});

app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${app.get('port')}`);
});

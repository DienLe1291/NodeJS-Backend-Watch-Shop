import AuthRoute from './auth.route';

const initRoutes = (app) => {
    app.use('/api/auth', AuthRoute);
}

module.exports = initRoutes;

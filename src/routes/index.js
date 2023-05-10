import UserRoute from './user.route';
import BrandRoute from './brand.route';

const initRoutes = (app) => {
    app.use('/api/user', UserRoute);
    app.use('/api/brand', BrandRoute);
}

module.exports = initRoutes;

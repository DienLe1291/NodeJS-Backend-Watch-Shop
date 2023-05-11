import UserRoute from './user.route';
import BrandRoute from './brand.route';
import WatchRoute from './watch.route';
import AddressRoute from './address.route';
import CommentRoute from './comment.route';
import OrderRoute from './order.route';
import CartRoute from './cart.route';

const initRoutes = (app) => {
    app.use('/api/user', UserRoute);
    app.use('/api/brand', BrandRoute);
    app.use('/api/watch', WatchRoute);
    app.use('/api/address', AddressRoute);
    app.use('/api/comment', CommentRoute);
    app.use('/api/order', OrderRoute);
    app.use('/api/cart', CartRoute);
}

module.exports = initRoutes;

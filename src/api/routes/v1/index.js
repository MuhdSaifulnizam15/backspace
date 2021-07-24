const express = require("express");
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const stateRoutes = require('./state.route');
const cityRoutes = require('./city.route');
const categoryRoutes = require('./category.route');
const productRoutes = require('./product.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

// router.use('/users', userRoutes);
const defaultRoutes = [
    {
      path: '/auth',
      route: authRoutes,
    },
    {
      path: '/users',
      route: userRoutes,
    },
    {
      path: '/states',
      route: stateRoutes,
    },
    {
      path: '/city',
      route: cityRoutes,
    },
    {
      path: '/category',
      route: categoryRoutes,
    },
    {
      path: '/products',
      route: productRoutes,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
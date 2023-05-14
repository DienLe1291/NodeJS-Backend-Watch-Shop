import CartService from '../services/cart.service';

// @route GET /api/cart/:id
// @desc get a watch in cart
// @access private
exports.getCart = async (req, res) => {
    try {
        const cartId = req.params.id;
        const userId = req.userId;

        const data = await CartService.findById(cartId, userId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route GET /api/cart
// @desc get all carts
// @access proteted(admin)
exports.getAllCarts = async (req, res) => {
    try {
        const data = await CartService.findAll();

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route GET /api/cart/user
// @desc get cart have same userId
// @access private
exports.getCartByUser = async (req, res) => {
    try {
        const data = await CartService.findByUserId(req.userId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}


// @route POST /api/cart
// @desc add a watch to cart
// @access private
exports.create = async (req, res) => {
    if (!req.body.quantity ||  req.body.quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Số lượng sản phẩm phải lớn hơn 0'
        })
    }

    try {
        const payload = {
            quantity: req.body.quantity,
            userId: req.userId,
            watchId: req.body.watchId
        }
        const data = await CartService.create(payload);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route PUT /api/cart/:id
// @desc update a watch in cart
// @access private
exports.update = async (req, res) => {
    if (!req.body.quantity ||  req.body.quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Số lượng sản phẩm phải lớn hơn 0'
        })
    }

    try {
        const data = await CartService.update(req.body.quantity, req.params.id, req.userId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route DELETE /api/cart/:id
// @desc delete a watch in cart
// @access private
exports.delete = async (req, res) => {
    try {
        const data = await CartService.delete(req.params.id, req.userId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

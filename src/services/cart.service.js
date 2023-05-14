import db from '../models';

exports.create = async payload => new Promise(async (resolve, reject) => {
    try {
        const watch = await db.Watch.findByPk(payload.watchId);
        if (!watch){
            return resolve({
                success: false,
                message: 'Sản phẩm không tồn tại'
            })
        }

        db.Cart.create(payload);

        resolve({
            success: true,
            message: 'Thêm sản phẩm vào giỏ hàng thành công'
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.findById = async (cartId, userId) => new Promise(async (resolve, reject) => {
    try {
        const cart = await db.Cart.findOne(
            {
                where: {id: cartId, userId}, 
                raw: true,
                nest: true,
                include: [
                    {model: db.User, as: 'user', attributes: ['id', 'email', 'fullName', 'image', 'phoneNumber']},
                    {model: db.Watch, as: 'watch', attributes: ['id', 'name', 'price', 'image', 'currentQuantity', 'description']}
                ],
                attributes: ['id', 'quantity']
            }
        );

        if (!cart) {
            return resolve({
                success: false,
                message: 'Không tìm thấy sản phẩm'
            })
        }

        resolve({
            success: true,
            cart
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.findByUserId = async userId => new Promise(async (resolve, reject) => {
    try {
        const cart = await db.Cart.findAll(
            {
                where: {userId}, 
                raw: true,
                nest: true,
                include: [
                    {model: db.User, as: 'user', attributes: ['id', 'email', 'fullName', 'image', 'phoneNumber']},
                    {model: db.Watch, as: 'watch', attributes: ['id', 'name', 'price', 'image', 'currentQuantity', 'description']}
                ],
                attributes: ['id', 'quantity']
            }
        );

        resolve({
            success: true,
            cart
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.findAll = async () => new Promise(async (resolve, reject) => {
    try {
        const cart = await db.Cart.findAll({
            raw: true,
            nest: true,
            include: [
                {model: db.User, as: 'user', attributes: ['id', 'email', 'fullName', 'image', 'phoneNumber']},
                {model: db.Watch, as: 'watch', attributes: ['id', 'name', 'price', 'image', 'currentQuantity', 'description']}
            ],
            attributes: ['id', 'quantity']
        });

        resolve({
            success: true,
            cart
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.update = async (quantity, cartId, userId) => new Promise(async (resolve, reject) => {
    try {
        const cart = await db.Cart.findOne(
            {
                where: {id: cartId, userId}, 
                raw: true,
                nest: true,
                include: [{
                    model: db.Watch, 
                    as: 'watch', 
                    attributes: ['id', 'name', 'price', 'image', 'currentQuantity', 'description']
                }],
                attributes: ['id', 'quantity']
            }
        );

        if (!cart){
            return resolve({
                success: false,
                message: 'Không tìm thấy sản phẩm hoặc người dùng không có quyền để cập nhật'
            })
        }

        // if update quantity > current quantity of watch
        if (quantity > cart.watch.currentQuantity){
            return resolve({
                success: false,
                message: `Số lượng sản phẩm tồn kho chỉ còn ${cart.watch.currentQuantity}`
            })
        }

        await db.Cart.update({quantity}, {where: {id: cartId, userId}});

        // get cart updated
        const updateCart = await db.Cart.findByPk(
            cartId, 
            {
                raw: true,
                nest: true,
                include: [
                    {model: db.User, as: 'user', attributes: ['id', 'email', 'fullName', 'image', 'phoneNumber']},
                    {model: db.Watch, as: 'watch', attributes: ['id', 'name', 'price', 'image', 'currentQuantity', 'description']}
                ],
                attributes: ['id', 'quantity']
            }
        );
        resolve({
            success: true,
            message: 'Cập nhật số lượng sản phẩm thành công',
            updateCart
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.delete = async (cartId, userId) => new Promise(async (resolve, reject) => {
    try {
        const deleteCart = await db.Cart.findByPk(
            cartId, 
            {
                raw: true,
                nest: true,
                include: [
                    {model: db.User, as: 'user', attributes: ['id', 'email', 'fullName', 'image', 'phoneNumber']},
                    {model: db.Watch, as: 'watch', attributes: ['id', 'name', 'price', 'image', 'currentQuantity', 'description']}
                ],
                attributes: ['id', 'quantity']
            }
        );

        // delete product in database
        const rsp = await db.Cart.destroy({where: {id: cartId, userId}});

        // if delete failure
        if (rsp[0] === 0) {
            return resolve({
                success: false,
                message: 'Không tìm thấy sản phẩm hoặc người dùng không có quyền xóa sản phẩm này'
            })
        }

        resolve({
            success: true,
            message: 'Xóa sản phẩm khỏi giỏ hàng thành công',
            deleteCart
        })
    } catch (error) {
        reject(error);
    }
}) 
import db from '../models';

exports.create = async payload => new Promise(async (resolve, reject) => {
    try {
        // Set default address if this is first address of user
        const address = await db.Address.findOne({where: {userId: payload.userId}});
        if (!address){
            payload = {
                ...payload,
                isDefault: true
            }
        }

        const newAddress = await db.Address.create(payload);

        resolve({
            success: true,
            message: 'Thêm mới địa chỉ thành công',
            newAddress
        })
    } catch (error) {
        reject(error)
    }
}) 

exports.findByUserId = async userId => new Promise(async (resolve, reject) => {
    try {
        const addresses = await db.Address.findAll({where: {userId}});

        resolve({
            success: true,
            addresses
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.findById = async addressId => new Promise(async (resolve, reject) => {
    try {
        const address = await db.Address.findByPk(addressId);

        if (!address){
            return resolve({
                success: false,
                message: 'Không tìm thấy địa chỉ'
            })
        }

        resolve({
            success: true,
            address
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.update = async (payload, addressId, userId) => new Promise(async (resolve, reject) => {
    try {
        // update address in database
        const rsp = await db.Address.update(payload, {where: {id: addressId, userId}})

        // if update failure
        if (rsp[0] === 0){
            resolve({
                success: false,
                message: 'Không tìm thấy địa chỉ hoặc người dùng không có quyền để cập nhật địa chỉ này'
            })
        }

        const updateAddress = await db.Address.findByPk(addressId);

        resolve({
            success: true,
            message: 'Cập nhật địa chỉ thành công',
            updateAddress
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.setDefaultAddress = async (addressId, userId) => new Promise(async (resolve, reject) => {
    try {
        // get old default address
        const oldDefaultAddress = await db.Address.findOne({where: {isDefault: true}});

        // check new default address = old default address
        if (addressId == oldDefaultAddress.id){
            return resolve({
                success: false,
                message: 'Không thể cập nhật, địa chỉ này đã là mặc định'
            })
        }

        // update new default address
        const rsp = await db.Address.update(
            {isDefault: true},
            {where: {id: addressId, userId}}
        )

        // if update failure
        if (rsp[0] === 0){
            return resolve({
                success: false,
                message: 'Không tìm thấy địa chỉ hoặc người dùng không có quyền để cập nhật địa chỉ này'
            })
        }

        // remove old default address
        await db.Address.update(
            {isDefault: false},
            {where: {id: oldDefaultAddress.id}}
        )

        const defaultAddress = await db.Address.findByPk(addressId);

        resolve({
            success: true,
            message: 'Cập nhật địa chỉ mặc định thành công',
            defaultAddress
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.delete = async (addressId, userId) => new Promise(async (resolve, reject) => {
    try {
        const deleteAddress = await db.Address.findByPk(addressId);

        // check default address
        if (deleteAddress?.isDefault) {
            return resolve({
                success: false,
                message: 'Không thể xóa địa chỉ mặc định'
            })
        }

        // delete address in database
        const rsp = await db.Address.destroy({where: {id: addressId, userId}})

        // if delete failure
        if (rsp === 0){
            return resolve({
                success: false,
                message: 'Không tìm thấy địa chỉ hoặc người dùng không có quyền để xóa địa chỉ này'
            })
        }

        resolve({
            success: true,
            message: 'Xóa địa chỉ thành công',
            deleteAddress
        })
    } catch (error) {
        reject(error);
    }
}) 
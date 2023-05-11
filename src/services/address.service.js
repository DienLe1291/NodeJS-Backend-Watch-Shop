import Address from '../models/address.model';

exports.create = async payload => {
    try {
        // Set default address if this is first address of user
        const addresses = await Address.findAll({where: {userId: payload.userId}});
        if (addresses.length===0){
            payload = {
                ...payload,
                isDefault: true
            }
        }

        const newAddress = await Address.create(payload);

        return {
            success: true,
            statusCode: 200,
            message: 'Thêm mới địa chỉ thành công',
            newAddress
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: 'Lỗi máy chủ'
        }
    }
}

exports.findByUserId = async userId => {
    try {
        const addresses = await Address.findAll({where: {userId}});

        return {
            success: true,
            statusCode: 200,
            addresses
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: 'Lỗi máy chủ'
        }
    }
}

exports.findById = async addressId => {
    try {
        const address = await Address.findByPk(addressId);

        return {
            success: true,
            statusCode: 200,
            address
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: 'Lỗi máy chủ'
        }
    }
}

exports.update = async (payload, addressId, userId) => {
    try {
        // update address in database
        const rsp = await Address.update(payload, {where: {id: addressId, userId}})

        // if update failure
        if (rsp[0] === 0){
            return {
                success: false,
                statusCode: 401,
                message: 'Không tìm thấy địa chỉ hoặc người dùng không có quyền để cập nhật địa chỉ này'
            }
        }

        const updateAddress = await Address.findByPk(addressId);

        return {
            success: true,
            statusCode: 200,
            message: 'Cập nhật địa chỉ thành công',
            updateAddress
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: 'Lỗi máy chủ'
        }
    }
}

exports.setDefaultAddress = async (addressId, userId) => {
    try {
        // get old default address
        const oldDefaultAddress = await Address.findOne({where: {isDefault: true}});

        // check new default address = old default address
        if (addressId == oldDefaultAddress.id){
            return {
                success: false,
                statusCode: 400,
                message: 'Không thể cập nhật, địa chỉ này đã là mặc định'
            }
        }

        // update new default address
        const rsp = await Address.update(
            {isDefault: true},
            {where: {id: addressId, userId}}
        )

        // if update failure
        if (rsp[0] === 0){
            return {
                success: false,
                statusCode: 401,
                message: 'Không tìm thấy địa chỉ hoặc người dùng không có quyền để cập nhật địa chỉ này'
            }
        }

        // remove old default address
        await Address.update(
            {isDefault: false},
            {where: {id: oldDefaultAddress.id}}
        )

        const defaultAddress = await Address.findByPk(addressId);

        return {
            success: true,
            statusCode: 200,
            message: 'Cập nhật địa chỉ mặc định thành công',
            defaultAddress
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: 'Lỗi máy chủ'
        }
    }
}

exports.delete = async (addressId, userId) => {
    try {
        const deleteAddress = await Address.findByPk(addressId);

        // check default address
        if (deleteAddress?.isDefault) {
            return {
                success: false,
                statusCode: 400,
                message: 'Không thể xóa địa chỉ mặc định'
            }
        }

        // delete address in database
        const rsp = await Address.destroy({where: {id: addressId, userId}})

        // if delete failure
        if (rsp === 0){
            return {
                success: false,
                statusCode: 401,
                message: 'Không tìm thấy địa chỉ hoặc người dùng không có quyền để xóa địa chỉ này'
            }
        }

        return {
            success: true,
            statusCode: 200,
            message: 'Xóa địa chỉ thành công',
            deleteAddress
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: 'Lỗi máy chủ'
        }
    }
}
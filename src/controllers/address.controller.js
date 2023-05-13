import AddressService from '../services/address.service';

// @route GET /api/address
// @desc get all address by user ID
// @access private
exports.getAddressByUser = async (req, res) => {
    try {
        const userId = req.userId;
        const data = await AddressService.findByUserId(userId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route POST /api/address
// @desc create a new address for user
// @access private
exports.create = async (req, res) => {
    if (!req.body.province || !req.body.district || !req.body.ward || !req.body.detail){
        return res.status(400).json({
            success: false,
            message: 'Thông tin địa chỉ theo 3 cấp tỉnh(TP)/huyện(quận)/xã(phường) và mô tả chi tiết không thể bỏ trống'
        })
    }
    try {
        const payload = {
            userId: req.userId,
            province: req.body.province,
            district: req.body.district,
            ward: req.body.ward,
            detail: req.body.detail
        }

        const data = await AddressService.create(payload);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route PUT /api/address/:id
// @desc update address by id
// @access private
exports.update = async (req, res) => {
    try {
        const userId = req.userId;
        const addressId = req.params.id;
        const payload = {
            province: req.body.province,
            district: req.body.district,
            ward: req.body.ward,
            detail: req.body.detail
        }

        const data = await AddressService.update(payload, addressId, userId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route PUT /api/address/default-address/:id
// @desc update default address
// @access private
exports.updateDefaultAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const addressId = req.params.id;

        const data = await AddressService.setDefaultAddress(addressId, userId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route DELETE /api/address/:id
// @desc delete an address by id
// @access private
exports.delete = async (req, res) => {
    try {
        const userId = req.userId;
        const addressId = req.params.id;

        const data = await AddressService.delete(addressId, userId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

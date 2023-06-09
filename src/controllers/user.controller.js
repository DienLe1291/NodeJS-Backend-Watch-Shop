import UserService from '../services/user.service';

// @route GET /api/user/:id
// @desc get user
// @access private
exports.getUser = async (req, res) => {
    // Check user not authorised or user not admin
    if ((req.params.id != req.userId) && req.roleId !== 0){
        return res.status(400).json({
            success: false,
            message: 'Người dùng không có quyền thực hiện chức năng này'
        })
    }

    try {
        const userId = req.params.id;
        const data = await UserService.findById(userId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route GET /api/user
// @desc get all users
// @access protected (admin)
exports.getAllUsers = async (req, res) => {
    try {
        const data = await UserService.findAll();

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route POST /api/user/register
// @desc register new account
// @access public
exports.register = async (req, res) => {

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            message: 'Email/mật khẩu không thể rỗng'
        })
    }

    if (!req.body.fullName) {
        return res.status(400).json({
            success: false,
            message: 'Họ và tên không thể rỗng'
        })
    }

    try {
        const data = await UserService.create(req.body);
        
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route POST /api/user/login
// @desc login user
// @access public
exports.login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            message: 'Tên tài khoản và mật khẩu không thể rỗng'
        })
    }

    try {
        const data = await UserService.login(req.body.email, req.body.password);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route PUT /api/user/:id
// @desc update user
// @access private
exports.update = async (req, res) => {
    // Check user not authorised or user not admin
    if ((req.params.id != req.userId) && req.roleId !== 0){
        return res.status(400).json({
            success: false,
            message: 'Người dùng không có quyền thực hiện chức năng này'
        })
    }

    if (!req.body.fullName && !req.body.phoneNumber && !req.file){
        return res.status(400).json({
            success: false,
            message: 'Không tìm thấy thông tin để cập nhật'
        })
    }

    try {
        const payload = {
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            image: req.file?.path
        }
        const userId = req.params.id;
        const data = await UserService.update(payload, userId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route PUT /api/user/change-password/:id
// @desc change password
// @access private 
exports.changePassword = async (req, res) => {
    if (!req.body.password || !req.body.newPassword){
        return res.status(400).json({
            success: false,
            message: 'Không tìm thấy mật khẩu'
        })
    }

    if (req.params.id != req.userId){
        return res.status(400).json({
            success: false,
            message: 'Người dùng không có quyền thực hiện chức năng này'
        })
    }

    try {
        const userId = req.params.id;
        const password = req.body.password;
        const newPassword = req.body.newPassword;

        const data = await UserService.updatePassword(password, newPassword, userId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route DELETE /api/user/:id
// @desc delete a user by id
// @access protected (admin) 
exports.delete = async (req, res) => {
    try {
        const userId = req.params.id;

        const data = await UserService.delete(userId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}
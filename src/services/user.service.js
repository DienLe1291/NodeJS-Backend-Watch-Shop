import User from '../models/user.model';
import agron2 from 'argon2';
import jwt from 'jsonwebtoken';

exports.create = async payload => {
    try {
        const user = await User.findOne({
            where: { 
                email: payload.email 
            }
        })
        if (user)
            return {
                success: false,
                statusCode: 400,
                message: 'Email này đã có tài khoản'
            }

        const hashPassword = await agron2.hash(payload.password);

        const newUser = await User.create(
            {
                email: payload.email,
                password: hashPassword,
                fullName: payload.fullName
            },
            {attributes: {exclude: 'password'}}
        )

        newUser.password = undefined;

        const accessToken = jwt.sign(
            {userId: newUser.id},
            process.env.ACCESS_TOKEN_SECRET
        )

        return {
            success: true,
            statusCode: 200,
            message: 'Tạo tài khoản thành công',
            accessToken,
            newUser
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: 'Lỗi máy chủ'
        };
    }
}

exports.login = async (email, password) => {
    try {
        let user = await User.findOne({
            where: { email }
        })

        if (!user) {
            return {
                success: false,
                statusCode: 400,
                message: 'Tên tài khoản hoặc mật khẩu không chính xác'
            }
        }

        const checkPassword = await agron2.verify(user.password, password);

        if (!checkPassword){
            return {
                success: false,
                statusCode: 400,
                message: 'Tên tài khoản hoặc mật khẩu không chính xác'
            }
        }

        user.password = undefined

        const accessToken = jwt.sign(
            {userId: user.id},
            process.env.ACCESS_TOKEN_SECRET
        )

        return {
            success: true,
            statusCode: 200,
            message: 'Đăng nhập thành công',
            accessToken,
            user
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

exports.update = async (payload, userId) => {

    try {
        const rsp = await User
            .update(payload, {where: {id: userId}})

        if (rsp[0] === 0){
            return {
                success: false,
                statusCode: 400,
                message: 'Không tìm thấy thông tin người dùng'
            }
        }

        const updateUser = await User
            .findOne({
                where: {id: userId},
                attributes: {exclude: 'password'}
            });

        return {
            success: true,
            statusCode: 200,
            message: 'Cập nhật thông tin thành công',
            updateUser
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

exports.updatePassword = async (password, newPassword, userId) => {
    try {
        const user = await User.findOne({where: {id: userId}});
        if (!user){
            return {
                success: false,
                statusCode: 400,
                message: 'Không tìm thấy thông tin người dùng'
            }
        }

        const checkPassword = await agron2.verify(user.password, password);

        if (!checkPassword){
            return {
                success: false,
                statusCode: 400,
                message: 'Mật khẩu không chính xác'
            }
        }

        const hashNewPassword = await agron2.hash(newPassword);
        await User.update(
            {password: hashNewPassword},
            {where: {id: userId}}
        )

        return {
            success: true,
            statusCode: 200,
            message: 'Đổi mật khẩu thành công'
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
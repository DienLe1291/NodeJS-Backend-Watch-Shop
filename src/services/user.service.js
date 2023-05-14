import db from '../models';
import agron2 from 'argon2';
import jwt from 'jsonwebtoken';
import cloudinary from '../utils/cloudinary';
import fs from 'fs';

exports.create = async payload => new Promise(async (resolve, reject) => {
    try {
        const hashPassword = await agron2.hash(payload.password);

        const rsp = await db.User.findOrCreate({
            where: {email: payload.email},
            defaults: {
                email: payload.email,
                password: hashPassword,
                fullName: payload.fullName
            }
        })

        const accessToken = rsp[1] && jwt.sign(
            {
                userId: rsp[0].id,
                roleId: rsp[0].roleId
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1d'}
        )

        rsp[0].password = undefined;
        resolve({
            success: rsp[1] ? true : false,
            message: rsp[1] ? 'Tạo tài khoản thành công' : 'Email này đã có tài khoản',
            accessToken: accessToken || undefined,
            newUser: rsp[1] ? rsp[0] : undefined
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.login = async (email, password) => new Promise(async (resolve, reject) => {
    try {
        let user = await db.User.findOne({
            where: { email },
            raw: true
        })

        if (!user) {
            return resolve({
                success: false,
                message: 'Tên tài khoản hoặc mật khẩu không chính xác'
            })
        }

        const checkPassword = await agron2.verify(user.password, password);

        if (!checkPassword){
            return resolve({
                success: false,
                message: 'Tên tài khoản hoặc mật khẩu không chính xác'
            })
        }

        const accessToken = jwt.sign(
            {
                userId: user.id,
                roleId: user.roleId
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
            
        user.password = undefined
        resolve({
            success: true,
            message: 'Đăng nhập thành công',
            accessToken,
            user
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.findAll = async () => new Promise(async (resolve, reject) => {
    try {
        const allUsers = await db.User.findAll({
            raw: true,
            attributes: {exclude: 'password'}
        });

        resolve({
            success: true,
            allUsers
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.findById = async userId => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findByPk(
            userId,
            {raw: true, attributes: {exclude: 'password'}}
        );

        if (!user) {
            return resolve({
                success: false,
                message: 'Không tìm thấy người dùng'
            })
        }

        resolve({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: 'Lỗi máy chủ'
        }
    }
}) 

exports.update = async (payload, userId) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findByPk(userId, {raw: true});

        if (payload.image) {
            // upload new avatar to cloudinary server
            const uploadImage = await cloudinary.uploader.upload(payload.image, {folder: 'watch_shop/user_avatar'});
            fs.unlink(payload.image, (err) => {if(err) console.log(err)})
            
            payload = {
                ...payload,
                image: uploadImage.secure_url,
                cloudinaryId: uploadImage.public_id
            }

            // delete old avatar in cloudinary server
            if (user.cloudinaryId){
                await cloudinary.uploader.destroy(user.cloudinaryId);
            }
        }

        const rsp = await db.User.update(payload, {where: {id: userId}})

        if (rsp[0] === 0){
            return resolve({
                success: false,
                message: 'Không tìm thấy thông tin người dùng'
            })
        }

        const updateUser = await db.User
            .findOne({
                raw: true,
                where: {id: userId},
                attributes: {exclude: 'password'}
            });

        resolve({
            success: true,
            message: 'Cập nhật thông tin thành công',
            updateUser
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.updatePassword = async (password, newPassword, userId) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findOne({where: {id: userId}});
        if (!user){
            return resolve({
                success: false,
                message: 'Không tìm thấy thông tin người dùng'
            })
        }

        const checkPassword = await agron2.verify(user.password, password);
        if (!checkPassword){
            return resolve({
                success: false,
                message: 'Mật khẩu không chính xác'
            })
        }

        const hashNewPassword = await agron2.hash(newPassword);
        await db.User.update(
            {password: hashNewPassword},
            {where: {id: userId}}
        )

        resolve({
            success: true,
            message: 'Đổi mật khẩu thành công'
        })
    } catch (error) {
        reject(error);
    }
})

exports.delete = async userId => new Promise(async (resolve, reject) => {
    try {
        const deleteUser = await db.User.findOne({
            raw: true,
            where: {id: userId},
            attributes: {exclude: 'password'}
        });

        if (!deleteUser) {
            return resolve({
                success: false,
                message: 'Không tìm thấy người dùng cần xóa'
            })
        }

        // check admin user
        if (deleteUser.roleId === 0) {
            return resolve({
                success: false,
                message: 'Không thể xóa người dùng quản trị'
            })
        }

        await db.User.destroy({where: {id: userId}});

        // delete image avatar in cloudinary server
        if (deleteUser.cloudinaryId){
            await cloudinary.uploader.destroy(deleteUser.cloudinaryId);
        }

        resolve({
            success: true,
            message: 'Xóa người dùng thành công',
            deleteUser
        })
    } catch (error) {
        reject(error);
    }
}) 
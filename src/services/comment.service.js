import db from '../models';
import cloudinary from '../utils/cloudinary';
import fs from 'fs';

exports.create = async payload => new Promise(async (resolve, reject) => {
    try {
        const watch = await db.Watch.findByPk(payload.watchId);
        if (!watch){
            return resolve({
                success: false,
                message: 'Sản phẩm không tồn tại'
            })
        }

        const order = await db.Order.findOne({
            where: {userId: payload.userId, statusId: 4}
        })
        if (!order){
            return resolve({
                success: false,
                message: 'Người dùng chưa mua sản phẩm này, không thể đánh giá'
            })
        }

        // comment without image
        if (!payload.image){
            const newComment = db.Comment.create(payload);

            return resolve({
                success: true,
                message: 'Đánh giá sản phẩm thành công',
                newComment
            })
        }
        // comment with image
        else {
            // upload image to cloudinary server
            const uploadImage = await cloudinary.uploader.upload(payload.image, {folder: 'watch_shop/comments'});
            fs.unlink(payload.image, (err) => {if (err) console.log(err)});
            
            payload = {
                ...payload,
                image: uploadImage.secure_url,
                cloudinaryId: uploadImage.public_id
            }

            const newComment = await db.Comment.create(payload);
            return resolve({
                success: true,
                message: 'Đánh giá sản phẩm thành công',
                newComment
            })
        }
    } catch (error) {
        reject(error);
    }
}) 

exports.findById = async commentId => new Promise(async (resolve, reject) => {
    try {
        const comment = await db.Comment.findByPk(
            commentId,
            {
                raw: true,
                nest: true,
                include: [
                    {model: db.User, as: 'user', attributes: ['id', 'email', 'fullName', 'image', 'phoneNumber']}
                ],
                attributes: ['id', 'content', 'rate', 'image', 'watchId', 'createdAt']
            }
        );

        if (!comment) {
            return resolve({
                success: false,
                message: 'Không tìm thấy bình luận'
            })
        }

        resolve({
            success: true,
            comment
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.findAll = async (watchId) => new Promise(async (resolve, reject) => {
    try {
        const comments = await db.Comment.findAll({
            where: {watchId},
            raw: true,
            nest: true,
            include: [
                {model: db.User, as: 'user', attributes: ['id', 'email', 'fullName', 'image', 'phoneNumber']}
            ],
            attributes: ['id', 'content', 'rate', 'image', 'watchId', 'createdAt']
        });

        resolve({
            success: true,
            comments
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.update = async (payload, commentId, userId) => new Promise(async (resolve, reject) => {
    try {
        // Update without image
        if (!payload.image) {
            const rsp = await db.Comment.update(payload, {where: {id: commentId, userId}})

            // update failure
            if (rsp[0] === 0) {
                return resolve({
                    success: false,
                    message: 'Không tìm thấy bình luận hoặc người dùng không có quyền sửa bình luận này'
                })
            }

            // get comment updated
            const updateComment = await db.Comment.findByPk(
                commentId,
                {
                    raw: true,
                    nest: true,
                    include: [{model: db.User, as: 'user', attributes: ['id', 'email', 'fullName', 'image', 'phoneNumber']}],
                    attributes: ['id', 'content', 'rate', 'image', 'watchId', 'createdAt']
                }
            )
            resolve({
                success: true,
                message: 'Cập nhật bình luận thành công',
                updateComment
            })
        }
        // update with image
        else {
            const comment = await db.Comment.findOne({where: {id: commentId, userId}});

            if (!comment) {
                return resolve({
                    success: false,
                    message: 'Không tìm thấy bình luận hoặc người dùng không có quyền sửa bình luận này'
                })
            }

            // delete old image
            if (comment.cloudinaryId){
                await cloudinary.uploader.destroy(comment.cloudinaryId);
            }

            // upload new image
            const uploadImage = await cloudinary.uploader.upload(payload.image, {folder: 'watch_shop/comments'});
            fs.unlink(payload.image, (err) => {if (err) console.log(err)});

            payload = {
                ...payload,
                image: uploadImage.secure_url,
                cloudinaryId: uploadImage.public_id
            }

            // update comment
            await db.Comment.update(payload);

            // get comment updated
            const updateComment = await db.Comment.findByPk(
                commentId,
                {
                    raw: true,
                    nest: true,
                    include: [{model: db.User, as: 'user', attributes: ['id', 'email', 'fullName', 'image', 'phoneNumber']}],
                    attributes: ['id', 'content', 'rate', 'image', 'watchId', 'createdAt']
                }
            )
            resolve({
                success: true,
                message: 'Cập nhật bình luận thành công',
                updateComment
            })
        }
    } catch (error) {
        reject(error);
    }
}) 

exports.delete = async (commentId, userId) => new Promise(async (resolve, reject) => {
    try {
        const deleteComment = await db.Comment.findByPk(
            commentId, 
            {
                raw: true,
                nest: true,
                include: [
                    {model: db.User, as: 'user', attributes: ['id', 'email', 'fullName', 'image', 'phoneNumber']},
                    {model: db.Watch, as: 'watch', attributes: ['id', 'name', 'price', 'image', 'currentQuantity', 'description']}
                ],
                attributes: ['id', 'content', 'rate', 'image', 'watchId', 'createdAt']
            }
        );

        // delete comment in database
        const rsp = await db.Comment.destroy({where: {id: commentId, userId}});

        // if delete failure
        if (rsp[0] === 0) {
            return resolve({
                success: false,
                message: 'Không tìm thấy bình luận hoặc người dùng không có quyền xóa bình luận này'
            })
        }

        resolve({
            success: true,
            message: 'Xóa bình luận thành công',
            deleteComment
        })
    } catch (error) {
        reject(error);
    }
}) 
import db from '../models';
import cloudinary from '../utils/cloudinary';
import fs from 'fs';

exports.create = async payload => new Promise(async (resolve, reject) => {
    try {
        const brand = await db.Brand.findByPk(payload.brandId);
        if (!brand){
            return resolve({
                success: false,
                message: 'Thương hiệu không tồn tại'
            })
        }

        // upload image to cloudinary server
        const uploadImage = await cloudinary.uploader.upload(payload.image, {folder: 'watch_shop/watches'});
        fs.unlink(payload.image, (err) => { if(err) console.log(err) });

        payload = {
            ...payload,
            image: uploadImage.secure_url,
            cloudinaryId: uploadImage.public_id
        }

        // create new watch
        const newWatch = await db.Watch.create(payload);

        resolve({
            success: true,
            message: 'Thêm sản phẩm mới thành công',
            newWatch
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.findById = async watchId => new Promise(async (resolve, reject) => {
    try {
        const watch = await db.Watch.findByPk(
            watchId, 
            {
                raw: true,
                nest: true,
                include: [
                    {model: db.Brand, as: 'brand', attributes: ['id', 'name', 'image']}
                ],
                attributes: ['id', 'name', 'currentQuantity', 'image', 'price', 'description']
            }
        );

        if (!watch) {
            return resolve({
                success: false,
                message: 'Không tìm thấy sản phẩm'
            })
        }

        resolve({
            success: true,
            watch
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.findByBrand = async brandId => new Promise(async (resolve, reject) => {
    try {
        const watches = await db.Watch.findAll({
            raw: true,
            nest: true,
            where: {brandId},
            include: [
                { model: db.Brand, as: 'brand', attributes: ['id', 'name', 'image'] }
            ],
            attributes: ['id', 'name', 'currentQuantity', 'image', 'price', 'description']
        });

        resolve({
            success: true,
            watches
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.findAll = async () => new Promise(async (resolve, reject) => {
    try {
        const allWatches = await db.Watch.findAll({
            raw: true,
            nest: true,
            include: [
                { model: db.Brand, as: 'brand', attributes: ['id', 'name', 'image'] }
            ],
            attributes: ['id', 'name', 'currentQuantity', 'image', 'price', 'description']
        });

        resolve({
            success: true,
            allWatches
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.update = async (payload, watchId) => new Promise(async (resolve, reject) => {
    try {
        const watch = await db.Watch.findByPk(watchId, {raw: true});

        // Image not found
        if (!payload.image)
            await db.Watch.update(payload, {where: {id: watchId}});
        else {
            // delete image in cloudinary server
            await cloudinary.uploader.destroy(watch.cloudinaryId);

            // upload new image to cloudinary server
            const newImage = await cloudinary.uploader.upload(payload.image, {folder: 'watch_shop/watches'});
            fs.unlink(image, (err) => {if(err) console.log(err)})

            const payload = {
                ...payload,
                image: newImage.secure_url,
                cloudinaryId: newImage.public_id
            }

            await db.Watch.update(payload, {where: {id: watchId}});
        }

        // get watch updated
        const updateWatch = await db.Watch.findByPk(
            watchId, 
            {
                raw: true,
                nest: true,
                include: [{ model: db.Brand, as: 'brand', attributes: ['id', 'name', 'image'] }],
                attributes: ['id', 'name', 'price', 'currentQuantity', 'image', 'description']
            }
        );
        resolve({
            success: true,
            message: 'Cập nhật thông tin sản phẩm thành công',
            updateWatch
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.delete = async watchId => new Promise(async (resolve, reject) => {
    try {
        const deleteWatch = await db.Watch.findByPk(
            watchId, 
            {
                raw: true,
                nest: true,
                include: [{model: db.Brand, as: 'brand', attributes: ['id', 'name', 'image']}],
                attributes: ['id', 'name', 'image', 'currentQuantity', 'price', 'description']
            }
        );

        // delete product in database
        await db.Watch.destroy({where: {id: watchId}});

        resolve({
            success: true,
            message: 'Xóa sản phẩm thành công',
            deleteWatch
        })
    } catch (error) {
        reject(error);
    }
}) 
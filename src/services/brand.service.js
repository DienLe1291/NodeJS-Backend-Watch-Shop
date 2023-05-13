import db from '../models';
import cloudinary from "../utils/cloudinary";
import fs from 'fs';

exports.create = async (name, image) => new Promise(async (resolve, reject) => {
    try {
        // Check brand name already exist
        const brandExist = await db.Brand.findOne({where: {name}});
        if (brandExist) {
            return resolve({
                success: false,
                message: 'Thương hiệu đã tồn tại'
            })
        }

        // upload image to cloudinary server
        const uploadImage = await cloudinary.uploader.upload(image, {folder: 'watch_shop/brands'});
        fs.unlink(image, (err) => {
            if (err) console.log(err);
        });

        // create new brand
        const newBrand = await db.Brand.create({
            name,
            image: uploadImage.secure_url,
            cloudinaryId: uploadImage.public_id
        })

        resolve({
            success: true,
            message: 'Thêm mới thương hiệu thành công',
            newBrand
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.findById = async brandId => new Promise(async (resolve, reject) => {
    try {
        const brand = await db.Brand.findByPk(brandId);

        // brand not found
        if (!brand){
            return resolve({
                success: false,
                message: 'Không tìm thấy thương hiệu'
            })
        }

        resolve({
            success: true,
            brand
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.findAll = async () => new Promise(async (resolve, reject) => {
    try {
        const allBrands = await db.Brand.findAll();

        resolve({
            success: true,
            allBrands
        })
    } catch (error) {
        reject(error);
    }
}) 

exports.update = async (name, image, brandId) => new Promise(async (resolve, reject) => {
    try {
        const brand = await db.Brand.findOne({where: {id: brandId}});

        // Image not found
        if (!image) {
            // update brand in database
            await db.Brand.update(
                {name: name ? name : brand.name},
                {where: {id: brandId}}
            )

            // get brand updated
            const updateBrand = await db.Brand.findOne({where: {id: brandId}});
            return resolve({
                success: true,
                message: 'Cập nhật thông tin thương hiệu thành công',
                updateBrand
            })
        }
        else {
            // delete old image in cloudinary server
            await cloudinary.uploader.destroy(brand.cloudinaryId);

            // upload new image to cloudinary server
            const newImage = await cloudinary.uploader.upload(image, {folder: 'watch_shop/brands'});
            fs.unlink(image, (err) => {console.log(err)})

            // update brand in database
            await db.Brand.update(
                {
                    name: name ? name : brand.name,
                    image: newImage.secure_url,
                    cloudinaryId: newImage.public_id
                },
                {where: {id: brandId}}
            )

            // get brand updated
            const updateBrand = await db.Brand.findOne({where: {id: brandId}});
            return resolve({
                success: true,
                message: 'Cập nhật thông tin thương hiệu thành công',
                updateBrand
            })
        }
    } catch (error) {
        reject(error);
    }
}) 

exports.delete = async brandId => new Promise(async (resolve, reject) => {
    try {
        const deleteBrand = await db.Brand.findOne({ where: {id: brandId} })

        // delete brand in database
        await db.Brand.destroy({where: {id: brandId}});

        // delete image in cloudinary store
        await cloudinary.uploader.destroy(deleteBrand.cloudinaryId);

        resolve({
            success: true,
            message: 'Xóa thương hiệu thành công',
            deleteBrand
        })
    } catch (error) {
        reject(error);
    }
}) 
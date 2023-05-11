import Brand from '../models/brand.model';
import cloudinary from "../utils/cloudinary";

exports.create = async (name, image) => {
    try {
        // Check brand name already exist
        const brandExist = await Brand.findOne({where: {name}});
        if (brandExist) {
            return {
                success: false,
                statusCode: 400,
                message: 'Thương hiệu đã tồn tại'
            }
        }

        // upload image to cloudinary server
        const uploadImage = await cloudinary.uploader.upload(image, {folder: 'watch_shop/brands'});

        // create new brand
        const newBrand = await Brand.create({
            name,
            image: uploadImage.secure_url,
            cloudinaryId: uploadImage.public_id
        })

        return {
            success: true,
            statusCode: 200,
            message: 'Thêm mới thương hiệu thành công',
            newBrand
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

exports.findById = async brandId => {
    try {
        // find brand by id in database
        const brand = await Brand.findOne({
            where: {id: brandId},
            attributes: {exclude: 'cloudinaryId'}
        });

        // brand not found
        if (!brand){
            return {
                success: false,
                statusCode: 400,
                message: 'Không tìm thấy thương hiệu'
            }
        }

        return {
            success: true,
            statusCode: 200,
            brand
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

exports.findAll = async () => {
    try {
        // get all brands in database
        const allBrands = await Brand.findAll({
            attributes: {exclude: 'cloudinaryId'}
        });

        return {
            success: true,
            statusCode: 200,
            allBrands
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

exports.update = async (name, image, brandId) => {
    try {
        const brand = await Brand.findOne({where: {id: brandId}});

        // Image not found
        if (!image) {
            // update brand in database
            await Brand.update(
                {name: name ? name : brand.name},
                {where: {id: brandId}}
            )

            const updateBrand = await Brand.findOne({where: {id: brandId}});

            return {
                success: true,
                statusCode: 200,
                message: 'Cập nhật thông tin thương hiệu thành công',
                updateBrand
            }
        }
        else {
            // delete old image in cloudinary server
            await cloudinary.uploader.destroy(brand.cloudinaryId);

            // upload new image to cloudinary server
            const newImage = await cloudinary.uploader.upload(image, {folder: 'watch_shop/brands'});

            // update brand in database
            await Brand.update(
                {
                    name: name ? name : brand.name,
                    image: newImage.secure_url,
                    cloudinaryId: newImage.public_id
                },
                {where: {id: brandId}}
            )

            const updateBrand = await Brand.findOne({where: {id: brandId}});

            return {
                success: true,
                statusCode: 200,
                message: 'Cập nhật thông tin thương hiệu thành công',
                updateBrand
            }
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

exports.delete = async brandId => {
    try {
        const deleteBrand = await Brand.findOne({
            where: {id: brandId},
            attributes: {exclude: 'cloudinaryId'}
        })

        await Brand.destroy({where: {id: brandId}});

        return {
            success: true,
            statusCode: 200,
            message: 'Xóa thương hiệu thành công',
            deleteBrand
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
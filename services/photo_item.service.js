const PhotoItem = require("../models/photo_item");

class PhotoItemService {
  static async createPhotoItem(photoContent) {
    try {
      // 아이템 생성
      const createdPhotoItem = await PhotoItem.create({ data: photoContent });

      return createdPhotoItem;
    } catch (error) {
      // 에러 처리: 생성 중 문제 발생 시 예외 처리
      console.error("PhotoItem 생성 실패:", error);
      throw new Error("PhotoItem 생성 실패");
    }
  }
}

module.exports = PhotoItemService;

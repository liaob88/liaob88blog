import * as cloudinary from "cloudinary"

export default class CloudinaryService {
  overlayText: string = ""

  constructor(textOnImage: string) {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    this.overlayText = textOnImage
  }

  private createTransformationConfig() {
    return [
      {
        overlay: {
          font_family: "Verdana",
          font_size: 65,
          font_weight: "bold",
          text: this.overlayText,
        },
        width: 800,
        height: 400,
        crop: "fit",
      },
    ]
  }

  getImageUrl(): string {
    return cloudinary.v2.url(process.env.BASE_IMAGE, {
      transformation: this.createTransformationConfig(),
      sign_url: true,
      type: "authenticated",
      secure: true,
    })
  }
}

import {AttributeValue} from "@aws-sdk/client-dynamodb/dist-types/models/models_0";

export interface PortfolioModel {
  username: string;
  name: string;
  email: string;
  image_path: string;
  experience: string;
  address: string;
  zip_code: string;
  phone: string;
  twitter_user: string;
}

export class PortfolioModelUtils {
  static fromDatabase(databaseItem: { [key: string]: AttributeValue; }) : PortfolioModel {
    return {
      username: databaseItem['username'].S || "",
      name: databaseItem['name'].S || "",
      email: databaseItem['email'].S || "",
      image_path: databaseItem['image_path'].S || "",
      experience: databaseItem['experience'].S || "",
      address: databaseItem['address'].S || "",
      zip_code: databaseItem['zip_code'].S || "",
      phone: databaseItem['phone'].S || "",
      twitter_user: databaseItem['twitter_user'].S || ""
    }
  }

  static toDatabase(portfolioItem: PortfolioModel) {
    if (!portfolioItem.username || !portfolioItem.name || !portfolioItem.email) {
      throw { status: 400, message: "Missing required data" };
    }

    return {
      username: {
        S: portfolioItem.username
      },
      name: {
        S: portfolioItem.name
      },
      email: {
        S: portfolioItem.email
      },
      image_path: {
        S: portfolioItem.image_path || ""
      },
      experience: {
        S: portfolioItem.experience || ""
      },
      address: {
        S: portfolioItem.address || ""
      },
      zip_code: {
        S: portfolioItem.zip_code || ""
      },
      phone: {
        S: portfolioItem.phone || ""
      },
      twitter_user: {
        S: portfolioItem.twitter_user || ""
      }
    }
  }
}

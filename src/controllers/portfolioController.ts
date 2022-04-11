import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  ListTablesCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import {PortfolioModel, PortfolioModelUtils} from "../models/portfolioModel";

export class PortfolioController {
  private tableName = 'portfolio';
  private client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
      }
    });
  }

  async listTables() {
    const command = new ListTablesCommand({});
    const results = await this.client.send(command);
    return results.TableNames;
  }

  async getItem(itemKey: string) {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: {
        username: {
          S: itemKey
        }
      }
    });
    const results = await this.client.send(command);
    if (results?.Item) {
      return PortfolioModelUtils.fromDatabase(results.Item);
    } else {
      throw { status: 404, message: "Record not found" };
    }
  }

  async insertItem(record: PortfolioModel) {
    const item = PortfolioModelUtils.toDatabase(record);

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: item,
      ConditionExpression: "attribute_not_exists(username)"
    });
    try {
      await this.client.send(command);
    } catch (e) {
      throw { status: 400, message: "Username already taken" };
    }
  }

  async updateItem(record: PortfolioModel) {
    const item = PortfolioModelUtils.toDatabase(record);

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: item,
      ConditionExpression: "attribute_exists(username)"
    });
    try {
      await this.client.send(command);
    } catch (e) {
      throw { status: 404, message: "Record not found" };
    }
  }

  async deleteItem(itemKey: string) {
    const command = new DeleteItemCommand({
      TableName: this.tableName,
      Key: {
        username: { S: itemKey }
      },
      ConditionExpression: "attribute_exists(username)"
    });
    try {
      await this.client.send(command);
    } catch (e) {
      throw { status: 404, message: "Record not found" };
    }
  }
}

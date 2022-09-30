import env from "@architecture-it/react-env";
import { IPricebookItemPostDTO } from "interfaces/pricebook-item";
import ServiceBase from "services/ServiceBase";

const PRICEBOOK_ITEM_ENDPOINT = env("PRICEBOOK_ITEM_ENDPOINT");

class PricebookItemService extends ServiceBase {
  constructor() {
    super();
  }

  postItem = (data: IPricebookItemPostDTO) => this.client.post(PRICEBOOK_ITEM_ENDPOINT, data);
}

export default new PricebookItemService();

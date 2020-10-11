import algoliasearch from "algoliasearch";
import { appId, apiKey, index as _index } from "./Secret";

import howtoService from "../service/HowtoService";
import { SearchItem } from "./SearchItem";

const client = algoliasearch(appId, apiKey);
const index = client.initIndex(_index);

const indexHowToContent = () => {
  const categoryPath = "/howto";

  howtoService(categoryPath, (content) => {
    const searchContents = indexContent(content, [], "");

    index
      .saveObjects(searchContents)
      .then(({ objectIDs }) => {
        console.info("Algolia :: Content sent");
        console.info(objectIDs);
      })
      .catch((err) => {
        console.error("Algolia :: Error when sending content =>", err);
      });
  });
};

const indexContent = (data, arr, path) => {
  const howtoList = data.howtoList;
  const subCategoryList = data.subCategoryList;

  Object.keys(howtoList).map((key) => {
    const label = howtoList[key].label;
    const newPath = path + "/" + label;
    const searchItem = new SearchItem(
      newPath.substring(1, newPath.length),
      HitType.HOWTO,
      label.replace(".howto", "").replace("-", " ").replace("_", " "),
      howtoList[key]
    );

    arr.push(searchItem);
  });

  Object.keys(subCategoryList).map((key) => {
    const name = subCategoryList[key].name;
    const newPath = path + "/" + name;
    const searchItem = new SearchItem(
      newPath.substring(1, newPath.length),
      HitType.CATEGORY,
      name.replace(".howto", "").replace("-", " ").replace("_", " "),
      subCategoryList[key]
    );

    arr.push(searchItem);

    indexContent(subCategoryList[key], arr, newPath);
  });

  return arr;
};

const HitType = {
  HOWTO: "howto_hit",
  CATEGORY: "category_hit",
};

export { client, index, indexHowToContent };

import { readFileSync } from "fs";

import Category from "../model/Category";
import HowTo from "../model/HowTo";

import MOCK_CATEGORY from "../constants/MockHowtoContent";
import { glob } from "glob";

const generateHowto = (
  howtoRootDir: string | null,
  categoryPath = ""
): Promise<Category> => {

  const parseScriptOutput = (
    categoryPath: string,
    howtoFilePathList: string[]
  ): Category => {
    howtoFilePathList.pop(); // to remove trailing empty line at the end

    // put all file markdown content to the array
    const howtoCategoryList: { [s: string]: Category } = {};

    howtoFilePathList.forEach((howtoFilePath: string) => {
      let currentHowtoCategoryList: {
        [s: string]: Category;
      } = howtoCategoryList;
      let currentHowtoList: { [s: string]: HowTo } = {};

      /**
       * getting label of howto content
       *
       * e.g.  linux/bash/pg_dump
       *
       * parts : [linux, bash, pg_dump]
       * label : pg_dump
       */

      const parts: string[] = howtoFilePath
        .replace(
          `${howtoRootDir}${categoryPath.substring(
            0,
            categoryPath.lastIndexOf("/") + 1
          )}`,
          ""
        )
        .split("/");

      const label = parts.pop() || ""; //
      const categoryList = parts;

      categoryList.forEach((category) => {
        let foundCategory: Category | null = null;

        // search for existing category
        Object.keys(currentHowtoCategoryList).forEach((currCatKey) => {
          const currCat = currentHowtoCategoryList[currCatKey];
          if (currCat.name === category) {
            foundCategory = currCat;
          }
        });

        // category not found
        // Then create new menu item and append as sub-category to current category

        if (foundCategory === null) {
          foundCategory = new Category();
          foundCategory.name = category;
          currentHowtoCategoryList[category] = foundCategory;
        }

        currentHowtoCategoryList = foundCategory.subCategoryList;
        currentHowtoList = foundCategory.howtoList;
      });

      /*
        ROOT: /home/maemresen/tmp
        categoryPath: /howto
        howtoFilePath:
          /home/maemresen/tmp/howto/content.md
          /home/maemresen/tmp/howto/linx/content.md
          /home/maemresen/tmp/howto/linx/specific_distro/content.md
  
      */
      const markdownContent = readFileSync(howtoFilePath, "utf8");
      const tempList = categoryList;
      tempList.shift();
      const howto = new HowTo();
      howto.categoryList = tempList;
      howto.label = label;
      howto.filePath = howtoFilePath;
      howto.markdownContent = markdownContent;
      currentHowtoList[label] = howto;
    });

    const result = howtoCategoryList[""];
    if (result === undefined) {
      return new Category();
    } else {
      return result;
    }
  };

  return new Promise<Category>((resolve, reject) => {
    if (howtoRootDir === null) {
      resolve(MOCK_CATEGORY);
      return;
    }

    glob(`${howtoRootDir}/**/*.md`, {}, (er, files: string[]) => {
      try {
        if (er) {
          reject(er);
        } else {
          //   const result = parseScriptOutput();
          const result = parseScriptOutput(categoryPath, files);
          if (Object.keys(result).length === 0) {
            reject("error");
          } else {
            resolve(result);
          }
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  });
};

export default generateHowto;

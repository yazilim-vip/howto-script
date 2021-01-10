import { ChildProcess, exec } from 'child_process'
import { readFileSync } from 'fs'

import { glob } from 'glob'

import MOCK_CATEGORY from '../constants/MockHowtoContent'
import Category from '../models/Category'
import HowTo from '../models/HowTo'

const generateHowto = (
    howtoRootDir: string | null,
    successHandler: (arg0: Category) => void,
    categoryPath = '',
    failureHandler: <T>(arg0: T) => void = (msg) => console.error(msg)
): void => {
    if (howtoRootDir === null) {
        successHandler(MOCK_CATEGORY)
        return
    }

    const SEARCH_PATH = `${howtoRootDir}${categoryPath}`

    const script: ChildProcess = exec(`sh script.sh ${SEARCH_PATH}`)
    const stdout = script.stdout
    const stderr = script.stderr
    if (script === null || stdout === null || stderr == null) {
        failureHandler(999)
        return
    }

    glob(`${howtoRootDir}/**/*.md`, {}, (er, files: string[]) => {
        try {
            if (er) {
                failureHandler(er)
            } else {
                //   const result = parseScriptOutput();
                const result = parseScriptOutput(categoryPath, files)
                if (Object.keys(result).length === 0) {
                    failureHandler('error')
                } else {
                    successHandler(result)
                }
            }
        } catch (error) {
            console.error(error)
            failureHandler(error)
        }
    })

    const parseScriptOutput = (categoryPath: string, howtoFilePathList: string[]): Category => {
        howtoFilePathList.pop() // to remove trailing empty line at the end

        // put all file markdown content to the array
        const howtoCategoryList: { [s: string]: Category } = {}

        howtoFilePathList.forEach((howtoFilePath: string) => {
            let currentHowtoCategoryList: {
                [s: string]: Category
            } = howtoCategoryList
            let currentHowtoList: { [s: string]: HowTo } = {}

            /**
             * getting label of howto content
             *
             * e.g.  linux/bash/pg_dump
             *
             * parts : [linux, bash, pg_dump]
             * label : pg_dump
             */

            const parts: string[] = howtoFilePath
                .replace(`${howtoRootDir}${categoryPath.substring(0, categoryPath.lastIndexOf('/') + 1)}`, '')
                .split('/')

            const label = parts.pop() || '' //
            const categoryList = parts

            categoryList.forEach((category) => {
                let foundCategory: Category | null = null

                // search for existing category
                Object.keys(currentHowtoCategoryList).forEach((currCatKey) => {
                    const currCat = currentHowtoCategoryList[currCatKey]
                    if (currCat.name === category) {
                        foundCategory = currCat
                    }
                })

                // category not found
                // Then create new menu item and append as sub-category to current category

                if (foundCategory === null) {
                    foundCategory = new Category()
                    foundCategory.name = category
                    currentHowtoCategoryList[category] = foundCategory
                }

                currentHowtoCategoryList = foundCategory.subCategoryList
                currentHowtoList = foundCategory.howtoList
            })

            /*
        ROOT: /home/maemresen/tmp
        categoryPath: /howto
        howtoFilePath:
          /home/maemresen/tmp/howto/content.md
          /home/maemresen/tmp/howto/linx/content.md
          /home/maemresen/tmp/howto/linx/specific_distro/content.md
  
      */
            const markdownContent = readFileSync(howtoFilePath, 'utf8')
            const tempList = categoryList
            tempList.shift()
            const howto = new HowTo()
            howto.categoryList = tempList
            howto.label = label
            howto.filePath = howtoFilePath
            howto.markdownContent = markdownContent
            currentHowtoList[label] = howto
        })

        const result = howtoCategoryList['']
        if (result === undefined) {
            return new Category()
        } else {
            return result
        }
    }
}

export default generateHowto

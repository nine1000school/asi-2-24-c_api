import deepmerge from "deepmerge"
import { readFile, writeFile } from "node:fs/promises"

class Database {
  #dbFilename = null
  #db = null

  constructor(dbFilename) {
    this.#dbFilename = dbFilename
  }

  async load() {
    const data = await readFile(this.#dbFilename, {
      encoding: "utf-8",
      flag: "a+",
    })

    this.#db = data
      ? JSON.parse(data)
      : {
          lastId: 0,
          todos: {},
        }

    return this
  }

  get data() {
    return this.#db
  }

  async write(patch) {
    this.#db = deepmerge(this.#db, patch)

    await writeFile(this.#dbFilename, JSON.stringify(this.#db), {
      encoding: "utf-8",
    })

    return this
  }
}

export default Database

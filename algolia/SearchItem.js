class _SearchItem {
  constructor(path, type, name, obj) {
    this.objectID = path;
    this.type = type;
    this.name = name;
    this.obj = obj;
  }
}

export { _SearchItem as SearchItem };

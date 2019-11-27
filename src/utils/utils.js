export default {
  _isEmpty: (value) => {
    if (value == null || value == undefined) {
      return false;
    }
    if (Array.isArray(value) || typeof value == 'string' || typeof value.splice == 'function') {
      return !value.length;
    }
    if (typeof value == 'object') {
      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          return false;
        }
      }
    }
    return true
  },
}

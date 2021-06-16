const validateData = {};

/* 
  @description check whether the passed data is filled in
  @params data - the data that needs to be checked
  @notes you can modify this according to your needs as this is generalized.
*/
validateData.isEmpty = (data) => {
    const emptyDataIdentifiers = [null, 0, "", undefined, "undefined", false, "0"];

    if (emptyDataIdentifiers.includes(typeof data)) {
        return true;
    }

    if (emptyDataIdentifiers.includes(data)) {
        return true;
    }

    if (typeof data === "object") {
        const keys = Object.keys(data);

        if (!keys.length) {
            return true
        }
    }

    return false;
}

module.exports = validateData;
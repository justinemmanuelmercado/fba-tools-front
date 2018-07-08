const service = function helperService() {
    /**
     * Checks if string is a number (only, 0-9, commas or decimal points or dash for negative)
     */
    const numberRegex = /^[0-9,.-]*$/;

    /**
     * Checks if string ends with valid image extensions
     * https://stackoverflow.com/a/9714891
     */
    const imageFileExtensionRegex = /\.(jpeg|jpg|gif|png)$/;

    /**
     * Checks if string is a URL
     * https://stackoverflow.com/a/15734347
     */
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    const isImageFile = (data) => {
        /**
         * @todo Ping request if image
         */
        if (typeof data === 'string') {
            return (data.match(imageFileExtensionRegex) != null);
        }
        return false;
    };

    const isWebsite = data => urlRegex.test(data);

    const isNumber = data => numberRegex.test(data);

    /**
     * @param {*} data String, identify data types common in the system
     * @returns {*} dataType String. Returns common identifier used in the system
     */
    const identifyDataType = (data) => {
        if (!data && data !== 0) {
            return false;
        }

        if (isImageFile(data)) {
            return 'image';
        }

        if (isWebsite(data)) {
            return 'website';
        }

        if (isNumber(data)) {
            return 'number';
        }

        return 'string';
    };

    return {
        identifyDataType,
        isNumber,
        isWebsite,
        isImageFile,
    };
};

service.$inject = [];

module.exports = service;

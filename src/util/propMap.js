/** @module util */

/**
 * A basic map-like object.
 */
class PropMap {
    /**
     * Constructor.
     * @param {object} props the initial properties 
     */
    constructor(props) {
        this.props = (typeof props === 'object' ? props : {});
    }

    /**
	 * Get, set, or remove a property value.
	 *
	 * @param {string} key the key to get or set the value for
	 * @param {*} [newValue] if defined, the new value to set for the given `key`;
	 *                       if `null` then the `key` property will be removed
	 * @returns {*} if called as a getter, the associated value for the given `key`,
	 *              otherwise this object
	 */
	prop(key, newValue) {
		if ( arguments.length === 1 ) {
			return this.props[key];
		}
		if ( newValue === null ) {
			delete this.props[key];
		} else {
			this.props[key] = newValue;
		}
		return this;
	}

    /**
	 * Get, set, or remove multiple properties.
	 * 
	 * @param {object} [newProps] the new values to set; if any value is `null` that property
     *                            will be deleted
	 * @returns {object} if called as a getter, all properties of this object copied into a 
     *                   simple object; otherwise this object
	 */
	properties(newProps) {
		if ( newProps ) {
			for ( const k of Object.keys(newProps) ) {
				this.prop(k, newProps[k]);
			}
			return this;
		}
		return Object.assign({}, this.props);
	}

    /**
     * Get this object as a standard URI encoded (query parameters) string value.
     * 
     * All enumerable properties of the <code>props</code> property will be added to the
     * result. If any property value is an array, the values of the array will be joined
     * by a comma.
     * 
     * @param {string} [propertyName] an optional object property prefix to add to all properties
     * @return {string} the URI encoded string
     */
    toUriEncoding(propertyName) {
        let result = '';
        for ( const k of Object.keys(this.props) ) {
            if ( result.length > 0 ) {
                result += '&';
            }
            if ( propertyName ) {
                result += encodeURIComponent(propertyName) + '.';
            }
            result += encodeURIComponent(k) + '=';
            const v = this.props[k];
            if ( Array.isArray(v) ) {
                v.forEach((e, i) => {
                    if ( i > 0 ) {
                        result += ',';
                    }
                    result += encodeURIComponent(e);
                });
            } else {
                result += encodeURIComponent(v);
            }
        }
        return result;
    }
}

export default PropMap;
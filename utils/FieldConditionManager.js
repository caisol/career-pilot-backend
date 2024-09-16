class FieldConditionManager{
    static has(key,candidate){
        return !!candidate[key]
    }
    static hasNot(key,candidate){
        return !candidate[key]
    }
    static hasLength(key,candidate,length){
        return candidate[key]?.length === length
    }
    static hasLengthGreaterThan(key,candidate,length){
        return candidate[key]?.length > length
    }
    static hasLengthLessThan(key,candidate,length){
        return candidate[key]?.length < length
    }
    static includes(key,candidate,length,keyword){
        return candidate[key]?.includes(keyword,)
    }
    static notIncludes(key,candidate,length,keyword){
        return !candidate[key]?.includes(keyword)
    }
}

module.exports = FieldConditionManager
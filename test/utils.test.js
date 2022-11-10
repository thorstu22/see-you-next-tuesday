
import { transformString } from "../helpers/utils.js"

it('can transform a name string into wikipedia format', () => {
    let theName = "eDdie HaLL";
    expect(transformString(theName)).toBe("Eddie+Hall")

    theName = "jUlian cLary"
    expect(transformString(theName)).toBe("Julian+Clary")


    theName = "helena bonham carter"
    expect(transformString(theName)).toBe("Helena+Bonham+Carter")

    theName = "dIck vAn dyKe"
    expect(transformString(theName)).toBe("Dick+Van+Dyke")
})


it('throws an error if the string isnt valid', () => {
    const theName = 123;
    expect(() => { transformString(theName) }).toThrowError("Not a valid string")
})
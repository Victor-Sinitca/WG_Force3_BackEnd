type nationType =
    "china"
    | "czech"
    | "france"
    | "germany"
    | "italy"
    | "japan"
    | "poland"
    | "sweden"
    | "uk"
    | "usa"
    | "ussr"
type typeType = "AT-SPG" | "heavyTank" | "lightTank" | "mediumTank" | "SPG"
type tierType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

type TechniqueType = {
    id: string,
    name: string,
    description: string,
    nation: nationType,
    type: typeType,
    tier: tierType,
    price: {
        value: string,
        currency: string,
        discount:string,
    },
    images: {
        big_icon: string,
        contour_icon: string,
        small_icon: string
    },
}
type Premium = {
    id: string,
    name: string,
    description: string,
    price: {
        value: string,
        currency: string,
        discount:string,
    },
    images: {
        big_icon: string,
        small_icon: string
    },
}
type ProductType = "technique" | "premium" | "gold" | "provisions"
type Product = {
    type: ProductType,
    filterItem: Array<ProductType>,
    priority: number,
    span: number,
    data: Premium | TechniqueType
}



type UserType={
    id: string,
    name: string,
    wishlist: Array<string>,
    shoppingList: Array<string>,
}

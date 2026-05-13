import type UsdModel from "./UsdModel"

export default interface CurrentPriceModel extends UsdModel {
    eur: number
    ils: number
}
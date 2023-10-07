/******************************************************************************
Selection Interface
******************************************************************************/

export interface InstanceState {
    hand : number[];
    dealt : boolean;
    bet : number;
    last_outcome : string
    last_win : string

}

export function isInstanceState(object : any) : boolean {
    return !(object instanceof String) &&
    typeof(object) !== "string" &&
    'hand' in object &&
    'dealt' in object &&
    'bet' in object &&
    'last_outcome' in object &&
    'last_win' in object

}
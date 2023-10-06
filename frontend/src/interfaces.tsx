/******************************************************************************
Selection Interface
******************************************************************************/

export interface InstanceState {
    pool_id : number;
    entry : string;
    denom : string;
    mode: number;
    prize: string;
    pts: number;
    players: number;
}

export function isInstanceState(object : any) : boolean {
    return !(object instanceof String) &&
    typeof(object) !== "string" &&
    'hand' in object &&
    'dealt' in object &&
    'bet' in object 
}
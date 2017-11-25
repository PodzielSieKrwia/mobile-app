export interface Phone {
    number: string
    desc: string
}

export interface Email {
    email: string
}

export interface Location {
    lat: number
    lng: number
}

export interface Message {
    text:string
}

export interface Inventory {
    byType?:{[index: string]: number}
    messages?:Message[]
    updatedAt:string
}

export interface Station {
    uid:string
    name:string
    city:string
    address?:string
    contact?: {
        phones?:Phone[]
        emails?:Email[]
    }
    location? : Location
    website? : string
    parentUid? : string
    inventory? : Inventory
}

export interface Stations {
    [index: string]: Station;
}

export interface Donation {
    type:string     //B (full blood), P (plasma), T (plaTeletes)
    amount:number   //ml
    date:string     //YYYYMMDD (TBD) 
}

export interface UserProfile {
    wizardCompleted?:boolean
    stationUid?:string
    bloodType?:string
    sex?:string
    donations?: Donation[]
}

export const DONATION_TYPES = ['B','P','T'];
export const BLOOD_TYPES = ['0-','0+','B-','B+','A-','A+','AB-','AB+']
export const SEX = ['W','M'];

export const MSG = {
    'pl' : {
        'donation_type.B' : 'Krew',
        'donation_type.P' : 'Osocze',
        'donation_type.T' : 'Płytki',
        'sex.W' : 'Kobieta',
        'sex.M' : 'Męzczyzna'
    }
}
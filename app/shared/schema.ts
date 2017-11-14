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

export interface Station {
    uid?:string
    name?:string
    address?:string
    contact?: {
        phones?:Phone[]
        emails?:Email[]
    }
    location? : Location
    website? : string
    parent? : string
}

export interface Stations {
    [index: string]: Station;
}

export interface UserProfile {
    wizardCompleted?:boolean
    station?:string
    bloodType?:string
    sex?:string
}

export const BLOOD_TYPES = ['0-','0+','B-','B+','A-','A+','AB-','AB+']
export const SEX = ['W','M'];
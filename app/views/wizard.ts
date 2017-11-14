import * as frame from 'ui/frame';

export class Wizard {
    
    constructor(private entries:Array<frame.NavigationEntry>, private index:number = 0) {
    }

    next(): Wizard {
        return new Wizard(this.entries, this.index+1);
    }

    navigate(): void {
        let navEntry = Object.assign({}, this.entries[this.index], {context:{wizard:this}});
        frame.topmost().navigate(navEntry);
    }

}
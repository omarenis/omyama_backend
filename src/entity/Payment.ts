import {Participation} from "./Participation";

class PaymentModel {
    id: number;
    participation: Participation;
    date: Date;
    method: string;
}

class Payment {
    constructor(
        public participation: Participation | number,
        public date: Date,
        method: string,
        public id ?: number,
    ) {
    }
}

import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation,
} from "@angular/core";
import { MatSliderChange } from "@angular/material/slider";
import { IntervalDimensionInfo } from "src/app/models/conversational/common.model";

@Component({
    selector: "chat-input-interval",
    templateUrl: "chat-input-interval.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./chat-input-interval.component.css"],
})
export class ChatInputIntervalComponent implements OnInit {
    public range = [0, 10];
    public step = 1;
    public value = 0;
    @Input() public intervalInfo: IntervalDimensionInfo = null;
    @Input() public disableInput!: boolean;

    @Output() public send = new EventEmitter();

    ngOnInit() {
        if (!!this.intervalInfo) {
            this.range[0] = this.intervalInfo.min;
            this.range[1] = this.intervalInfo.max;
            this.step = this.intervalInfo.step;
            this.value = this.intervalInfo.value ?? 0;
        }
    }

    formatLabel(value: number): string {
        return `${value}`;
    }

    onInputChange(event: MatSliderChange) {
        this.disableInput = false;
        this.value = event.value;
    }

    onSubmit() {
        // prendo il msg, se è vuoto non faccio nulla
        const message = `${this.value}`;

        // invio il messaggio
        this.send.emit({ message });
    }
}

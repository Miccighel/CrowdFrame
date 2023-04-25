import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from "@angular/core";

@Component({
    selector: "chat-input-text",
    templateUrl: "chat-input-text.component.html",
    styleUrls: ["./chat-input-text.component.css"],
})
export class ChatInputTextComponent {
    @Output() public send = new EventEmitter();
    @Input() public pholder!: string;
    @Input() public readOnly!: boolean;

    @ViewChild("message", { static: true }) message!: ElementRef;
    @ViewChild("buttons") buttons!: ElementRef;

    public getMessage() {
        return this.message.nativeElement.value;
    }

    public clearMessage() {
        this.message.nativeElement.value = "";
    }

    onSubmit() {
        // prendo il msg, se è vuoto non faccio nulla
        const message = this.getMessage();

        if (message.trim() === "") {
            return;
        }
        // invio il messaggio
        this.send.emit({ message });
        // resetto l'input field
        this.clearMessage();
    }

    ngOnChanges() {
        this.message.nativeElement.value = this.pholder;
        this.message.nativeElement.disabled = this.readOnly;
    }
}

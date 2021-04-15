import React, { useState, useEffect, memo } from "react";
import "./Confirm.css";

interface IProps {
    open: boolean;
    title: string;
    content: string;
    cancelCaption?: string;
    okCaption?: string;
    onOkClick: () => void;
    onCancelClick: () => void;
}

const Confirm: React.FunctionComponent<IProps> = memo((props) => {
    const [cancelClickCount, setCancelClickCount] = useState(0);
    const handleCancelClick = () => {
        const newCount = cancelClickCount + 1;
        setCancelClickCount(newCount);
        if (newCount >= 2) {
            props.onCancelClick();
        }
    };
    const handleOkClick = () => {
        props.onOkClick();
    };

    useEffect(() => {
        console.log("Run");

        return () => {
            console.log("Remove");
        };
    }, [props.open]);

    console.log("Confirm rendering");

    return (
        <div
            className={`confirm-wrapper ${
                props.open ? "confirm-visible" : ""
            }`}>
            <div className="confirm-container">
                <div className="confirm-title-container">
                    <span>{props.title}</span>
                </div>
                <div className="confirm-content-container">
                    <p>{props.content}</p>
                </div>
                <div className="confirm-buttons-container">
                    <button
                        onClick={handleCancelClick}
                        className="confirm-cancel">
                        {props.cancelCaption}
                    </button>
                    <button onClick={handleOkClick} className="confirm-ok">
                        {props.okCaption}
                    </button>
                </div>
            </div>
        </div>
    );
});

Confirm.defaultProps = {
    cancelCaption: "cancel",
    okCaption: "ok",
    open: false,
};

export default Confirm;

// interface ITextBox {
//     control: "TextBox";
//     value: string;
//     multiline: boolean;
// }

// interface IDatePicker {
//     control: "DatePicker";
//     value: Date;
// }

// interface INumberSlider {
//     control: "NumberSlider";
//     value: number;
// }

// interface ICheckBox {
//     control: "CheckBox";
//     value: boolean;
// }

// type Field = ITextBox | IDatePicker | INumberSlider | ICheckBox;

// function initValue(field: Field) {
//     switch (field.control) {
//         case "TextBox":
//             field.value = "";
//             break;
//         case "DatePicker":
//             field.value = new Date();
//             break;
//         case "NumberSlider":
//             field.value = 0;
//             break;
//         case "CheckBox":
//             field.value = false;
//             break;
//         default:
//             const shouldNotReac: never = field;
//     }
// }

// function getData<T>(url: string): Promise<T> {
//     return fetch(url).then((response) => {
//         if (!response.ok) {
//             throw new Error(response.statusText);
//         }

//         return response.json();
//     });
// }

interface IPerson {
    id: number;
    name: string;
}

// getData<string>("asd").then((person) => person);

// class List<T> {
//     private data: T[] = [];

//     public getList(): T[] {
//         return this.data;
//     }

//     public add(item: T): number {
//         return this.data.push(item);
//     }
// }

// const billy: IPerson = { id: 1, name: "Billy" };
// const list = new List<IPerson>();

// list.add(billy);
// // const a = list.getList()

// function condense(stringOrArray: string): string;
// function condense(stringOrArray: string[]): string[];
// function condense(stringOrArray: string | string[]): string | string[] {
//     return typeof stringOrArray === "string"
//         ? stringOrArray.split(" ").join("")
//         : stringOrArray.map((item) => item.split(" ").join(""));
// }

// type ReadonlyPerson = { readonly [P in keyof IPerson]: IPerson[P] };
// let jam: ReadonlyPerson = { id: 1, name: "asd" };

// type Stages = "Pending" | "Started" | "Completed";

// type Status<T> = { T: string };

// let status: IPerson = { id: 1 + 1, name: "asd" };

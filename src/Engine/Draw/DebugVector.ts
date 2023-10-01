import { _Drawable } from "../..";
import MathUtils from "../../Utils/Math";
import Color from "../Color";
import Map from "../Map";
import Rotation from "../Maths/Rotation";
import Vector2 from "../Maths/Vector2";
import Draw from "./Draw";

class DebugVector implements _Drawable {

    #from: Vector2;
    #to: Vector2;
    #color: Color;
    #thickness: number;

    #frame: number = 0;

    constructor(from: Vector2 = new Vector2(), to: Vector2 = new Vector2(), color: Color = Color.Fuchsia, thickness: number = 5) {
        this.#from = from;
        this.#to = to;
        this.#color = color;
        this.#thickness = thickness;
    }

    get from(): Vector2 {
        return this.#from;
    }
    get to(): Vector2 {
        return this.#to;
    }

    set from(from: Vector2) {
        this.#from = from;
    }
    set to(to: Vector2) {
        this.#to = to;
    }

    draw(ctx: CanvasRenderingContext2D) {
        Draw.draw(ctx, () => {
            ctx.strokeStyle = this.#color._toString;
            ctx.lineWidth = this.#thickness;
            ctx.fillStyle = this.#color._toString;

            let from = Map.getScreenCoordinates(this.#from);
            let to = Map.getScreenCoordinates(this.#to);
            let arrowSize = MathUtils.clamp(this.#thickness * 3, 10, 1000);
            if (Vector2.from(from).to(to).length <= arrowSize) {
                let color = this.#frame % 4 < 2 ? "#ff0000" : "#ffffff";
                ctx.strokeStyle = color;
                ctx.fillStyle = color;
            }

            to.add(Vector2.from(from).to(to).normalized.multiply(-arrowSize));
            let front = to.copy().add(Vector2.from(from).to(to).normalized.multiply(arrowSize));
            let frontDirection = Vector2.from(to).to(front).normalized;
            let arrowSides = Math.sin(Math.PI / 5) * arrowSize;


            let left = frontDirection.rotate(new Rotation(Math.PI / 2)).multiply(arrowSides).add(to);
            let right = frontDirection.rotate(new Rotation(-Math.PI / 2)).multiply(arrowSides).add(to);

            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();

            ctx.moveTo(front.x, front.y);
            ctx.lineTo(left.x, left.y);
            ctx.lineTo(right.x, right.y);
            ctx.lineTo(front.x, front.y);
            ctx.fill();

            return ["strokeStyle", "lineWidth", "fillStyle"];
        });
        this.#frame++;
    }
}

export default DebugVector;
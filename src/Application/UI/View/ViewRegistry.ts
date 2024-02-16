import { IRegistry } from "@/index"
import View from "@/Application/UI/View/View"

class ViewRegistry implements IRegistry {

    views: View[]
    id: string

    constructor(id: string = "views") {
        this.id = id
        this.views = []
    }

    get(viewName: string) {
        return this.views.find((view: View) => view.name === viewName)
    }

    alreadyExists(view: View): boolean {
        return this.views.map(v => v.name).includes(view.name)
    }

    register(views: View | View[]): void {
        if (!Array.isArray(views)) {
            views = [views]
        }
        views.forEach(view => {
            if (!this.alreadyExists(view)) {
                this.views.push(view)
            }
        })
    }
}

export default ViewRegistry
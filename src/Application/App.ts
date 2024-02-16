import UI from "@ui/main"
import Project from "@gameengine/Core/Project"

class App {

    static load() {

    }

    static launch(mountOn: string, project: Project) {
        UI.setup()

        UI.mount(mountOn)
    }
}

export default App
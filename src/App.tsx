import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export const App = defineComponent({
  setup(/*props, ctx*/) {
    return () => (
      <div class="container w-screen h-screen">
        <RouterView />
      </div>
    )
  },
})

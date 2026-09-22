import {defineComponent} from 'vue'
import {RouterLink, RouterView,} from 'vue-router'

export const App = defineComponent({
  setup(/*props, ctx*/) {
    return () => <>
      <nav>
        <ul>
          <li><RouterLink to="/foo">foo</RouterLink></li>
          <li><RouterLink to="/bar">bar</RouterLink></li>
        </ul>
      </nav>
      <main>
        <RouterView/>
      </main>
    </>
  },
})

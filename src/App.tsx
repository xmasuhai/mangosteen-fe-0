import { defineComponent  } from 'vue'
import {storeToRefs} from 'pinia'
import {useCounterStore} from '@/stores/counter.ts'

export const App = defineComponent({
  setup(/*props, ctx*/) {
    const { count } = storeToRefs(useCounterStore())
    const { increment } = useCounterStore()

    return () => <>
      <h1>count {count.value}</h1>
      <button onClick={increment}>+ 1</button>
    </>
  },
})

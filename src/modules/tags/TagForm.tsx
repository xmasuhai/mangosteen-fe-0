import { defineComponent } from 'vue'

/**
 * @Description: 标签表单
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-17 15:55:38
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-17 16:47:23
 * @FilePath: src/modules/tags/TagForm.tsx
 */
export const TagForm = defineComponent({
  name: 'TagForm',
  setup(/* _props, _ctx */) {
    const navList = [
      '表情',
      '手势',
      '职业',
      '衣服',
      '动物',
      '自然',
      '实物',
      '运动',
    ]
    return () => (
      <form>
        <div>
          <label>
            <span>标签名称</span>
            <input class="b-1 b-[#ddd]" />
          </label>
        </div>

        <div>
          <label>
            <span>符号</span>
            <div>
              <nav>
                {navList.map(item => <span>{item}</span>)}
              </nav>

              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
                <li>11</li>
              </ul>
            </div>
          </label>
        </div>

        <div>
          <p>记账时长按即可进行编辑</p>
        </div>

        <div>
          <button>确定</button>
        </div>
      </form>
    )
  },
})

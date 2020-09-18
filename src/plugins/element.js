import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


// 挂载提示消息
Vue.prototype.$message = Element.Message
// 挂载确认消息框
Vue.prototype.$confirm = Element.MessageBox.confirm

Vue.use(Element)

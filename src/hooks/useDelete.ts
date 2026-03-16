import { ExclamationCircleOutlined } from "@ant-design/icons-vue"
import { message, Modal } from "ant-design-vue"
import { h } from "vue"



export function confirmDelete(
    id: string,
    deleteApi: (params: { _id: string }) => Promise<any>,
    onSuccess?: () => void
) {
    Modal.confirm({
        title: '确认要删除吗?',
        icon: h(ExclamationCircleOutlined),
        content: '此操作不可恢复',
        okText: '删除',
        cancelText: '取消',
        async onOk() {
            try {
                const res = await deleteApi({ _id: id })
                if (res.code === 200) {
                    message.success('删除成功！')
                    onSuccess?.()
                } else {
                    message.error(res.message || '删除失败')
                }
            } catch (error) {
                message.error('删除失败')
                console.error(error)
            }
        }
    })
}
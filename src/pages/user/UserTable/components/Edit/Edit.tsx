import { upDataUser } from '@/services/ant-design-pro/api'
import { ProForm, ProFormText } from '@ant-design/pro-components'
import { message, Modal } from 'antd'

export default function Create(props:any) {

  let { isModalOpenEdit, setIsModalOpenEdit, actionRef ,currentUserInfo} = props

  // 关闭新建对话框
  function handleCancel() {
    setIsModalOpenEdit(false)
  }

  // 提交表单
  function subForm(userId:number,values:any) {
    let res = upDataUser(userId,values)
    // @ts-ignore
    if (!res.status) {
      setIsModalOpenEdit(false)
      message.success('修改成功')
      actionRef.current.reload();
    }
  }
  console.log(currentUserInfo)

  return (
    <Modal title="创建新用户" open={isModalOpenEdit} onCancel={handleCancel} footer={null} destroyOnClose={true}>
      <ProForm
      // @ts-ignore
        onFinish={(values) => subForm(currentUserInfo.id,values)}
        initialValues = {currentUserInfo}
      >
        <ProFormText
          width="md"
          name="name"
          label="昵称"
          tooltip="最长为 12 位"
          placeholder="请输入名称"
          rules={[
            {
              required: true,
              message: '昵称最长12位',
              max: 12,
            }
          ]}
        />
        <ProFormText
          width="md"
          name='email'
          label="邮箱"
          placeholder="请输入邮箱"
          rules={[
            {
              required: true,
              message: '请输入合法的邮箱',
              type: 'email',
            }
          ]}
        />
      </ProForm>
    </Modal>
  )
}

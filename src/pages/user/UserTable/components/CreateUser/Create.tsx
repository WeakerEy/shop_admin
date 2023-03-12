import { createUser } from '@/services/ant-design-pro/api'
import { ProForm, ProFormText } from '@ant-design/pro-components'
import { message, Modal } from 'antd'

export default function Create(props:any) {

  let { isModalOpen, setIsModalOpen, actionRef } = props


  // 关闭新建对话框
  function handleCancel() {
    setIsModalOpen(false)
  }

  // 提交表单
  function subForm(values:any) {
    console.log(values)
    let res = createUser(values)
    // @ts-ignore
    if (!res.status) {
      setIsModalOpen(false)
      message.success('添加成功')
      actionRef.current.reload();
    }
  }


  return (
    <Modal title="创建新用户" open={isModalOpen} onCancel={handleCancel} footer={null} destroyOnClose={true}>
      <ProForm
      // @ts-ignore
        onFinish={(values) => subForm(values)}>
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
              max: 12
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
              type: 'email'
            }
          ]}
        />
        <ProFormText.Password
          width="md"
          name='password'
          label="密码"
          placeholder="请输入密码"
          rules={[
            {
              required: true,
              message: '密码最少6位',
              min: 6
            }
          ]}
        />
      </ProForm>
    </Modal>
  )
}

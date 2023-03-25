/*
 * @Author: WeakerEy 280676418@qq.com
 * @Date: 2023-03-12 17:46:13
 * @LastEditors: WeakerEy 280676418@qq.com
 * @LastEditTime: 2023-03-13 15:57:43
 * @FilePath: \mayapp\src\pages\user\UserTable\components\Edit\Edit.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { upDataUser } from '@/services/ant-design-pro/api'
import { ProForm, ProFormText } from '@ant-design/pro-components'
import { message, Modal } from 'antd'

export default function Edit(props: any) {

  let { isModalOpenEdit, setIsModalOpenEdit, actionRef, currentUserInfo } = props

  // 关闭新建对话框
  function handleCancel() {
    setIsModalOpenEdit(false)
  }

  // 提交表单
  function subForm(userId: number, values: any) {
    let res = upDataUser(userId, values)
    // @ts-ignore
    if (!res.status) {
      setIsModalOpenEdit(false)
      message.success('修改成功')
      actionRef.current.reload();
    }
  }

  return (
    <Modal title="创建新用户" open={isModalOpenEdit} onCancel={handleCancel} footer={null} destroyOnClose={true}>
      <ProForm
        // @ts-ignore
        onFinish={(values) => subForm(currentUserInfo.id, values)}
        initialValues={currentUserInfo}
        grid={true}
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

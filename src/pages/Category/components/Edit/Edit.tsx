/*
 * @Author: WeakerEy 280676418@qq.com
 * @Date: 2023-03-16 19:58:01
 * @LastEditors: WeakerEy 280676418@qq.com
 * @LastEditTime: 2023-03-16 21:51:23
 * @FilePath: \mayapp\src\pages\Category\components\Edit\Edit.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createCategory, upDataCategory } from '@/services/ant-design-pro/api'
import { ProForm, ProFormText } from '@ant-design/pro-components'
import { message, Modal, Select } from 'antd'

export default function EditCategory(props: any) {

  let { isModalOpenEdit, setIsModalOpenEdit, actionRef, options, currentCategory } = props
  let [form] = ProForm.useForm()


  // 关闭新建对话框
  function handleCancel() {
    setIsModalOpenEdit(false)
  }

  // 提交表单
  async function subForm(categoryId, values: any) {
    let res = await upDataCategory(categoryId, values)
    // @ts-ignore
    if (!res.status) {
      setIsModalOpenEdit(false)
      message.success('添加成功')
      actionRef.current.reload();
    }
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    form.setFieldsValue({ 'pid': value })
  };


  let initialValues
  if (currentCategory) {
    if (currentCategory.pid === 0) {
      initialValues = { 'pid': currentCategory.name, 'name': currentCategory.name }
    } else {
      let name = options.find(item => item.id == currentCategory.pid).name
      initialValues = { 'pid': name, 'name': currentCategory.name }
    }
  }


  return (
    <Modal title="新建分类" open={isModalOpenEdit} onCancel={handleCancel} footer={null} destroyOnClose={true}>
      <ProForm
        // @ts-ignore
        onFinish={(values) => subForm(currentCategory.id, values)}
        grid={true}
        form={form}
        initialValues={initialValues}
      >
        <ProFormText
          width="md"
          name="pid"
          label="请选择添加在哪个分类下"
          placeholder="请选择分类名"
          rules={[
            {
              required: true,
              message: '请选择分类名',
            }
          ]}
        >
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
            options={options}
            fieldNames={{ label: 'name', value: 'id' }}
          />

        </ProFormText>
        <ProFormText
          width="md"
          name='name'
          label="分类名"
          placeholder="请输入分类名"
          rules={[
            {
              required: true,
              message: '请输入分类名',
            }
          ]}
        />
      </ProForm>
    </Modal>
  )
}

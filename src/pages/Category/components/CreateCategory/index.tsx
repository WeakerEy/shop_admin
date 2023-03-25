import { createCategory } from '@/services/ant-design-pro/api'
import { ProForm, ProFormText } from '@ant-design/pro-components'
import {  message, Modal, Select } from 'antd'

export default function CreateCategory(props: any) {

  let { isModalOpenCreate, setIsModalOpenCreate, actionRef, options } = props
  let [form] = ProForm.useForm()


  // 关闭新建对话框
  function handleCancel() {
    setIsModalOpenCreate(false)
  }

  // 提交表单
  function subForm(values: any) {
    let res = createCategory(values)
    // @ts-ignore
    if (!res.status) {
      setIsModalOpenCreate(false)
      message.success('添加成功')
      actionRef.current.reload();
    }
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    form.setFieldsValue({ 'pid': value })
  };

  return (
    <Modal title="新建分类" open={isModalOpenCreate} onCancel={handleCancel} footer={null} destroyOnClose={true}>
      <ProForm
        // @ts-ignore
        onFinish={(values) => subForm(values)}
        grid={true}
        form={form}
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
